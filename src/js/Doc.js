/**
 *	Manage the doc directory
 *	@module doc
 */
var
	fs = require('fs')
	, config = require('./config/config')
	, template = require('./config/template')
	/** Sundown for nodejs, equivalent of redcarpet in Ruby */
	, Robotskirt = require('robotskirt')
	, renderer = new Robotskirt.HtmlRenderer()
	, parser = new Robotskirt.Markdown(renderer)
	/** Nodejs version of Liquid Template, originally Ruby gem */
	, Liquid = require('liquid-node')
	, Template = new Liquid.Engine
	, Highlight = require('./liquid/highlight')
;

/**
 *	@constructor
 *	@alias module:doc
 */
function Doc() {
	return this;
}

/**
 *	Get files in the doc directory.
 *	@param {string} docDirectory
 *	@returns {array} - list of files
 */
Doc.prototype.getDocFiles = function (docDirectory) {
	return fs.readdirSync(docDirectory.toString());
};

/**
 *	Get content of file.
 *	@param {string} fileName
 *	@return {string} - content
 */
Doc.prototype.getFileContent = function (fileName, directory) {
	var
		directory
	;
	directory = directory || config.directories.doc;
	return fs.readFileSync(directory + "/" + fileName, {'encoding': "utf-8"});
};

/**
 *	Remove the Yaml menu, that is Front Matter used by Jekyll.
 *	@param {string} content
 *	@return {string} - content without the menu header
 */
Doc.prototype.cleanMenuHeader = function (content) {
	return content.replace(/(---)\n/g, '')
		.replace(/id:(.*)\n/g, '')
		.replace(/title:(.*)\n/g, '')
		.replace(/layout:(.*)\n/g, '')
		.replace(/permalink:(.*)\n/g, '')
		.replace(/prev:(.*)\n/g, '')
		.replace(/next:(.*)\n/g, '')
		.replace(/(---)\n/g, '')
	;
};

/**
 *	Renderer
 *	@param {string} content - markdown
 *	@return {string} - html content
 */
Doc.prototype.toHTML = function (content) {
	/**
	 *	Load the highlight extension for the liquid template
	 *
	 *	@requires 'pygmentize-bundled'
	 */
	Template.registerTag('highlight', Highlight);
	return Template.parse(parser.render(content))
		.then(function (tag) { return tag.render();})
		.then(function (render) {
			render = template.container.before + render + template.container.after;
			return render;
		})
	;
};

module.exports = Doc;
