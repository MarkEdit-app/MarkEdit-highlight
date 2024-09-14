import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';
import { Range } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import { MarkdownConfig } from '@lezer/markdown';
import { MarkEdit } from 'markedit-api';

const highlightDelimiter = {
  resolve: 'TextHighlight',
  mark: 'TextHighlight',
};

const highlightConfig: MarkdownConfig = {
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

const highlightExtension = ViewPlugin.fromClass(class {}, {
  provide: () => EditorView.decorations.of(editor => {
    const ranges: Range<Decoration>[] = [];
    for (const { from, to } of editor.visibleRanges) {
      syntaxTree(editor.state).iterate({
        from, to,
        enter: node => {
          if (node.name !== 'TextHighlight') {
            return;
          }

          const mark = Decoration.mark({ class: 'cm-md-textHighlight' });
          ranges.push(mark.range(node.from, node.to));
        },
      });
    }

    return Decoration.set(ranges.sort((lhs, rhs) => lhs.from - rhs.from));
  }),
});

const higlightTheme = EditorView.baseTheme({
  '.cm-md-textHighlight': {
    background: 'rgba(255, 255, 0, 0.3)',
  },
});

MarkEdit.addExtension([higlightTheme, highlightExtension]);
MarkEdit.addMarkdownConfig(highlightConfig);
