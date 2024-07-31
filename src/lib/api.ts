import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getSortedPostsData() {
  console.log('Posts directory:', postsDirectory)
  
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory)
  console.log('Files found:', fileNames)

  const allPostsData = fileNames.reduce((posts, fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    
    console.log('Processing file:', fullPath)

    // Check if it's a file (not a directory) and ends with .md
    if (fs.statSync(fullPath).isFile() && fileName.endsWith('.md')) {
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      console.log('Processed post:', slug, matterResult.data)

      // Combine the data with the slug
      return [...posts, {
        slug,
        ...(matterResult.data as { date: string; title: string })
      }]
    } else {
      console.log('Skipping non-markdown file or directory:', fileName)
    }
    
    return posts
  }, [] as Array<{ slug: string; date: string; title: string }>)
  
  console.log('All posts data:', allPostsData)

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  // Update this regex to match your Markdown image syntax
  const content = matterResult.content.replace(
    /!\[(.+)]\((\.\.\/images\/.+|images\/.+)\)/g,
    (match, alt, src) => {
      // Remove leading '../' or 'images/' if present
      const cleanSrc = src.replace(/^(\.\.\/images\/|images\/)/, '')
      return `![${alt}](/api/blogImages/images/${cleanSrc})`
    }
  )

  return {
    slug,
    content,
    ...(matterResult.data as { date: string; title: string })
  }
}