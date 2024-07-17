import { getPostData } from '@/lib/api';
import { parseContent } from '@/lib/contentParser';
import BlogPostContent from '@/components/BlogPostContent';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  console.log("Params received:", params);
  const postData = await getPostData(params.slug);
  console.log("Post data fetched:", postData);

  if (!postData || !postData.content) {
    console.log("Post data is missing or incomplete");
    return <div>Error: Post not found</div>;
  }

  const { contentHtml, headings, footnotes } = await parseContent(postData.content);
  console.log("Parsed content:", { contentHtml: contentHtml.substring(0, 100), headings, footnotes });

  return <BlogPostContent postData={postData} contentHtml={contentHtml} headings={headings} footnotes={footnotes} />;
}