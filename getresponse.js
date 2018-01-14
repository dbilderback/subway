function getResponse() {
  // This is the API key for Giphy
  var APIKey = "7cfbab76-7af1-4ce7-b579-d1662046422d";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // Here we are building the URL we need to query the database
  var queryURL = "developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey="+ APIKey;
  //Ajax call to get the response object
  $.ajax({
    url: proxyurl+queryURL,
    method: "GET"
    //done promise to pass the response object to function to build the gif display and associate the events
  }).done(function(response) {
    //console.log(response);
    //var station = groupDestinations(response, 'DESTINATIONS');
    var stations = groupDestinations(response, 'DESTINATION');
    //console.log(stations);
    var arrivals = getArrivals(response, 'FIVE POINTS STATION', 'STATION', 'NEXT_ARR', 'TRAIN_ID');
    console.log(arrivals);
    var trainStops = arrivals.returnTrainStops(response, 'TRAIN_ID');
    console.log(trainStops);
    //console.log(response.hasValue("Airport", 'DESTINATION'));
    //fail promise to deal with unknown exceptions
  }).fail(function (jqXHR, textStatus) {
    alert('The request for your subject failed please try another button');
  });
}

function groupDestinations(array, property) {
    var hash = {};
    for (var i = 0; i < array.length; i++) {
        if (!hash[array[i][property]]) hash[array[i][property]] = [];
        hash[array[i][property]].push(array[i]);
    }
    return hash;
}

function getArrivals(currentTrains, station, property, returnString1, returnString2) {
  var hash = {};
  arrivals = [];
  for (var i =0; i < currentTrains.length; i++) {
    if (!hash[currentTrains[i][property]]) hash[currentTrains[i][property]] = [];
        //console.log(currentTrains[i][property].toString());
        if (currentTrains[i][property].toString() == station) {
          var nextArrvial = [] 
          nextArrvial.push(currentTrains[i][returnString1]);
          nextArrvial.push(currentTrains[i][returnString2]); 
          arrivals.push(nextArrvial);
          //hash[currentTrains[i][property]].push(currentTrains[i]);  
        }
         
  }
  return arrivals;
}

function getTrainStops(arrivals, response) {
  for (var i =0; i < arrivals.length; i++) {

  }
}
Array.prototype.returnTrainStops = function(response, trainID) {
    var trainStops = []; 
    var i = this.length;
    while (i--) {
      var x = response.length;
        while(x--) {
          //if (this[i][property] == filter) {
            console.log(this[i]);
        if (response[x][trainID] == this[i][1]) {
          console.log(this[i][1]);
          trainStops.push(response[x]);   // Found it
        //}
        }  
      }
    }
    return trainStops;
}