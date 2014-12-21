// Generated by CoffeeScript 1.8.0
(function() {
  var Highlight, Liquid, Promise, Pygment, entities,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Liquid = require("liquid-node");

  Promise = require("bluebird");

  Pygment = require('pygmentize-bundled');

  entities = require('entities');

  module.exports = Highlight = (function(_super) {
    var Syntax, SyntaxHelp;

    __extends(Highlight, _super);

    SyntaxHelp = "Syntax Error in tag 'highlight' - Valid syntax: highlight [lang] [options]";

    Syntax = RegExp("(" + Liquid.QuotedFragment.source + ")\\s*(" + Liquid.QuotedFragment.source + ")?");

    function Highlight(template, tagName, markup) {
      var match;
      if (match = Syntax.exec(markup)) {
        this.lang = match[1];
        this.options = match[2];
      } else {
        throw new Liquid.Error(SyntaxHelp);
      }
      Highlight.__super__.constructor.apply(this, arguments);
    }

    Highlight.prototype.render = function(context) {
      return Highlight.__super__.render.apply(this, arguments).then((function(_this) {
        return function(chunks) {
          return JSON.stringify({
            block: chunks,
            lang: _this.lang,
            format: "html"
          });
        };
      })(this)).then((function(_this) {
        return function(data) {
          var handleTemplate, tpl;
          tpl = JSON.parse(data);
          handleTemplate = function(msg) {
            return new Promise(function(resolve) {
              return setTimeout((function(_this) {
                return function() {
                  tpl.content = entities.decodeHTML(tpl.block[0]);
                  return Pygment({
                    lang: tpl.lang,
                    format: tpl.format
                  }, tpl.content, function(err, res) {
                    if (err) {
                      return err;
                    }
                    return resolve(res.toString());
                  });
                };
              })(this), 200);
            });
          };
          return handleTemplate(tpl).then(function(msg) {
            return msg;
          });
        };
      })(this)).then((function(_this) {
        return function(result) {
          return result;
        };
      })(this));
    };

    return Highlight;

  })(Liquid.Block);

}).call(this);