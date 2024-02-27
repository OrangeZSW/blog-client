import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';

// highlightjs
import hljs from 'highlight.js';

import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/vue/vue';
// edit
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchbrackets';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';


import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';


import { full as emoji } from 'markdown-it-emoji'
import Prism from 'prismjs';

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
VMdEditor.use(createLineNumbertPlugin());
import VueMarkdownEditor from '@kangc/v-md-editor';

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

VMdEditor.use(createCopyCodePlugin());


VMdEditor.Codemirror = Codemirror;

export default VMdEditor.use(vuepressTheme, {
    Prism: Prism,
    extend(md){
        md.use(emoji)
    },
    config: {
        toc: {
            includeLevel: [2, 3],
        },
    },
});
