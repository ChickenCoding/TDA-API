/**
 *
 *	@module singlepage
 */
var
	fs = require('fs')
	, config = require('./config/config')
	, template = require('./config/template')
	, HtmlEntities = require('entities')
;

/**
 *	@constructor
 *	@alias module:singlepage
 */
function Singlepage () {
	return this;
};

/**
 *	Renderer.
 *	@param {string} menuNavigation
 *	@param {string} docContent
 *	@returns {string} - HTML file
 */
Singlepage.prototype.toHTML = function(menuNavigation, docContent) {
	return template.html.header +
		menuNavigation +
		HtmlEntities.decodeHTML(docContent) +
		template.html.footer
	;
};

/**
 *	Write the single HTML API file.
 *	@param {string} content - HTML File
 */
Singlepage.prototype.writeFile = function (content, to) {
	to = to || config.directories.dist + '/' +
		config.directories["static"] + '/' +
		config.files.dist
	;
	fs.writeFileSync(to, content, {'encoding': "utf-8"});
	return fs.readFileSync(to, {'encoding': "utf-8"})
};

module.exports = Singlepage;
