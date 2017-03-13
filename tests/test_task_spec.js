var request = require("request");
var ourApp = require ("../server.js");
var baseUrl = "http://localhost:8000/planner/";

describe("testing tasks", function() {
    describe("testing get all tasks", function() {
        it("returns status code 200", function(done) {
           request.get(baseUrl + 'tasks', function(error, response, body){
               expect(response.statusCode.toBe(200));
               ourApp.closeServer();
               done();
           })
        });
    });
});