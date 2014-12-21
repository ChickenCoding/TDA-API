var
	should = require('chai').should()
	, Menu = require('../src/js/Menu')
	, fs = require('fs')
	, Doc = require('../src/js/Doc')
;

describe("Menu Specification", function () {
	var self = this;

	before(function () {
		self.menu = new Menu();
		self.fixtures = {
			"yamlData": "./fixtures/data.yml"
			, "jsonData": "./fixtures/data.json"
			, "arrData": [ "getting-started", "first-steps-with-server", "account" ]
			, "arrFilesInDoc": ["00-getting-started.md", "00-first-steps-with-server.md", "00-account.md"]
			, "docs": "./fixtures/docs",
		}
	});
	after(function () {
		self.menu = null;
	});

	it("setJson: should parse a yaml file into JSON object", function () {
		var assertJson = fs.readFileSync(self.fixtures.jsonData, {"encoding": "utf-8"});

		self.menu.setJson(self.fixtures.yamlData).should.eql(JSON.parse(assertJson));
	});

	it("setMenuArray: should turn a JSON menu into an array", function () {
		var jsonContent = self.menu.setJson(self.fixtures.yamlData, {"encoding": "utf-8"});

		self.menu.setMenuArray(jsonContent).should.eql(self.fixtures.arrData);
	});

	it("organize: should order the menu navigation according to Json data and to files in doc directory", function () {
		var
			content = self.menu.setMenuArray(
				self.menu.setJson(self.fixtures.yamlData, {"encoding": "utf-8"})
			)
			, dataDoc
			, orderedArray = []
			, item
		;
		this.doc = new Doc();
		dataDoc = this.doc.getDocFiles(self.fixtures.docs);
		orderedArray = self.menu.organize(content, dataDoc, self.fixtures.docs);
		for (item in self.fixtures.arrFilesInDoc) {
			orderedArray.should.include(self.fixtures.arrFilesInDoc[item]);
		}
	});

	it("toHTML: should render", function () {
		var
			menuJson = self.menu.setJson(self.fixtures.yamlData, {"encoding": "utf-8"})
		;
		assertContent = self.menu.toHTML(menuJson);
		assertContent.should.match(/\n/);


	});
});
