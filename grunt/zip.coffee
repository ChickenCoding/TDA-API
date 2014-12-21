###*
#	Zip the singlepage build
#
#	@task zip
###
module.exports =
	zip:
		dest: "dist/website/static/singlepage.zip"
		src: ["dist/singlepage/index.html", "dist/singlepage/static/**/*"]
