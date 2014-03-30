// Set of prilimnary tests for newman
var assert = require('assert'),
	sinon  = require('sinon'),
	fs     = require('fs'),
	JSON5  = require('JSON5'),
	path   = require('path');

// importing newman modules
var Newman           = require('../src/Newman.js'),
	CollectionModel  = require('../src/models/CollectionModel.js'),
	CollectionRunner = require('../src/runners/CollectionRunner.js'),
	MockedRequestRunner = require('./mocks.js');

describe("Newman", function() {

	beforeEach(function(){
		var filePath = path.join(__dirname, 'data', 'PostmanCollection.json');
		var url = "https://www.getpostman.com/collections/fc3f0598daaa5271e4f7";
		this.collectionJson = JSON5.parse(fs.readFileSync(filePath, 'utf8'));
		this.collection = new CollectionModel(this.collectionJson);
		var runner = new CollectionRunner(this.collection.getOrderedRequests);
	});
	
	it("should fetch the collection", function() {
		assert.equal(this.collectionJson.name, "Postman Demo Server");
	});

	it("should call requestRunner execute on each request", function() {
		runner.execute();
	});

});
