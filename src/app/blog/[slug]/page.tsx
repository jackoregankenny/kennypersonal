import { getPostData, getSortedPostsData } from '@/lib/api';
import { parseContent } from '@/lib/contentParser';
import BlogPostContent from '@/components/BlogPostContent';
import { Metadata, ResolvingMetadata } from 'next';

const STANDARD_COVER_IMAGE = '/images/cover.jpg';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const postData = await getPostData(params.slug);

  if (!postData) {
    return {
      title: 'Post Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      url: `https://jackoregankenny.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: postData.date,
      images: [
        {
          url: STANDARD_COVER_IMAGE,
          width: 1200,
          height: 630,
          alt: postData.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postData.title,
      description: postData.excerpt,
      images: [STANDARD_COVER_IMAGE],
    },
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  if (!postData || !postData.content) {
    return <div>Error: Post not found</div>;
  }

  const { contentHtml, headings, footnotes } = await parseContent(postData.content);

  return (
    <>
      <BlogPostContent postData={postData} contentHtml={contentHtml} headings={headings} footnotes={footnotes} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}