var
	should = require('chai').should()
	, Doc = require('../src/js/Doc')
	, Promise = require('bluebird')
;

describe("Doc Specification", function () {

	var self = this;

	before(function () {
		self.doc = new Doc();
		self.fixtures = {
			"docs": "./fixtures/docs",
			"file": "00-my-doc.md"
		}
	});
	after(function() {
		self.doc = null;
	});

	it("getDocFiles: should read the files located in the doc directory", function () {
		var assertArray = self.doc.getDocFiles(self.fixtures.docs);

		assertArray[3].should.equals(self.fixtures.file);
	});

	it("getFileContent: should read the content of a file", function () {
		var assertContent = self.doc.getFileContent(
			self.fixtures.file, self.fixtures.docs
		);
		assertContent.should.be.string;
	});

	it("cleanMenuHeader: should clean the yaml header of a file", function (done) {
		var content = new Promise(function (resolve) {
			resolve(self.doc.cleanMenuHeader(self.doc.getFileContent(
				self.fixtures.file, self.fixtures.docs
			)));
		}).then(function(content) {
			content.should.not.match(/---/);
			done()
		}).done();
	});

	it("toHTML: should parse Markdown to HTML", function (done) {
		var content = new Promise(function (resolve) {
			resolve(self.doc.toHTML(self.doc.getFileContent(
				self.fixtures.file, self.fixtures.docs
			)));
		}).then(function (content) {
			content.should.match(/<hr>/);
			done();
		}).done();
	});
});
