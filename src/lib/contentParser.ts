import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';
import remarkGfm from 'remark-gfm';

export async function parseContent(content: string) {
  let headings: any[] = [];
  let footnotes: any[] = [];

  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(() => (tree) => {
      visit(tree, 'heading', (node: any) => {
        if (node.depth > 1) {
          const id = node.children[0].value.toLowerCase().replace(/\s+/g, '-');
          node.data = { hProperties: { id } };
          headings.push({ id, text: node.children[0].value, level: node.depth });
        }
      });

      visit(tree, 'link', (node: any) => {
        node.data = {
          hName: 'span',
          hProperties: {
            className: ['link-preview'],
            'data-url': node.url,
          },
          hChildren: [{ type: 'text', value: node.children[0].value }],
        };
      });

      visit(tree, 'footnoteDefinition', (node: any) => {
        footnotes.push({
          id: node.identifier,
          content: node.children[0].children[0].value
        });
        return null;
      });

      visit(tree, 'footnoteReference', (node: any) => {
        node.type = 'link';
        node.url = `#fn-${node.identifier}`;
        node.children = [{ type: 'text', value: node.identifier }];
        node.data = {
          hName: 'sup',
          hProperties: {
            id: `fnref-${node.identifier}`,
            className: ['footnote-ref'],
          },
        };
      });

      return tree;
    })
    .process(content);

  return {
    contentHtml: result.toString(),
    headings,
    footnotes,
  };
}