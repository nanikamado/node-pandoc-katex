#!/usr/bin/env node

// Pandoc filter to render all math with KaTeX

var pandoc = require('pandoc-filter');
var katex = require('katex');

var RI = pandoc.RawInline;

function action({t: type, c: value},format,meta) {
	if (type === 'Math'){
		if (value[0].t === "DisplayMath")
		{
			return RI("html", katex.renderToString(value[1], {
				displayMode : true,
				throwOnError : true
			}))
		} else if (value[0].t === "InlineMath"){
			return RI("html", katex.renderToString(value[1]))
		}
	} 
}

pandoc.stdio(action);