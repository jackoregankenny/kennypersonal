import { getPostData, getAllPostIds } from '@/lib/contentParser';
import BlogPostContent from '@/components/BlogPostContent';
import { LinkPreviewWrapper } from '@/components/LinkPreviewWrapper';
import CustomImage from '@/components/CustomImage';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    const postData = await getPostData(params.slug);

    if (!postData || !postData.contentHtml) {
      return <div>Error: Post not found</div>;
    }

    // Replace custom-image tags with CustomImage component
    const contentWithImages = postData.contentHtml.replace(
      /<custom-image src="([^"]+)" alt="([^"]*)">/g,
      (match, src, alt) => `<CustomImage src="${src}" alt="${alt}" />`
    );

    // Extract headings and footnotes if needed
    const headings = extractHeadings(contentWithImages);
    const footnotes = extractFootnotes(contentWithImages);

    return (
      <>
        <BlogPostContent 
          postData={postData} 
          contentHtml={contentWithImages} 
          headings={headings} 
          footnotes={footnotes} 
        />
        <LinkPreviewWrapper />
      </>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return <div>Error: Unable to load blog post</div>;
  }
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

// Helper functions to extract headings and footnotes
function extractHeadings(content: string) {
  const headingRegex = /<h([2-6]).*?id="(.*?)".*?>(.*?)<\/h[2-6]>/g;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, '') // Remove any HTML tags inside the heading
    });
  }
  return headings;
}

function extractFootnotes(content: string) {
  const footnoteRegex = /<sup id="fnref:(\d+)">.*?<\/sup>/g;
  const footnotes = [];
  let match;
  while ((match = footnoteRegex.exec(content)) !== null) {
    footnotes.push({
      id: match[1],
      // You might want to extract the actual footnote content here
      // This would require searching for the corresponding footnote definition
      content: `Footnote ${match[1]}`
    });
  }
  return footnotes;
}