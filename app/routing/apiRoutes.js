// a GET route with the url /api/friends used to display a JSON of all possible friends
// a POST routes api/friends that will be used to handle incoming survey results--this route will also be used to handle the compatibility logic
	// compatibility logic: 
	// convert each users results into a simple array of numbers [1,2,3,4,5,5,4,3,2,1]
	// then compare the different between current user's score against those from other users, question by question
	// add up the differenes to calculate totalDifference
		// example: 
		// user1: [5,1,4,4,5,1,2,5,4,1]
		// user2: [3,2,5,4,5,1,2,4,1,3]
		// totalDifference: 2+1+1+0+0+0+0+1+3+2
	// remember to use the absolute value of the differences, so no negative solutions (5-3 and 3-5 should both be 2)
	// the closest match will be the user with the least amount of difference
	// once you've found the current user's most compatible friend, display the result as a modal pop up
		// the modal should display both the name and picture of the closest match

var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var friendList = require("../data/friends.js");
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/api/friends", function(request, response) {

	var newFriend = request.body;
	var matchDifference = 1000;
	var match;

	for (var i = 0; i < newFriend.scores.length; i++) {
		newFriend.scores[i] = parseInt(newFriend.scores[i]);
	}

	friendList.push(newFriend);


	for (var i = 0; i < friendList.length -1; i++) {
		totalDifference = 0;

		for (var j = 0; j < newFriend.scores.length; j++) {
			totalDifference += Math.abs(newFriend.scores[j] - friendList[i].scores[j])
		}

		if (totalDifference <= matchDifference) {
			matchDifference = totalDifference;
			match = friendList[i];
		}
	}

	response.json(match);

});


router.get("/api/friends", function(request, response) {
	response.json(friendList);
});

module.exports = router;


