import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export async function parseContent(content: string) {
  const result = await remark()
    .use(gfm)
    .use(html, { sanitize: false })
    .use(() => (tree) => {
      const headings: any[] = [];
      const footnotes: any[] = [];

      visit(tree, 'heading', (node: any) => {
        if (node.depth > 1) {
          const id = node.children[0].value.toLowerCase().replace(/\s+/g, '-');
          node.data = { hProperties: { id } };
          headings.push({ id, text: node.children[0].value, level: node.depth });
        }
      });

      visit(tree, 'link', (node: any) => {
        if (!node.url.startsWith('#')) {
          node.data = {
            hName: 'span',
            hProperties: {
              className: ['link-preview'],
              'data-url': node.url,
            },
          };
        }
      });

      visit(tree, 'footnoteReference', (node: any) => {
        node.data = {
          hName: 'sup',
          hProperties: {
            className: ['footnote-ref'],
            'data-footnote-id': node.identifier,
          },
        };
      });

      visit(tree, 'footnoteDefinition', (node: any) => {
        footnotes.push({ id: node.identifier, content: node.children[0].value });
        node.data = {
          hName: 'div',
          hProperties: {
            className: ['footnote-def'],
            'data-footnote-id': node.identifier,
            style: 'display: none;',
          },
        };
      });

      // @ts-ignore
      tree.headings = headings;
      // @ts-ignore
      tree.footnotes = footnotes;
    })
    .process(content);

  return {
    contentHtml: result.toString(),
    headings: result.data.headings || [],
    footnotes: result.data.footnotes || [],
  };
}