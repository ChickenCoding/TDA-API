###
#	Copy docs directory to static website
#
#	@task copy
###
module.exports =
	copy:
		files: [
			expand: true
			cwd: 'docs/'
			src: '**'
			dest: 'dist/website/docs/'
		]


