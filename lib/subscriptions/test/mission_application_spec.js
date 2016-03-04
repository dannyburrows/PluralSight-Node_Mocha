var assert = require('assert');
var MembershipApplication = require("../models/membership_application.js");

describe("Membership application requirements", function () {
    var validApp;
    
    before(function () {
       validApp = new MembershipApplication({
           first : "Test",
           last : "User",
           email : "Test@test.com",
           age : 30,
           height : 66,
           weight: 180
       });
    });
    
   describe("Application valid if...", function() {
      it("all validators successful", function() {
          assert(validApp.isValid(), "Not valid");
      });
      it("email is 4 or more chars and contains an @", function() {
          assert(validApp.emailIsValid());
      });
      it("first and last name are provided", function() {
          assert(validApp.nameIsValid());
      });
      it("height is between 60 and 75 inches", function() {
          assert(validApp.heightIsValid());
      });
      it("age is between 15 and 100", function() {
          assert(validApp.ageIsValid());
      });
      it("reports weight is between 100 and 300", function() {
          assert(validApp.weightIsValid());
      });
   });
   
   describe("Application invalid if...", function() {
       it("expired", function(){
           var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
           assert(app.expired());           
       });
       it("email is 4 characters or less", function() {
           var app = new MembershipApplication({email: "dd"});
           assert(!app.emailIsValid());
       });
       it("email does not contain an @", function() {
           var app = new MembershipApplication({email: "dddd"});
           assert(!app.emailIsValid());
       });
       it("email is ommitted", function() {
           var app = new MembershipApplication();
           assert(!app.emailIsValid());
       });
   });
});