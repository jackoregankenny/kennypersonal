// lib/markdown.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getPostData(id: string | undefined) {
  if (!id) {
    throw new Error('Post ID is undefined')
  }

  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post file not found: ${fullPath}`)
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .use(() => (tree) => {
      visit(tree, 'image', (node) => {
        const data = node.data || (node.data = {})
        const props = data.hProperties || (data.hProperties = {})
        props.className = 'next-image'
        props['data-src'] = node.url
        node.type = 'html'
        node.value = `<custom-image src="${node.url}" alt="${node.alt || ''}" />`
      })
    })
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}