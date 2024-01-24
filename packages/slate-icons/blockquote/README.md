# @ali/slate-icon-blockquote

[![npm version](https://badge.fury.io/js/%40canner%2Fslate-icon-blockquote.svg)](https://badge.fury.io/js/%40canner%2Fslate-icon-blockquote)

## Icon

```js
import Blockquote from "@ali/slate-icon-blockquote";
```

## Plugin

Please install https://github.com/GitbookIO/slate-edit-blockquote

```js
import { DEFAULT as DEFAULTBLOCKQUOTE } from "@ali/slate-helper-block-quote";
import EditBlockquote from "slate-edit-blockquote";

// plugin
EditBlockquote(DEFAULTBLOCKQUOTE);
```

Also add `BlockquotePlugin`

```js
import { BlockquotePlugin } from "@ali/slate-icon-blockquote";

BlockquotePlugin(options);
```

#### Hot key

<kbd>Ctrl</kbd>+<kbd>opt</kbd>+<kbd>q</kbd>
