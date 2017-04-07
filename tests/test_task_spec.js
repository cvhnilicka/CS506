var request = require("request");
var server = require("../server.js")
var webdriver = require('selenium-webdriver');
var base_url = "http://localhost:8000/planner/"
require('chromedriver');

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

    describe("front end tests", function() {
        var tasks;

        var originalTimeout;

        beforeEach(function(){
            request.get(base_url + 'tasks/', function(error, response, body) {
                tasks = JSON.parse(body);
            });
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
        });

        it("clicking + gets you to new task page", function(done) {
            var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
            browser.get('http://localhost:8000');

            browser.findElement(webdriver.By.id('add')).then(function(button) {
                button.click();
            });


            browser.findElement(webdriver.By.id('title')).getText().then(function(text){
                expect(text).toEqual('Create Task');
                browser.quit();
                done();
            });
        });

        it("adding a new task", function(done) {
            var browser2 = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
            browser2.get('http://localhost:8000/#!/newTask');

            browser2.findElement(webdriver.By.id('due')).sendKeys('3/14/2018');
            browser2.findElement(webdriver.By.id('description')).sendKeys('ajsdllasjdklja');
            browser2.findElement(webdriver.By.id('addsub')).click();
            browser2.findElement(webdriver.By.id('addsub')).click();
            browser2.findElement(webdriver.By.id('addsub')).click();
            browser2.findElement(webdriver.By.id('submit')).click();

            browser2.findElement(webdriver.By.className('alert')).getText().then(function(text){
                expect(text).toEqual('Successfully created task');
                browser2.quit();
                done();
            });
        });

    });


});