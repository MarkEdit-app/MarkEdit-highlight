# MarkEdit-highlight

Text Highlight for MarkEdit that leverages [markedit-api](https://github.com/MarkEdit-app/MarkEdit-api).

Example: `==highlighted text==`.

## Installation

Copy [dist/markedit-highlight.js](dist/markedit-highlight.js) to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`.

You can also run `yarn install && yarn build` to build and deploy the script.

## Quick Guide

1. Select some content with your mouse, for example it is `descripts`

```markdown
This is a words that descripts how to highlight.
```
2. Then type `=` twice, then the selectecd content is highlighted

```
This is a words that ==descripts== how to highlight.
```
