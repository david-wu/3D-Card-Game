global.React = require('react');
global.Component = require('react').Component;
global.CSSModules = require('react-css-modules');
global._ = require('lodash');

const ReactDom = require('react-dom');

const Board = require('./components/board/board.jsx');


ReactDom.render(
	<Board></Board>,
	document.getElementById('root')
);