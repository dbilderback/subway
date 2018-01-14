function getResponse() {
  // This is the API key for Giphy
  var APIKey = "7cfbab76-7af1-4ce7-b579-d1662046422d";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // Here we are building the URL we need to query the database
  var queryURL = "http://developer.itsmarta.com/RealtimeTrain/RestServiceNextTrain/GetRealtimeArrivals?apikey="+ APIKey;
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
    var arrivals = getStationArrivals(response, 'FIVE POINTS STATION', 'STATION');
    //console.log(arrivals);
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

function getStationArrivals(currentTrains, station, property) {
  var hash = {};
  for (var i =0; i < currentTrains.length; i++) {
    if (!hash[currentTrains[i][property]]) hash[currentTrains[i][property]] = [];
        //console.log(currentTrains[i][property].toString());
        if (currentTrains[i][property].toString() == station) {
          console.log(currentTrains[i]);
          //hash[currentTrains[i][property]].push(currentTrains[i]);  
        }
         
  }
  return hash;

}