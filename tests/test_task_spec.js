var request = require("request");
var server = require("../server.js")
var base_url = "http://localhost:8000/planner/"

describe("tasks", function() {
    describe("GET tasks /", function() {
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

        it("returns status code 200 for retrieving a specific task", function(done) {
            request.get(base_url + 'task/task1', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns a specific task", function(done) {
            request.get(base_url + 'task/task1', function(error, response, body) {
                var data = JSON.parse(body);

                //makes sure the task is the task with id 1 and only 1 task is returned

                expect(data[0].id).toBe(1);
                expect(data.length).toBe(1);
                done();
            });
        });

        it("returns 200 when trying to get all tasks by priority", function(done) {
            request.get(base_url + 'task/1', function(error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns a specific task by priority", function(done) {
            request.get(base_url + 'task/1', function(error, response, body) {
                var correct = true;

                var data = JSON.parse(body);

                //makes sure all tasks have priority 1

                for(var i = 0; i < data.length; i++) {
                    var task = data[i];
                    if(task.priority !== 1){
                        correct = false;
                    }
                }

                expect(true).toBe(correct);
                done();
            });
        });
    });
});