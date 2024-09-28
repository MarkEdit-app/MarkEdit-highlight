import { EditorSelection } from '@codemirror/state';
import { EditorView } from '@codemirror/view';

export const interceptInputs = EditorView.inputHandler.of((editor, _from, _to, insert) => {
  if (insert === '=' && hasSelection(editor)) {
    return wrapBlock(insert, editor);
  }

  return false;
});

function wrapBlock(mark: string, editor: EditorView) {
  editor.dispatch(editor.state.changeByRange(({ from, to }) => {
    const selection = editor.state.sliceDoc(from, to);
    const replacement = from === to ? mark : `${mark}${selection}${mark}`;
    const newPos = from + mark.length;
    return {
      range: EditorSelection.range(newPos, newPos + selection.length),
      changes: {
        from, to, insert: replacement,
      },
    };
  }));

  return true;
}

function hasSelection(editor: EditorView) {
  return [...editor.state.selection.ranges].some(range => !range.empty);
}
