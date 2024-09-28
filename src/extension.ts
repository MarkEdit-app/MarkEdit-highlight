import { Decoration, EditorView, ViewPlugin } from '@codemirror/view';
import { Range } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';

export const highlightExtension = ViewPlugin.fromClass(class {}, {
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
