Liquid = require "liquid-node"
Promise = require "bluebird"
Pygment = require('pygmentize-bundled')
entities = require('entities')

module.exports = class Highlight extends Liquid.Block
	SyntaxHelp = "Syntax Error in tag 'highlight' - Valid syntax: highlight [lang] [options]"

	Syntax = ///
		(#{Liquid.QuotedFragment.source})\s*
		(#{Liquid.QuotedFragment.source})?
	///

	constructor: (template, tagName, markup) ->
		if match = Syntax.exec(markup)
			@lang = match[1]
			@options = match[2]
		else
			throw new Liquid.Error(SyntaxHelp)
		super
	
	render: (context) ->
		super.then(
			(chunks) =>
				return JSON.stringify block:chunks, lang: @lang, format: "html"
		).then(
			(data) =>
				tpl = JSON.parse(data)
				handleTemplate = (msg) ->
					return new Promise (resolve) ->
						setTimeout () =>
							tpl.content = entities.decodeHTML(tpl.block[0])
							Pygment(
								{ lang: tpl.lang, format: tpl.format}
								, tpl.content,
								(err, res) =>
									if err
										return err
									resolve res.toString()
							)
						, 200
				handleTemplate(tpl).then((msg) -> return msg)
		).then( (result) =>
			return result
		)
