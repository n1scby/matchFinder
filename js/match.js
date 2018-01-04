"use strict";
(function(){
    var userName = document.getElementById("userName");
    var matchButton = document.getElementById("matchButton");
	var url = 'http://api.petfinder.com/pet.find';
	var apiKey = '8df848db72f6484bc7856f389d706dcc';
	var lastOffset = 0;

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
				age: 'Baby',
				count: 1,
				offset: lastOffset,
				location: '30071',
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				if (response == undefined){
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
		});
    });


})()