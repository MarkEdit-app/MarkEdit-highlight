import { MarkdownConfig } from '@lezer/markdown';

const highlightDelimiter = {
  resolve: 'TextHighlight',
  mark: 'TextHighlight',
};

export const highlightConfig: MarkdownConfig = {
  defineNodes: ['TextHighlight', 'TextHighlightMark'],
  parseInline: [
    {
      name: 'TextHighlight',
      parse: (ctx, next, pos) => {
        if (next != 61 /* '=' */ || ctx.char(pos + 1) != 61) {
          return -1;
        } else {
          return ctx.addDelimiter(highlightDelimiter, pos, pos + 2, true, true);
        }
      },
      after: 'Emphasis',
    },
  ],
};
