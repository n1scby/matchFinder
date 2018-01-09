"use strict";
(function () {
	var userName = document.getElementById("userName");
	var matchButton = document.getElementById("matchButton");
	var clearButton = document.getElementById("clearButton");
	var userName = document.getElementById("userName");
	var heightFeet = document.getElementById("heightFeet");
	var heightInches = document.getElementById("heightInches");
	var sexualPreference = document.getElementById("sexualPreference");
	var walkingStyle = document.getElementById("walkingStyle");
	var eventType = document.getElementById("eventType");
	var hogwarts = document.getElementById("hogwarts");
	var maintenance = document.getElementById("maintenance");
	var matchOutput = document.getElementById("matchOutput");
	var food = document.getElementById("food");
	var moreButton = document.getElementById("moreButton");
	var errorOutput = document.getElementById("errorOutput");
	var url = 'http://api.petfinder.com/pet.find';
	var apiKey = '8df848db72f6484bc7856f389d706dcc';
	var lastOffset = 0;
	var animalType = '';
	var animalAge = '';
	var animalSize = '';
	var dogBreed = '';
	var animalSex = '';
	var matchLocation = "";
	var noImage = "images/noImage.jpg";
	var formErrMsg = "";

	matchButton.addEventListener("click", function () {
		errorOutput.classList.add("d-none");
		// validate form entry
		formErrMsg = validateForm();
        if (formErrMsg == ""){
		// determine values to pass
		matchOutput.innerHTML = "";
		getAnimalType();
		getAnimalSex();
		getAnimalAge();
		getAnimalSize();
		getDogBreed();
		getLocation();
		lastOffset = 0;
		getMatchData();
		}
		else{
			errorOutput.innerHTML = formErrMsg;
			errorOutput.classList.remove("d-none");

		}



	});

	moreButton.addEventListener("click", function() {
		matchOutput.innerHTML = "";
		window.scrollTo(0,0);
		getMatchData();
	})

    var validateForm = function validateForm(){
		var formErr = "";
		if (userName.value == "") {
			formErr = "Please enter a name. <br>";
		}
		if (heightFeet.value == 0 || heightFeet.value < 0 || heightInches.value < 0) {
			formErr += "Please enter a valid height. <br>";
		}
		if (sexualPreference.value == "") {
			formErr += "Please select a gender preference. <br>";
		}
		if (zipcode.value <= 0) {
			formErr += "Please enter a zipcode. <br>";
		}
		if (walkingStyle.value == "") {
			formErr += "Please select a walking style. <br>";
		}
		if (eventType.value == "") {
			formErr += "Please select an enjoyable event. <br>";
		}
		if (food.value == "") {
			formErr += "Please select your favorite food. <br>";
		}
		if (hogwarts.value == "") {
			formErr += "Please select a house. <br>";
		}
		if (maintenance.value == "") {
			formErr += "Please select a maintenance level. <br>";
		}
		return formErr;
	}




	var getMatchData = function getMatchData(){
				// Fill out the query 
				$.ajax({
					url: url,
					jsonp: "callback",
					dataType: "jsonp",
					data: {
						key: apiKey,
						animal: animalType,
						size: animalSize,
						sex: animalSex,
						age: animalAge,
						breed: dogBreed,
						count: 10,
						offset: lastOffset,
						location: matchLocation,
						output: 'basic',
						format: 'json'
					},
					// Handle the response back from Petfinder
					success: function (response) {
						processMatches(response);
					},
					error: function (request, error) {
						console.log("Request: " + JSON.stringify(request) + "  Error: " + error);
						match.Output('Sorry, No Matches at this Time.');
					}
		
		
				});
	}

	clearButton.addEventListener("click", function () {
		matchOutput.innerHTML = "";
		errorOutput.classList.add("d-none");		
		moreButton.classList.add("d-none");
	})

	var getAnimalType = function getAnimalType() {
		if (eventType.value == "theater") {
			animalType = "bird";
			return;
		}
		if (eventType.value == "computer" || eventType.value == "cosplay") {
			animalType = "cat";
			return;
		}
		if (hogwarts.value == "Slytherin") {
			animalType = "reptile";
			return;
		}
		if (maintenance.value == "no") {
			animalType = "barnyard";
			return
		}

		animalType = "dog";
		return;
	}

	var getAnimalAge = function getAnimalAge() {
		switch (walkingStyle.value) {
			case "beach":
			case "stroll":
				animalAge = "Adult";
				break;
			case "hiking":
				animalAge = "Young";
				break;
			case "short":
				animalAge = "Senior";
				break;
			case "skipping":
				animalAge = "Baby";
				break;
			default:
				animalAge = "adult";
		}
		return;
	}


	var getAnimalSex = function getAnimalSex() {
		if (sexualPreference.value == "male") {
			animalSex = "M";
			return;
		}
		if (sexualPreference.value == "female") {
			animalSex = "F";
			return;
		}
		animalSex = "";  //let api choose.
	}

	var getAnimalSize = function getAnimalSize() {

		// Default is blank.  Let the api choose.
		animalSize = "";

		// All high maint people get small animals
		if (maintenance.value == "high") {
			animalSize = "S";
			return;
		}



		// If you are tall (and not hight maint), then you get either XL or L.
		if (heightFeet.value == 6 && heightInches.value <= 5 ) {
				animalSize = "L";
			} else {
				if (heightFeet.value >= 6) {
				animalSize = "XL";
				}
			}
		
		return;

	}

	var getLocation = function getLocation() {
		if (zipcode.value < 99999 && zipcode.value > 1) {
			matchLocation = zipcode.value;

		}
		return;
	}

	var getDogBreed = function getDogBreed() {
		// default breed = "", let the api choose
		dogBreed = "";
		if (animalType == "dog") {
			if (animalSize == "S" && food.value == "Mexican") {
				dogBreed = "Chihuahua";
				return;
			}
			if (food.value == "American" && animalSize == "XL") {
				dogBreed = "Great Dane";
				return;
			}
			if (food.value == "Italian") {
				dogBreed = "Greyhound";
				return;
			}
		}
		return;
	}

	var Match = function Match(name, size, sex, breed, age, type, image, id) {
		this.matchName = name;
		this.matchSize = size;
		this.matchSex = sex;
		this.matchBreed = breed;
		this.matchAge = age;
		this.matchType = type;
		this.matchImage = image;
		this.matchID = id;
	}

	// Load the matches into an array

	var loadMatches = function loadMatches(matchData) {
		var matchArray = [];
		matchData.petfinder.pets.pet.forEach(function (pet, idx, arry) {
		// verify photo is defined
		
			if (pet.media.photos == undefined) {
				var img = noImage;
			} else {
				var img = pet.media.photos.photo[3].$t;
			}

			// verify breed is defined
			var breed = "";
			if (pet.breeds.breed[0] == undefined) {
				breed = pet.breeds.breed.$t;
			} else
			{
				breed = pet.breeds.breed[0].$t;
			}

			var newMatch = new Match(pet.name.$t, pet.size.$t, pet.sex.$t, breed, pet.age.$t, pet.animal.$t, img, pet.id.$t);
			matchArray.push(newMatch);
		});
		return matchArray;
	}

	var processMatches = function processMatches(response) {
		if (response.petfinder.pets == undefined || response.petfinder.pets.pet == undefined) {
			matchOutput.innerHTML = "Oh no!  No matches!";
			lastOffset = 0;
		} else {
			var matchList = loadMatches(response);
			// if lucky then get random number based on length of matchlist else....

			matchList.forEach(function (match, idx, arr) {
				displayMatch(match);
			})

			if (matchList.length > 9){

				moreButton.classList.remove("d-none");
				lastOffset = response.petfinder.lastOffset.$t;		
			
			} else
			{
				moreButton.classList.add("d-none");
				lastOffset = 0;
			}

			
		}
	}
		var displayMatch = function displayMatch(match) {
			// if (response.petfinder.pets == undefined || response.petfinder.pets.pet == undefined) {
			// 	matchOutput.innerHTML = "Oh no!  No matches!";
			// 	lastOffset = 0;

			// } else {
			// 	console.log(response); // debugging
			// 	var animalName = response.petfinder.pets.pet.name.$t;
			// 	if (response.petfinder.pets.pet.media.photos == undefined) {
			// 		img = noImage;
			// 	} else {
			// 		var img = response.petfinder.pets.pet.media.photos.photo[3].$t;

			// 	}
			// 	var id = response.petfinder.pets.pet.id.$t;


			
			// Create Card Div
			var cardDiv = document.createElement('div');
			cardDiv.classList.add("card");
			cardDiv.classList.add("cardStyle");

			// Create img for card
			var animalPic = document.createElement("img");
			animalPic.src = match.matchImage;
			animalPic.classList.add("card-img-top");

			// Create card body
			var cardBody = document.createElement("div");
			cardBody.classList.add("card-body");

			// Create card title
			var cardTitle = document.createElement("h5");
			cardTitle.classList.add("card-title");
			cardTitle.innerText = match.matchName;

			// Create paragraph with animal description
			var cardInfo = document.createElement("p");
			cardInfo.classList.add("card-text");
			cardInfo.innerHTML = "Gender: " + match.matchSex + "<br>Size: " + match.matchSize + "<br>Age: " + match.matchAge + "<br>Breed: " + match.matchBreed;


			// Create link to Animal Info
			var cardLink = document.createElement("a");
			cardLink.href = 'https://www.petfinder.com/petdetail/' + match.matchID;
			cardLink.target = "_blank";
			cardLink.innerText = "More Info";
			//	cardLink.classList.add("btn");
			//	cardLink.classList.add("btn-primary");

			// Add elements to Aside

			cardDiv.appendChild(animalPic);
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(cardInfo);
			cardBody.appendChild(cardLink);
			cardDiv.appendChild(cardBody);
			matchOutput.appendChild(cardDiv);



		
	}


})()