   // -------------------------------------------Maps----------------------------------------//

      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 34.052, lng: -118.243},
          zoom: 12

        });
        infoWindow = new google.maps.InfoWindow;


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

        var tape = {
          url: "assets/images/tape.png",
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0,0),
          anchor: new google.maps.Point(10, 20)
        };





var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

var posters = [];
           $.get("/api/posts/", function(response){

              for(var i = 0; i < response.length; i++) {
                var infowindow = new google.maps.InfoWindow();


                posters.push([response[i].title, response[i].description]);
                console.log(response[i].title, response[i].description);

                var mark = new google.maps.Marker({
                  position: {lat: parseFloat(response[i].latitude), lng: parseFloat(response[i].longitude)},
                  map: map,
                  icon: tape
                });

                mark.addListener('click', (function(){
                  return function(){
                    infowindow.setContent(posters[i][0] + " " + posters[i][1]);
                    infowindow.open(map, mark);
                  }
                })(mark, i));
             
           // console.log(posters);
              }
            });
  console.log(posters);

/*var contentString =  
'<div id="content">'+
      '<div id="siteNotice">'+
      '</div>' +
      '<div id="bodyContent">'+
      '<p><b>Title: </b>' + response[0].title + '<p><b>Description: </b> ' + response [0].description + 
      '<audio controls>'+
        '<source src="../assets/audio/rhcp.mp3" type="audio/mp3">'+
        'Your browser does not support the audio element.'+
      '</audio>'+
      '</div>'+
      '</div>'; 

        var infowindow = new google.maps.InfoWindow({
        content: contentString
        }); */

 /*var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title:"You are here!" 
  }); */

 /*marker.addListener('click', function() {
      infowindow.open(map, marker);
      }); */


            // infoWindow.setPosition(pos);
            // infoWindow.setContent('Location found.');
            // infoWindow.open(map);
            map.setCenter(pos);


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }






      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

