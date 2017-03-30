


	var map;


	function initMap() {
	    var uluru = {lat: 65.161, lng: -16.38};
	    map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 4,
	      center: uluru
	    });
	    
	}

    $(document).ready(function () {	

        $.getJSON("http://apis.is/earthquake/is", function(data) {
        	for (var i = data.results.length-1; i >= 0; i--) {

        		//test.innerHTML += "<div class='quake'>NEW earthquake"+
        		//								"<br>Depth: "+data.results[i].depth + 
				//				        		"<br>Location: "+data.results[i].humanReadableLocation + 
				//				        		"<br>Size: "+data.results[i].size + 
				//				        		"<br>Date: "+data.results[i].timestamp + 
				//				        		"<br><br></div>"
	        	marker = new google.maps.Marker({
			        position: new google.maps.LatLng(data.results[i].latitude, data.results[i].longitude),
			        map: map
	  			});
	  			var myCont = {content: "<div class='quake'>EarthQuake"+
        										"<br>Depth: "+data.results[i].depth + 
								        		"<br>Location: "+data.results[i].humanReadableLocation + 
								        		"<br>Size: "+data.results[i].size + 
								        		"<br>Date: "+data.results[i].timestamp + 
								        		"<br><br></div>",
							  zIndex: 999999}
	  			marker.infowindow = new google.maps.InfoWindow(myCont);
		        google.maps.event.addListener(marker, 'click', function(e) {
		        	$("<div id='drag'>"+this.infowindow.content+"</div>").appendTo("#cards").draggable();

			        map.setZoom(6);
			        map.setCenter(this.getPosition());
			        this.infowindow.open(map, this);
			    });
        	}

        	console.log(data.results)
		});

	});