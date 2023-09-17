
import { s } from 'hastscript';
import remarkToc from 'remark-toc'
import Callout from '@/components/general/Callout';
import remarkGfm from 'remark-gfm'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import "public/styles/highlight-js/androidstudio.css"
import Pre from '@/components/general/pre';

const MDXRenderer = async ({ content, languageCode }: ComponentProps) => {
  return (
    <article className='prose max-w-max prose-p:text-white prose-headings:text-white
        prose-a:decoration-black prose-strong:text-white prose-code:text-white
        prose-a:text-white prose-p:font-semibold prose-a:font-semibold
        prose-code:bg-blue-800/70 marker:text-white font-cairo
        prose-ul:p-2
        prose-ul:text-white
        prose-li:text-white
        prose-pre:overflow-x-auto
        '
      dir={languageCode == 'en' ? 'ltr' : 'rtl'}
    >
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [[remarkToc, { heading: 'toc|Table of contents|المحتوي' }], remarkGfm],
            rehypePlugins: [rehypeHighlight, rehypeSlug, [rehypeAutolinkHeadings, {
              content(node: any) {
                return [
                  s('svg', {
                    xmlns: 'http://www.w3.org/2000/svg',
                    fill: 'none',
                    viewbox: '0 0 24 24',
                    strokeWidth: '1.5',
                    stroke: 'currentColor',
                    className: "w-6 h-6 inline mr-1",
                  }, [
                    s('path', {
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      d: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244'
                    })
                  ])
                ]
              }
            }]],
          },
        }}
        components={
          {
            pre: Pre,
            Callout,
            blockquote: BlockQuote,
          }
        }
      />
    </article>
  )
}

import { BlockquoteHTMLAttributes, DetailedHTMLProps } from 'react'
import { cookies } from 'next/headers';

function BlockQuote(props: DetailedHTMLProps<BlockquoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) {
  const cookieStore = cookies()
  const languageCode = cookieStore.get('locale');

  return (
    <blockquote
      className={languageCode?.value == 'en' ? '' : "border-r-4 border-l-0 pr-3"}
    >
      {props.children}
    </blockquote>
  );
}
interface ComponentProps {
  content: string
  languageCode: string
}

export default MDXRenderer;