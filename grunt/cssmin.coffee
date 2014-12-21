###*
#	Minify css
#
#	@task mincss
###
module.exports =
	singlepage:
		options:
			preserveComments: false
		files:
			"dist/singlepage/static/css/main.css": ["src/css/singlepage.css"]
	website:
		options:
			preserveComments: false
		files:
			"dist/website/static/main.css": ["src/css/website.css"]
