// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

//our databas - if year is negative means BC if positive AD
let entry = '{"events": [' +
    '{ "category": "war", "name": "Biot war", "year": -300, "place": "Biot", "lon": 7.063503689307342, "lat": 43.630619063890514, "info": "The war took place in 300 BC . It was against the parrots and the dwarves" },' +
    '{ "category": "war", "name": "Antibes War", "year": -1500, "place": "Antibes", "lon": 7.127606575482881, "lat": 43.59003047304352, "info": "The war took place on the beach of Antibes. It was the 3rd war of witches against giants" },' +
    '{ "category": "political", "name": "My new castle", "year": 1320, "place": "Biot", "lon": 7.10745804675523, "lat": 43.619316719287940, "info": "Thanks to its Natural shelterd position, Biot became Commandery of the Knights of Malta" },' +
    '{ "category": "war", "name": "Arrival of the Ottomans", "year": 1543, "place": "Antibes", "lon": 7.1257330565054568, "lat": 43.55076284479389, "info": "He then raided the coasts of Sicily and Southern Italy through the month of June, anchoring in front of Rome at the mouth of the Tiber on 29 June, while Polin wrote reassurances that attacks against Rome would not take place. Barbarossa arrived with his fleet, accompanied by the French Ambassador Polin, at Île Saint-Honorat on 5 July. As almost nothing had been prepared on the French side to assist the Ottoman fleet, Polin was dispatched to meet with Francis I at Marolles and ask him for support.[8] Meanwhile, Barbarossa went to the harbour of Toulon on 10 July and then was received with honours at the harbour of Marseille on 21 July, where he joined the French forces under the Governor of Marseille, François, Count of Enghien" },' +
    '{ "category": "political", "name": "Antibes vote for independence", "year": 1547, "place": "Antibes", "lon": 7.125733056505457, "lat": 43.58299201293525, "info": "The population voted for independence from Italy and won" },' +
    '{ "category": "economy", "name": "The Tourist", "year": 1970, "place": "Antibes", "lon": 7.115484007155366, "lat": 43.58897954602113, "info": "After being a agricultural region for some time, Antibes became a hotspot for Tourists and Yachts" },' +
    '{ "category": "cultural", "name": "Canne filmfestival", "year": 1993, "place": "Cannes", "lon": 7.018106040448357, "lat": 43.55076284479385, "info": "The first Cannes Film festival took place" },' +
    '{ "category": "economy", "name": "No more flowers", "year": 1998, "place": "Biot", "lon": 7.107458046755829, "lat": 43.619316719287994, "info": "After decades of cultivating flowers, the last flower man gave up his business" }' +
    ']}'
let obj = JSON.parse(entry);
let markers = [];

//alert(obj.events[0].info);


