/**
 *	Manage the navigation menu.
 *	@module menu
 */
var
	fs = require('fs')
	/** Convert yaml to json, easier to manipulate in js*/
	, YamlToJson = require('js-yaml')
	, isArray = require('mout/lang/isArray')
	, intersection = require('mout/array/intersection')
	, config = require('./config/config')
	, template = require('./config/template')
;

/**
 *	@constructor
 *	@alias module:menu
 */
function Menu() {
	return this;
}

/**
 *	Parse a YAML file into JSON.
 *	@param {string} menuFile - yaml file
 *	@returns {string}
 */
Menu.prototype.setJson = function (menuFile) {
	return YamlToJson.safeLoad(fs.readFileSync(menuFile, {'encoding': "utf-8"}));
};

/**
 *	Take a JSON and parse into Array.
 *	@param {string} menuJson
 *	@returns {string}
 */
Menu.prototype.setMenuArray = function (menuJson) {
	var
		menuArray = [],
		section, item, menu, itemMenu
	;
	for(section in menuJson) {
		item = menuJson[section];
		if (item.items && isArray(item.items)) {
			for (menu in item.items) {
				itemMenu = item.items[menu];
				menuArray.push(itemMenu.id)
			}
		}
	}
	return menuArray;
};

/**
 *	Harmonize the doc files and the data navigation.
 *	@param {array} menuArray
 *	@param {array} docFilesArray
 *	@return {array} - combined array of two arrays
 */
Menu.prototype.organize = function(menuArray, docFilesArray, directory) {
	var
		commonItemsArray = []
		, i
	;
	directory = directory || config.directories.doc;
	docFilesArray = docFilesArray.map(function (item) {
		return item.replace(/^[0-9]{2}\-{1}(.*)\.md$/g, '$1')
	});
	commonItemsArray = intersection(menuArray, docFilesArray);
	return commonItemsArray.map(function (item) {
		for (i = 0; i < commonItemsArray.length; ++i) {
			if (i < 10) {
				i = "0" + i.toString();
			} else {
				i = i.toString();
			}
			if (fs.existsSync(directory + "/" + i + "-" + item + ".md")) {
				return i + "-" + item + ".md";
			}
		}
	});
};

/**
 *	Renderer
 *	@param {array} menuJson
 *	@return {string} - Html menu content
 */
Menu.prototype.toHTML = function (menuJson) {
	var
		content,
		section, menu,
		item, itemMenu,
		subitem, itemSubmenu
	;
	content = template.navigation["class"].before;
	for (section in menuJson) {
		item = menuJson[section];
		content += template.navigation.section.before +
			template.navigation.sectionTitle.before +
			item.title +
			template.navigation.sectionTitle.after
		;
		if (item.items && isArray(item.items)) {
			content += template.navigation.menuList.before;
			for (menu in item.items) {
				itemMenu = item.items[menu];
				content += template.navigation.menuItem.before +
					"<a href=\"#" + itemMenu.id + "\">" +
						itemMenu.title +
					"</a>" +
					template.navigation.menuItem.after
				;
				if(itemMenu.subitems && isArray(itemMenu.subitems)) {
					content += template.navigation.menuList.before;
					for(subitem in itemMenu.subitems) {
						itemSubmenu = itemMenu.subitems[subitem];
						content += template.navigation.menuItem.before +
							"<a href=\"#" + itemSubmenu.id + "\">" +
								itemSubmenu.title +
							"</a>" +
							template.navigation.menuItem.after
						;
					}
					content += template.navigation.menuList.after;
				}
			}
			content += template.navigation.menuList.after;
		}
		content += template.navigation.section.after;
	}
	content += template.navigation["class"].after;
	return content;
};

module.exports = Menu;
