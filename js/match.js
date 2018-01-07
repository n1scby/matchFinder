"use strict";
(function () {
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
	var matchOutput = document.getElementById("matchOutput");
	var food = document.getElementById("food");
	var url = 'http://api.petfinder.com/pet.find';
	var apiKey = '8df848db72f6484bc7856f389d706dcc';
	var lastOffset = 0;
	var animalType = '';
	var animalAge = '';
	var animalSize = '';
	var dogBreed = '';
	var animalSex = '';
	var matchLocation = "";

	matchButton.addEventListener("click", function () {
		// determine values to pass
		getAnimalType();
		getAnimalSex();
		getAnimalAge();
		getAnimalSize();
		getDogBreed();
		getLocation();


		// Within $.ajax{...} is where we fill out our query 
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
				count: 1,
				offset: lastOffset,
				location: matchLocation,
				output: 'basic',
				format: 'json'
			},
			// Handle the response back from Petfinder
			//			success: function(response) {
			success: function (response) {
				displayMatch(response);
			},
			error: function (request, error) {
				console.log("Request: " + JSON.stringify(request) + "  Error: " + error);
				match.Output('Sorry, No Matches at this Time.');
			}


		});

	});

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


	var getAnimalSex = function getAnimalSex(){
		if (sexualPreference.value == "male"){
			animalSex = "M";
			return;
		}
		if (sexualPreference.value == "female"){
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

	

		// If you are tall, then you get either XL or L.
		if (heightFeet.value >= 6) {
			if (heightInches.value >= 5) {
				animalSize = "XL";
			} else {
				animalSize = "L";
			}
		}
		return;

	}

	var getLocation = function getLocation(){
		if (zipcode.value < 99999 && zipcode.value > 1)
		{
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




	var displayMatch = function displayMatch(response) {
		if (response.petfinder.pets == undefined || response.petfinder.pets.pet == undefined) {
			matchOutput.innerHTML = "Oh no.  NO matches!";
			lastOffset = 0;

		} else {
			console.log(response); // debugging
			var animalName = response.petfinder.pets.pet.name.$t;
		if (response.petfinder.pets.pet.media.photos == undefined){
		   img = "";
		} else
		{
			var img = response.petfinder.pets.pet.media.photos.photo[1].$t;
			
		}
			var id = response.petfinder.pets.pet.id.$t;
			lastOffset = response.petfinder.lastOffset.$t;

		// Create Row
			var newRow = document.createElement("div");
			newRow.classList.add("cardStyle")
		//	newRow.classList.add("row");

			// Create Card Div
		//	var newName = document.createElement('a');
			var cardDiv = document.createElement('div');
			cardDiv.classList.add("card");
			cardDiv.classList.add("cardStyle");
		//	cardDiv.classList.add("offset-md-1");
		//	cardDiv.classList.add("col-md-5");

			// Create img for card
			var animalPic = document.createElement("img");
			animalPic.src = img;
			animalPic.classList.add("card-img-top");

			// Create card body
			var cardBody = document.createElement("div");
			cardBody.classList.add("card-body");

			// Create card title
			var cardTitle = document.createElement("h5");
			cardTitle.classList.add("card-title");
			cardTitle.innerText = animalName;

			// Create paragraph with animal description
			var cardInfo = document.createElement("p");
			cardInfo.classList.add("card-text");


			// Create link to Animal Info
			var cardLink = document.createElement("a");
			cardLink.href= 'https://www.petfinder.com/petdetail/' + id;
			cardLink.innerText = "More Info";
			cardLink.classList.add("btn");
			cardLink.classList.add("btn-primary");

			// Add elements to Aside

			cardDiv.appendChild(animalPic);
			cardBody.appendChild(cardTitle);
			cardBody.appendChild(cardInfo);
			cardBody.appendChild(cardLink);
			cardDiv.appendChild(cardBody);
			matchOutput.appendChild(cardDiv);
			

			// newName.textContent = animalName;
			// newName.href = 'https://www.petfinder.com/petdetail/' + id;

			// var newImg = document.createElement('img');
			// newImg.src = img;

			// var list = document.createElement("div");
			// list.setAttribute("id", "List");
			// document.body.appendChild(list);

			// newDiv.appendChild(newName);
			// list.appendChild(newDiv);
			// list.appendChild(newImg);
		};
	}


})()