let war, economy, political, cultural;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 2
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("you are here.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    map.setZoom(11.5);

                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

    });

    // defiene the different symbols for maps
    war = {
        path: "M 24.554688 22.3125 C 24.171875 21.929688 23.640625 21.785156 23.144531 21.878906 C 22.746094 21.164062 22.082031 20.308594 21.242188 19.46875 C 20.515625 18.742188 19.773438 18.144531 19.125 17.742188 C 19.882812 16.875 20.425781 16.042969 20.65625 15.417969 C 20.972656 15.53125 21.28125 15.503906 21.472656 15.3125 C 21.78125 15.003906 21.664062 14.386719 21.210938 13.929688 C 20.753906 13.476562 20.136719 13.355469 19.828125 13.667969 C 19.636719 13.859375 19.609375 14.167969 19.722656 14.484375 C 19.144531 14.695312 18.386719 15.179688 17.589844 15.851562 L 3.011719 0.496094 L 0 0.00390625 L 0.550781 2.957031 L 15.8125 17.636719 C 15.160156 18.414062 14.695312 19.152344 14.488281 19.71875 C 14.171875 19.605469 13.859375 19.632812 13.667969 19.824219 C 13.359375 20.132812 13.476562 20.753906 13.933594 21.207031 C 14.386719 21.664062 15.007812 21.78125 15.316406 21.472656 C 15.507812 21.28125 15.535156 20.96875 15.421875 20.652344 C 16.042969 20.425781 16.878906 19.882812 17.742188 19.125 C 18.148438 19.773438 18.742188 20.511719 19.46875 21.242188 C 20.308594 22.078125 21.167969 22.742188 21.878906 23.140625 C 21.789062 23.636719 21.933594 24.167969 22.316406 24.550781 C 22.933594 25.171875 23.9375 25.171875 24.554688 24.550781 C 25.171875 23.933594 25.171875 22.933594 24.554688 22.3125 Z M 1.136719 3.09375 L 0.808594 1.460938 L 1.648438 2.578125 L 15.691406 16.621094 Z M 1.136719 3.09375 ",
        fillColor: "blue",
        fillOpacity: 0.9,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
        anchor: new google.maps.Point(15, 30),
    };
    economy = {
        path: "M 23.003906 3.722656 C 22.34375 3.722656 21.808594 3.292969 21.808594 2.765625 C 21.808594 2.589844 21.628906 2.445312 21.410156 2.445312 L 3.589844 2.445312 C 3.371094 2.445312 3.191406 2.589844 3.191406 2.765625 C 3.191406 3.292969 2.65625 3.722656 1.996094 3.722656 C 1.773438 3.722656 1.597656 3.867188 1.597656 4.042969 L 1.597656 10.851562 C 1.597656 11.027344 1.773438 11.171875 1.996094 11.171875 C 2.65625 11.171875 3.191406 11.601562 3.191406 12.128906 C 3.191406 12.304688 3.371094 12.445312 3.589844 12.445312 L 21.410156 12.445312 C 21.628906 12.445312 21.808594 12.304688 21.808594 12.128906 C 21.808594 11.601562 22.34375 11.171875 23.003906 11.171875 C 23.226562 11.171875 23.402344 11.027344 23.402344 10.851562 L 23.402344 4.042969 C 23.402344 3.867188 23.226562 3.722656 23.003906 3.722656 Z M 22.605469 10.5625 C 21.824219 10.691406 21.210938 11.183594 21.050781 11.808594 L 3.949219 11.808594 C 3.789062 11.183594 3.175781 10.691406 2.394531 10.5625 L 2.394531 4.328125 C 3.175781 4.203125 3.789062 3.710938 3.949219 3.085938 L 21.050781 3.085938 C 21.210938 3.710938 21.824219 4.203125 22.605469 4.328125 Z M 22.605469 10.5625 M 19.613281 6.488281 C 18.953125 6.488281 18.417969 6.917969 18.417969 7.445312 C 18.417969 7.976562 18.953125 8.40625 19.613281 8.40625 C 20.273438 8.40625 20.8125 7.976562 20.8125 7.445312 C 20.8125 6.917969 20.273438 6.488281 19.613281 6.488281 Z M 19.613281 7.765625 C 19.394531 7.765625 19.214844 7.621094 19.214844 7.445312 C 19.214844 7.269531 19.394531 7.128906 19.613281 7.128906 C 19.835938 7.128906 20.011719 7.269531 20.011719 7.445312 C 20.011719 7.621094 19.835938 7.765625 19.613281 7.765625 Z M 19.613281 7.765625 M 5.386719 6.488281 C 4.726562 6.488281 4.1875 6.917969 4.1875 7.445312 C 4.1875 7.976562 4.726562 8.40625 5.386719 8.40625 C 6.046875 8.40625 6.582031 7.976562 6.582031 7.445312 C 6.582031 6.917969 6.046875 6.488281 5.386719 6.488281 Z M 5.386719 7.765625 C 5.164062 7.765625 4.988281 7.621094 4.988281 7.445312 C 4.988281 7.269531 5.164062 7.128906 5.386719 7.128906 C 5.605469 7.128906 5.785156 7.269531 5.785156 7.445312 C 5.785156 7.621094 5.605469 7.765625 5.386719 7.765625 Z M 5.386719 7.765625 M 12.5 4.148438 C 10.226562 4.148438 8.378906 5.628906 8.378906 7.445312 C 8.378906 9.265625 10.226562 10.746094 12.5 10.746094 C 14.773438 10.746094 16.621094 9.265625 16.621094 7.445312 C 16.621094 5.628906 14.773438 4.148438 12.5 4.148438 Z M 15.800781 7.128906 L 14.132812 7.128906 C 14.097656 6.320312 13.929688 5.511719 13.613281 4.941406 C 14.78125 5.273438 15.648438 6.113281 15.800781 7.128906 Z M 9.199219 7.765625 L 10.867188 7.765625 C 10.902344 8.574219 11.070312 9.382812 11.382812 9.953125 C 10.21875 9.617188 9.351562 8.777344 9.199219 7.765625 Z M 10.867188 7.128906 L 9.199219 7.128906 C 9.351562 6.113281 10.21875 5.273438 11.382812 4.941406 C 11.070312 5.511719 10.902344 6.320312 10.867188 7.128906 Z M 13 9.453125 C 12.773438 9.988281 12.542969 10.105469 12.5 10.105469 C 12.453125 10.105469 12.226562 9.988281 12 9.453125 C 11.8125 8.996094 11.695312 8.40625 11.664062 7.765625 L 13.335938 7.765625 C 13.304688 8.40625 13.1875 8.996094 13 9.453125 Z M 11.664062 7.128906 C 11.695312 6.488281 11.8125 5.898438 12 5.441406 C 12.226562 4.902344 12.453125 4.789062 12.5 4.789062 C 12.546875 4.789062 12.773438 4.902344 13 5.441406 C 13.1875 5.898438 13.304688 6.488281 13.335938 7.128906 Z M 13.617188 9.953125 C 13.929688 9.382812 14.097656 8.574219 14.132812 7.765625 L 15.800781 7.765625 C 15.648438 8.777344 14.78125 9.617188 13.617188 9.953125 Z M 13.617188 9.953125 M 24.601562 1.171875 L 0.398438 1.171875 C 0.179688 1.171875 0 1.3125 0 1.488281 L 0 13.402344 C 0 13.582031 0.179688 13.722656 0.398438 13.722656 L 24.601562 13.722656 C 24.820312 13.722656 25 13.582031 25 13.402344 L 25 1.488281 C 25 1.3125 24.820312 1.171875 24.601562 1.171875 Z M 24.203125 13.085938 L 0.796875 13.085938 L 0.796875 1.808594 L 24.203125 1.808594 Z M 24.203125 13.085938",
        fillColor: "green",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 1,
        anchor: new google.maps.Point(15, 30),
    };
    political = {
        path: "M256 26.2L52 135h408L256 26.2zM73 153v14h366v-14H73zm16 32v206h30V185H89zm101.334 0v206h30V185h-30zm101.332 0v206h30V185h-30zM393 185v206h30V185h-30zM73 409v30h366v-30H73zm-32 48v30h430v-30H41z",
        fillColor: "gray",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.05,
        anchor: new google.maps.Point(15, 30),

    }
    cultural = {
        path: "M419.517,464.592l-30.801,2.111l-9.419-137.389c17.735-4.813,33.692-14.774,46.095-29.001 c16.531-18.965,24.693-43.155,22.982-68.113L438.245,84.452c-0.968-14.125-13.243-24.826-27.371-23.859l-136.268,9.341 c-8.216,0.565-15.253,4.97-19.53,11.325c-4.177-3.848-9.461-6.207-15.201-6.687L103.761,63.221 c-14.105-1.172-26.543,9.345-27.72,23.451l-6.542,78.429c-0.004,0.045-0.009,0.091-0.011,0.136l-5.758,69.018 c-2.079,24.93,5.724,49.237,21.974,68.444c12.19,14.409,27.999,24.606,45.662,29.679l-11.449,137.235l-30.766-2.566 c-10.147-0.839-19.033,6.684-19.877,16.816c-0.844,10.133,6.684,19.032,16.816,19.877l98.226,8.194 c0.52,0.043,1.038,0.065,1.551,0.065c9.475,0,17.524-7.27,18.327-16.881c0.844-10.133-6.684-19.031-16.816-19.877l-30.766-2.566 l11.449-137.256c18.256-2.078,35.538-9.494,49.945-21.681c19.207-16.249,30.931-38.928,33.01-63.857l5.594-67.064l4.268,62.242 c3.113,45.409,38.167,81.129,81.682,86.749l9.421,137.417l-30.801,2.111c-10.144,0.695-17.803,9.483-17.108,19.627 c0.665,9.716,8.755,17.152,18.349,17.152c0.423,0,0.849-0.015,1.278-0.044l98.336-6.742c10.144-0.695,17.803-9.483,17.108-19.627 S429.665,463.9,419.517,464.592z M214.324,246.817c-1.263,15.13-8.4,28.912-20.099,38.809s-26.477,14.658-41.602,13.391 c-15.129-1.262-28.911-8.399-38.808-20.098c-9.897-11.698-14.652-26.473-13.391-41.602l3.772-45.215	c19.171,5.829,39.504,7.57,59.414,5.003c16.427-2.12,33.35-0.275,48.937,5.335l5.318,1.913L214.324,246.817z M221.027,166.427 c-19.94-6.504-41.329-8.525-62.13-5.84c-17.335,2.236-35.105,0.074-51.396-6.255l-0.151-0.059l4.457-53.432l113.899,9.5 L221.027,166.427z M291.913,159.401l-3.667-53.493l114.027-7.817l3.849,56.148c-20.695-3.417-42.143-2.182-62.299,3.615 c-16.795,4.83-34.691,5.377-51.752,1.583L291.913,159.401z M317.136,281.636c-11.552-10.068-18.485-23.954-19.524-39.099 l-3.103-45.259c6.728,0.972,13.517,1.467,20.304,1.467c13.221,0,26.437-1.84,39.184-5.505c15.918-4.579,32.924-5.312,49.181-2.121 l5.546,1.089l2.915,42.511c1.038,15.146-3.935,29.848-14.004,41.399c-10.069,11.552-23.956,18.485-39.1,19.522 C343.388,296.678,328.687,291.706,317.136,281.636z M234.787,18.64c-5.782-0.485-11.403,1.317-15.831,5.063c-4.431,3.748-7.136,8.998-7.617,14.775 c-0.484,5.782,1.314,11.407,5.063,15.837c3.746,4.428,8.993,7.133,14.78,7.617c0.61,0.052,1.215,0.076,1.816,0.076 c11.164,0,20.685-8.592,21.631-19.914C255.628,30.159,246.729,19.638,234.787,18.64z M180.569,4.264c-11.936-1.006-22.456,7.902-23.454,19.844c-0.994,11.931,7.905,22.45,19.844,23.448 c0.61,0.052,1.215,0.076,1.816,0.076c11.165,0,20.686-8.592,21.631-19.914C201.404,15.783,192.505,5.262,180.569,4.264z M420.553,26.257v-0.006c-0.398-5.788-3.025-11.076-7.4-14.888c-4.373-3.811-9.971-5.695-15.753-5.295 c-5.789,0.395-11.078,3.023-14.892,7.397c-3.812,4.374-5.694,9.972-5.297,15.754c0.396,5.791,3.023,11.079,7.399,14.893 c3.99,3.477,8.998,5.348,14.236,5.348c0.503,0,1.01-0.017,1.517-0.052C412.311,48.592,421.369,38.207,420.553,26.257z M364.779,20.233c-0.82-11.946-11.216-20.995-23.158-20.183c-5.788,0.398-11.075,3.024-14.887,7.397 c-3.812,4.374-5.694,9.971-5.296,15.761c0.396,5.787,3.024,11.073,7.397,14.885c3.99,3.478,8.998,5.349,14.237,5.349 c0.503,0,1.01-0.017,1.517-0.052c5.789-0.396,11.078-3.023,14.892-7.397S365.177,26.022,364.779,20.233z",
        fillColor: "red",
        fillOpacity: 1,
        strokeWeight: 0,
        rotation: 0,
        scale: 0.05,
        anchor: new google.maps.Point(15, 30),

    }




    //how to add events
    //add all events
    //once you filterd the events make them appear on the map in this way
    for (let i = 0; i < obj.events.length; i++) {
        addEventonMap(obj.events[i])
    }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);


}


