var
	should = require('chai').should()
	, fs = require('fs')
	, Promise = require('bluebird')
	, Singlepage = require('../src/js/Singlepage')
	, Doc = require('../src/js/Doc')
	, Menu = require('../src/js/Menu')
;

describe("Singlepage Specification", function () {
	var self = this;
	before(function () {
		self.singlepage = new Singlepage();
		self.fixtures = {
			"yamlData": "./fixtures/data.yml",
			"docs": "./fixtures/docs",
			"distFile": "./fixtures/dist/index.html"
		};
	});
	after(function () {
		self.singlepage = null;
	});

	it("toHTML: it should render", function () {
		var
			menuHtml,
			getDocFiles, docSingleFile,
			docHtml, docInstance
		;
		this.menu = new Menu();
		docHtml = "";
		this.doc = new Doc();
		menuHtml = this.menu.toHTML(this.menu.setJson(self.fixtures.yamlData));
		getDocFiles = this.doc.getDocFiles(self.fixtures.docs);
		getDocFiles = 	this.menu.organize(
				this.menu.setMenuArray(this.menu.setJson(self.fixtures.yamlData)),
			getDocFiles,
			self.fixtures.docs
		);
		for (docSingleFile in getDocFiles) {
			docHtml += this.doc.cleanMenuHeader(this.doc.getFileContent(getDocFiles[docSingleFile], self.fixtures.docs));
		}
		docInstance = this.doc;

		new Promise(function (resolve) {
			resolve(docInstance.toHTML(docHtml));
		}).then(function (docHtml) {
			self.singlepage.toHTML(menuHtml, docHtml).should.match(/<!DOCTYPE/);
		});
	})

	it("writeFile: should write the html file", function () {
		var
			menuHtml,
			getDocFiles, docSingleFile,
			docHtml, docInstance
		;
		this.menu = new Menu();
		docHtml = "";
		this.doc = new Doc();
		menuHtml = this.menu.toHTML(this.menu.setJson(self.fixtures.yamlData));
		getDocFiles = this.doc.getDocFiles(self.fixtures.docs);
		getDocFiles = 	this.menu.organize(
				this.menu.setMenuArray(this.menu.setJson(self.fixtures.yamlData)),
			getDocFiles,
			self.fixtures.docs
		);
		for (docSingleFile in getDocFiles) {
			docHtml += this.doc.cleanMenuHeader(this.doc.getFileContent(getDocFiles[docSingleFile], self.fixtures.docs));
		}
		docInstance = this.doc;

		new Promise(function (resolve) {
			resolve(docInstance.toHTML(docHtml));
		}).then(function (docHtml) {
			return self.singlepage.toHTML(menuHtml, docHtml);
		}).then(function (singlepageHtml) {
			self.singlepage.writeFile(singlepageHtml, self.fixtures.distFile);
			fs.readFileSync(self.fixtures.distFile, {"encoding": "utf-8"}).should.be.a("string");
		});
	});
});
