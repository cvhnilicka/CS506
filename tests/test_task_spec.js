var request = require("request");
var server = require("../server.js")
var base_url = "http://localhost:8000/planner/"

describe("tasks", function() {
    var tasks;

    beforeEach(function(){
        request.get(base_url + 'tasks/', function(error, response, body) {
            tasks = JSON.parse(body);
        });
    });


    describe("GET tasks /", function() {
        it("get all tasks returns status code 200", function(done) {
            request.get(base_url + 'tasks/', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns a list of tasks", function(done) {
            request.get(base_url + 'tasks/', function(error, response, body) {

                var data = JSON.parse(body);

                //make sure all tasks has an attached user with username user1

                expect(data.length).not.toBeLessThan(0);

                done();
            });
        });

        /*
         it("get all tasks for a specific user returns status code 200", function(done) {
         request.get(base_url + 'tasks/user1', function(error, response, body) {
         expect(response.statusCode).toBe(200);
         done();
         });
         });

         it("returns a list of tasks for a specific user", function(done) {
         request.get(base_url + 'tasks/user1', function(error, response, body) {
         //make sure all tasks has an attached user with username user1

         var correct = true;

         var data = JSON.parse(body);

         for(var i = 0; i < data.length; i++) {
         var owner = data[i].owner;
         if(owner.username !== 'user1'){
         correct = false;
         }
         }

         expect(true).toBe(correct);
         done();
         });
         });
         */

        it("returns status code 200 for retrieving a specific task", function(done) {

            request.get(base_url + 'task/' + tasks[0]._id, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns a specific task", function(done) {
            request.get(base_url + 'task/' + tasks[0]._id, function(error, response, body) {
                var task = tasks[0];

                var data = JSON.parse(body);
                expect(data._id).toEqual(task._id);
                expect(data.description).toEqual(task.description);

                done();
            });
        });
    });
});