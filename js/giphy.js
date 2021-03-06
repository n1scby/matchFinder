"use strict";

(function(){
    var searchText = document.getElementById("searchText");
    var giphyButton = document.getElementById("giphyButton");
    var giphyURL = "https://api.giphy.com/v1/gifs/translate";
    var gifOutput = document.getElementById("gifOutput");
    var resetButton = document.getElementById("resetButton");
    var gifArray = [];
    

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



    giphyButton.addEventListener("click", function(){
     if (searchText.value != "") {
        var urlText = searchText.value.trim().replace(/ /g, "+");
    //    var url = giphyURL + '?' + 's=' + '"' + urlText + '"' + '&api_key=' + '"' + 'z7zvwGpcF6HMSSSoCOf7MUftXKryEhQi' +'"';
          var url = giphyURL + '?' + 's=' + urlText + '&api_key='  + 'z7zvwGpcF6HMSSSoCOf7MUftXKryEhQi';

        makeRequest(url);
     }
    })

    resetButton.addEventListener("click", function(){
        gifArray = [];  //clear the array
        gifOutput.innerHTML = "";
        searchText.value = "";
    })

var outputGif = function outputGif(data){
    var gifResponse = JSON.parse(data);

    // insert the response into the first positin of the array (newest is first)
    gifArray.unshift(gifResponse);
    gifOutput.innerHTML="";
    gifArray.forEach(function(gifRes, idx, arr){
        var newGif = document.createElement("img");
        newGif.src = gifRes.data.images.original.url;
        newGif.classList.add("m-2");
        newGif.classList.add("newGif");
        gifOutput.appendChild(newGif);

    });
    
}
    
})()