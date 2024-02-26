import { full as emoji } from 'markdown-it-emoji'
import hljs from 'highlight.js';
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
});
md.use(emoji)
export default md;
