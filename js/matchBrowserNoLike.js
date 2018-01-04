"use strict";
(function(){
    var userName = document.getElementById("userName");
    var matchButton = document.getElementById("matchButton");
    var matchOutput = document.getElementById("matchOutput");
    var matchURL = 'http://api.petfinder.com/pet.getRandom';
    var apiKey = '8df848db72f6484bc7856f389d706dcc';

    var httpRequest;
    
        var makeRequest = function makeRequest(url){
            httpRequest = new XMLHttpRequest();
    
            if(!url){
                alert("No URL was specified.");
                return false;
            }
    
            if (!httpRequest){
                console.log("Error creating XMLHttp Object");
                alert("Unable to create the AJAX request. ");
                return false;
            }
    
            httpRequest.onreadystatechange = getData;
            httpRequest.open("GET", url);
            httpRequest.send();
        };
    
        var getData = function getData(){
            console.log(httpRequest.readyState + " : " + httpRequest.status);
            if(httpRequest.readyState === XMLHttpRequest.DONE){
                if(httpRequest.status === 200){
                    // console.log("Got Data: " + httpRequest.responseText);
                    outputGif(httpRequest.responseText);
                }else{
                    alert("Request Failed." + httpRequest.status);
                }
            }
        }





    matchButton.addEventListener("click", function(){
        var url = matchURL + '?' + 'key='  + apiKey + '&location=30071&output=basic&format=json';
        makeRequest(url);
    });

    var outputAnimal = function outputAnimal(data){
        var matchResponse = JSON.parse(data);
      //  var newMatch = document.createElement("img");
      //  newMatch.src = gifResponse.data.images.original.url;
     //   gifOutput.appendChild(newGif);
     matchOutput.innerHTML=data.petfinder.pet.name;
    }

})()
