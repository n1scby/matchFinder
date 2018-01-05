"use strict";
(function(){
    var userName = document.getElementById("userName");
	var matchButton = document.getElementById("matchButton");
	var userName = document.getElementById("userName");
	var heightFeet = document.getElementById("heightFeet");
	var heightInches = document.getElementById("heightInches");
	var sexualPreference = document.getElementById("sexualPreference");
	var walkingStyle = document.getElementById("walkingStyle");
	var eventType = document.getElementById("eventType");
	var hogwarts = document.getElementById("hogwarts");
	var maintenance = document.getElementById("maintenance");
	var food = document.getElementById("food");
	var url = 'http://api.petfinder.com/pet.find';
	var apiKey = '8df848db72f6484bc7856f389d706dcc';
	var lastOffset = 0;
	var animalType = '';
	var animalAge = '';
	var animalSize = '';
	var dogBreed = '';
	var animalSex = '';
	var matchLocation = '';

    matchButton.addEventListener("click", function(){
        // Within $.ajax{...} is where we fill out our query 
		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				animal: 'dog',
				size: 'M',
				sex: 'F',
				age: '',
				breed: '',
				count: 1,
				offset: lastOffset,
				location: '30071',
				output: 'basic',
				format: 'json'
			},
			// Handle the response back from Petfinder
//			success: function(response) {
			success: function(response) {
				displayMatch(response);
			},
			error: function(request, error) {
				console.log("Request: " + JSON.stringify(request) + "  Error: " + error);
				match.Output('Sorry, No Matches at this Time.');
			}
				
			
			});
		
	});

	var getAnimalType = function getAnimalType(){
		if (eventType.value == "theater") {
			animalType = "bird";
			return;
		} 
		if (eventType.value == "computer" || eventType.value == "cosplay") {
			animalyType = "cat";
			return;
		}
		if (howarts.value == "Slytherin") {
			animalType = "reptile";
			return;
		}
		if (maintenance == "noMaintenance") {
			animalType = "barnyard";
			return
		}

		animalType = "dog";
	}
	
	var displayMatch = function displayMatch(response){
		if (response.petfinder.pets.pet.name == undefined){
			matchOutput.innerHTML = "Oh no.  NO matches!"
		} else
		{
		console.log(response); // debugging
		var dogName = response.petfinder.pets.pet.name.$t;
		var img = response.petfinder.pets.pet.media.photos.photo[1].$t;
		var id = response.petfinder.pets.pet.id.$t;
		lastOffset = response.petfinder.lastOffset.$t;

		var newName = document.createElement('a');
		var newDiv = document.createElement('div');
		newName.textContent = dogName;
		newName.href = 'https://www.petfinder.com/petdetail/' + id;

		var newImg = document.createElement('img');
		newImg.src = img;
		
		var list = document.createElement("div");
		list.setAttribute("id", "List");
		document.body.appendChild(list);

		newDiv.appendChild(newName);
		list.appendChild(newDiv);
		list.appendChild(newImg);
		};
	}	


})()