/*
//Timeline Slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
*/

// Update the current slider value (each time you drag the slider handle)
/*
slider.oninput = function() {
    output.innerHTML = this.value;
};
*/




function addMarker(location, map, name, type) {
    console.log("tape " + type);
    var marker = new google.maps.Marker({
        position: location,
        title: name,
        map: map,
        icon: type
            //icon: {type,
            //  size: new google.maps.Size(5, 5),
            //  scaledSize: new google.maps.Size(4, 4)}
    });

    return marker;

}

function addEventonMap(event) {
    //create Textbox content
    if (event.year > 0) {
        x = "AD"
    } else {
        x = "BC"
    }
    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">' + event.name + '</h1><h3>' + "   " + Math.abs(event.year) + " " + x + "</h3>" +
        '<div id="bodyContent">' +
        "<p>" + event.info + "</p>" +
        "</div>" +
        "</div>";
    //extract pos
    pos = { lat: event.lat, lng: event.lon };
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    let type = event.category;
    let mark;
    //	create marker according to category
    switch (type) {
        case "political":
            mark = addMarker(pos, map, event.name, political);
            break;
        case "economy":
            mark = addMarker(pos, map, event.name, economy);
            break;
        case "war":
            mark = addMarker(pos, map, event.name, war);
            break;
        case "cultural":
            mark = addMarker(pos, map, event.name, cultural);
            break;

    }
    //show textboxes if click
    mark.addListener("click", () => {
        infowindow.open({
            anchor: mark,
            map,
            shouldFocus: true,
        });

    });

    markers.push(mark);
}

