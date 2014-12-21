var config = require('./config');
module.exports = {
	"html": {
		"header" : "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width\">\n\
				<title>Single Page API - The Developer Adventure</title>\n\
				<link rel=\"stylesheet\" href=\"" + config.directories["static"] + "/css/fontello.css\" type=\"text/css\" media=\"all\" />\n\
				<link rel=\"stylesheet\" href=\"" + config.directories["static"] + "/css/pygments.css\" type=\"text/css\" media=\"all\" />\n\
				<link rel=\"stylesheet\" href=\"" + config.directories["static"] + "/css/main.css\" type=\"text/css\" media=\"all\" />\n\
			</head>\n<body>\n<header>\n<a href=\"#\" class=\"header__banner\">\n<img src=\"/static/tda-logo.png\" alt=\"The Developer Adventure\"/>\n</a>\n</header>\n\
			"
		, "footer": "\n<script src=\"" + config.directories["static"]  +"/js/main.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n</body>\n</html>"
	}
	, "navigation": {
		"class": {
			"before": "\n<div class=\"toc\">\n<nav class=\"toc__list\">\n",
			"after": "\n</nav>\n</div>\n"
		}
		, "section": { before: "\n<section>\n" , after : "\n</section>\n" }
		, "sectionTitle": { before: "\n<h3>\n" , after: "\n</h3>\n" }
		, "menuList": { before: "\n<ul>\n" , after: "\n</ul> \n" }
		, "menuItem": { before: "\n<li>\n" , after: "\n</li>\n" }
	}
	, "container": {
		"before": "<div class=\"container\">\n<div class=\"container__content\">\n<div class=\"container__content--docs\">\n",
		"after": "</div></div></div>"
	}
};
