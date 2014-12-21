###*
#	Sass pre-compilaction
#
#	@task sass
###
module.exports =
	singlepage:
		options:
			sourceMap: true
			outputStyle: "expanded"
		dist:
			"src/css/singlepage.css": ["src/sass/singlepage/singlepage.sass"]
	website:
		options:
			sourceMap: true
			outputStyle: "expanded"
		dist:
			"src/css/website.css": ["src/sass/website/website.sass"]