function hideMarkers() {
    console.log("i should hide now");
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}


var timeIndex = [];
var filterIndex = [];
var searchIndex = [];
for (let i = 0; i < obj.events.length; i++) {
    timeIndex.push(1);
    filterIndex.push(1);
    searchIndex.push(1);
}

function filterSearch() {
    var input = document.getElementById("search1").value;
    var resource = document.getElementById("eventclass");
    var result = "<table border = '1'>";
    var res = [];
    num = 0;
    hideMarkers();
    for (let i = 0; i < obj.events.length; i++) {
        timeIndex[i] = 1;
        filterIndex[i] = 1;
        searchIndex[i] = 1;
        var item = obj.events[i].category + obj.events[i].name + obj.events[i].year + obj.events[i].place + obj.events[i].info;
        if (item.includes(String(input))) {
            if (event.year > 0) {
                x = "AD"
            } else {
                x = "BC"
            }
            result += "<tr><h3>" + obj.events[i].name + "</h3>Year :" + Math.abs(obj.events[i].year) + " " + x + "</br></br>Location: " + obj.events[i].place + "</br></br>Summary: " + obj.events[i].info + "</br></br></tr>";
            res[num] = obj.events[i];
            num += 1;
            searchIndex[i] = 1;
        } else {
            timeIndex[i] = 0;
            filterIndex[i] = 0;
            searchIndex[i] = 0;
        }
    }
    if (num != 0) {
        resource.innerHTML = result;
        for (let i = 0; i < res.length; i++) {
            addEventonMap(res[i]);
        }
    } else {
        resource.innerHTML = "<h2>No matched result!</h2>";
    }
}

