var
	fs = require('fs')
	, Promise = require('bluebird')
	, config = require('./src/js/config/config')
	, Singlepage = require('./src/js/Singlepage'), singlepage
	, Doc = require('./src/js/Doc'), doc
	, Menu = require('./src/js/Menu'), menu

	/** Content of the menu nav in html. */
	, menuHtml

	/** Array of files, ordered by navigation menu data, in doc Directory. */
	, getDocFiles

	/** Counter for doc directory traversal. */
	, docSingleFile

	/** Content of the docs in html. */
	, docHtml
;

/**
 *	Menu instance.
 *
 *	@property menu
 *	@type Menu
 */
menu = new Menu();

/**
 *	@property docHtml
 *	@type string
 */
docHtml = "";

/**
 *	Doc instance.
 *
 *	@property doc
 *	@type Doc
 */
doc = new Doc();

/**
 *	Singlepage instance.
 *
 *	@property singlepage
 *	@type Singlepage
 */
singlepage = new Singlepage();

/**
 *	@property getDocFiles
 *	@type array
 */
getDocFiles = menu.organize(
	menu.setMenuArray(menu.setJson(config.files.navigation)),
	doc.getDocFiles(config.directories.doc)
);

/**
 *	@property menuHtml
 *	@type array
 */
menuHtml = menu.toHTML(menu.setJson(config.files.navigation));

/** Stack contents of each file of the doc directory into one string. */
for (docSingleFile in getDocFiles) {
	docHtml += doc.cleanMenuHeader(
		doc.getFileContent(
			getDocFiles[docSingleFile], config.directories.doc
		)
	);
}

/**
 *	Parse into html all the needed content and combine them into a single html file.
 *
 *	@external Promise
 */
new Promise(function (resolve) {
	resolve(doc.toHTML(docHtml));
}).then(function (docHtml) {
	return singlepage.toHTML(menuHtml, docHtml);
}).then(function (singlepageHtml) {
	singlepage.writeFile(
		singlepageHtml,
		config.directories.dist + config.directories.singlepage + "/" + config.files.dist
	);
	console.log("Single page written");
});

