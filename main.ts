import { highlightConfig } from './src/config';
import { highlightExtension } from './src/extension';
import { interceptInputs } from './src/selection';
import { higlightTheme } from './src/theme';
import { MarkEdit } from 'markedit-api';

MarkEdit.addExtension([higlightTheme, highlightExtension, interceptInputs]);
MarkEdit.addMarkdownConfig(highlightConfig);