function timeFilterChange() {
    hideMarkers();
    var input = document.getElementById("myRange").value;
    if (input == 100) {
        input = 2022;
    } else if (input == 90) {
        input = 2010;
    } else {
        input = 50 * input - 2000;
    }
    time = input;
    var resource = document.getElementById("eventclass");
    var result = "<table border = '1'>";
    var res = [];

    if (input == -2000) {
        num = 0;
        for (let i = 0; i < obj.events.length; i++) {
            timeIndex[i] = 1;
            if (filterIndex[i] == 1 && searchIndex[i] == 1) {
                if (obj.events[i].year > 0) {
                    x = "AD"
                } else {
                    x = "BC"
                }
                result += "<tr><h3>" + obj.events[i].name + "</h3>Year :" + Math.abs(obj.events[i].year) + " " + x + "</br></br>Location: " + obj.events[i].place + "</br></br>Summary: " + obj.events[i].info + "</br></br></tr>";
                res[num] = obj.events[i];
                num += 1;
            }
        }
        if (num != 0) {
            resource.innerHTML = result;
            for (let i = 0; i < res.length; i++) {
                addEventonMap(res[i]);
            }
        } else {
            resource.innerHTML = "<h2>Nothing happened around this time...</h2>";
        }
    } else if (input == 2022) {
        num = 0;
        for (let i = 0; i < obj.events.length; i++) {
            console.log(obj.events[i].year);
            if (obj.events[i].year > 2012 && filterIndex[i] == 1 && searchIndex[i] == 1) {
                if (obj.events[i].year > 0) {
                    x = "AD"
                } else {
                    x = "BC"
                }
                result += "<tr><h3>" + obj.events[i].name + "</h3>Year :" + Math.abs(obj.events[i].year) + " " + x + "</br></br>Location: " + obj.events[i].place + "</br></br>Summary: " + obj.events[i].info + "</br></br></tr>";
                res[num] = obj.events[i];
                num += 1;
                timeIndex[i] = 1;
            } else if (obj.events[i].year <= 2012) {
                timeIndex[i] = 0;
            } else {
                timeIndex[i] = 1;
            }
        }
        if (num != 0) {
            resource.innerHTML = result;
            for (let i = 0; i < res.length; i++) {
                addEventonMap(res[i]);
            }
        } else {
            resource.innerHTML = "<h2>Nothing happened around this time...</h2>";
        }
    } else {
        num = 0;
        for (let i = 0; i < obj.events.length; i++) {

            if (obj.events[i].year <= Number(input) + 250 && obj.events[i].year > input - 250 && filterIndex[i] == 1 && searchIndex[i] == 1) {
                if (obj.events[i].year > 0) {
                    x = "AD"
                } else {
                    x = "BC"
                }
                result += "<tr><h3>" + obj.events[i].name + "</h3>Year :" + Math.abs(obj.events[i].year) + " " + x + "</br></br>Location: " + obj.events[i].place + "</br></br>Summary: " + obj.events[i].info + "</br></br></tr>";
                res[num] = obj.events[i];
                num += 1;
                timeIndex[i] = 1;
            } else if (obj.events[i].year > Number(input) + 250 || obj.events[i].year <= input - 250) {
                timeIndex[i] = 0;
            } else {
                timeIndex[i] = 1;
            }
        }
        if (num != 0) {
            resource.innerHTML = result;
            for (let i = 0; i < res.length; i++) {
                addEventonMap(res[i]);
            }
        } else {
            resource.innerHTML = "<h2>Nothing happened around this time...</h2>";
        }
    }


}

function filterSelection(etype) {
    hideMarkers();
    var resource = document.getElementById("eventclass");
    var result = "<table border = '1'>";
    var res = [];
    num = 0;
    for (let i = 0; i < obj.events.length; i++) {
        if (timeIndex[i] == 1 && (obj.events[i].category == etype || etype == "all") && searchIndex[i] == 1) {
            if (obj.events[i].year > 0) {
                x = "AD"
            } else {
                x = "BC"
            }
            result += "<tr><h3>" + obj.events[i].name + "</h3>Year :" + Math.abs(obj.events[i].year) + " " + x + "</br></br>Location: " + obj.events[i].place + "</br></br>Summary: " + obj.events[i].info + "</br></br></tr>";
            res[num] = obj.events[i];
            num += 1;
            filterIndex[i] = 1;
        } else if (obj.events[i].category != etype && etype != "all") {
            filterIndex[i] = 0;
        } else {
            filterIndex[i] = 1;
        }
    }

    if (num != 0) {
        resource.innerHTML = result;
        for (let i = 0; i < res.length; i++) {
            addEventonMap(res[i]);
        }
    } else {
        resource.innerHTML = "<h2>No matched result!</h2>";
    }
}
