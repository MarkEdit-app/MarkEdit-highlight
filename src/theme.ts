import { EditorView } from '@codemirror/view';

export const higlightTheme = EditorView.baseTheme({
  '.cm-md-textHighlight': {
    background: 'rgba(255, 255, 0, 0.3)',
  },
});
