import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
// import Dropdown from './components/Dropdown'
import Map from './components/Map'
import Sidebar from "./components/Sidebar";

class App extends Component {

    menuFS = [
        { text: 'Food', value: 'food' },
        { text: 'Museums', value: 'museum' },
        { text: 'Art', value: 'art' },
        { text: 'Pool', value: 'pool' }
    ];

    constructor(props) {
        super(props);

        this.state = {
            center: {
            lat: -33.86411252085682,
            lng: 151.2079701552909
            },
            zoom: 13,
            map: '',
            info: '',
            venues: [],
            virtualMarkers: [],
            highlightedIcon: null,
            querySelector: undefined
        };

        this.updateQuery = this.updateQuery.bind(this);
        this.initMap = this.initMap.bind(this);
        this.generateMarkers = this.generateMarkers.bind(this);
        this.openMarker = this.openMarker.bind(this);
    }

// // to get foursquare query selection from child element Dropdown
//         updateQuery = (data) => {
//             this.setState({
//               querySelector: data
//             });
//           }

    updateQuery =(event) => {
        this.setState({querySelector:event.target.value});
        this.getVenues()
        this.setState({markers: []})
        this.setState({markers: this.state.markers})
        this.setState({virtualMarkers: []})
        this.setState({virtualMarkers: this.state.virtualMarkers})
         // this.getVenues()
        // this.componentDidMount()
        // this.renderMap()
        this.generateMarkers()
    }
//do not do initMap in this component as we won't have venues then
  componentDidMount() {
    this.getVenues()
    // this.onclickLocation()

}

  renderMap = () => {
    createMapLink("https://maps.googleapis.com/maps/api/js?key=AIzaSyCIgum1zb5V0e5Z6em7zkzPhbM7R_E2eB0&callback=initMap")
    window.initMap = this.initMap

    // window.initAutocomplete = this.initAutocomplete
  }

//to get venues from foursquare
    getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "YCMGPBOPZCPOG4QYVXZ4ETGY5TLVNO34BGYAZ1NNKA3T44KS",
      client_secret: "EKIC4ZUG3DJJGATRLZA2WO1W3X5L204BHM0XG2RE5IGP0GK5",
      query: this.state.querySelector,
      // categoryId: this.state.querySelector,
      near: "Sydney",
      v: "20180903"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
        // console.log(response)

        //response.data.response.groups[0].items
      })
      .catch(error => {
        console.log("ERROR! " + error)
      })
  }

    initMap() {
        let map;
        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: this.state.zoom,
            center: this.state.center
        });

        const infowindow = new window.google.maps.InfoWindow({});

        this.setState({map: map, info: infowindow});
        this.generateMarkers(map);
    }

    generateMarkers(map) {
        let self = this;

        this.state.venues.forEach(marker => {
            const loc = {lat: marker.venue.location.lat, lng: marker.venue.location.lng}
            //creating the custom marker icon
            let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            let mark = new window.google.maps.Marker({
                position: loc,
                map: map,
                title: marker.venue.name,
                icon: iconBase + 'coffee.png'
            });


            mark.addListener('click', function () {
                console.log(loc)
                self.openMarker(mark);
                // this.setState({highlightedIcon: this.makeMarkerIcon('FFFF24')})
                mark.setAnimation(window.google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                      mark.setAnimation(null);
                    }, 2100);
                //need to move a center of a map to the marker position
                let newMarkerCenter=new window.google.maps.LatLng(loc);
                map.setCenter(newMarkerCenter)


            });

            let virtMarker = this.state.virtualMarkers;
            virtMarker.push(mark);

            this.setState({virtualMarkers: virtMarker});
        });
    }

    openMarker(marker = '') {
        const clientId = "YCMGPBOPZCPOG4QYVXZ4ETGY5TLVNO34BGYAZ1NNKA3T44KS\n";
        const clientSecret = "EKIC4ZUG3DJJGATRLZA2WO1W3X5L204BHM0XG2RE5IGP0GK5\n";
        const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";


        if (this.state.info.marker != marker) {
            this.state.info.marker = marker;
            this.state.info.open(this.state.map, marker);
            marker.setAnimation(window.google.maps.Animation.DROP);


            this.state.info.addListener('closeClick', function () {
                this.state.info.setMarker(null);
            });

            this.markerInfo(url);
        }
    }

    markerInfo(url) {
        let self = this.state.info;
        let place;
        fetch(url)
            .then(function (resp) {
                if (resp.status !== 200) {
                    const err = "Can't load data.";
                    this.setState({info: err});
                }

                resp.json().then(function (data) {
                    var place = data.response.venues[0];
                    let phone = '';

                    if (place.contact.formattedPhone) {
                        phone = "<p><b>Phone:</b> "+ place.contact.formattedPhone +"</p>";
                    }

                    let twitter = '';

                    if (place.contact.twitter) {
                        twitter = "<p><b>Twitter:</b> "+ place.contact.twitter +"</p>";
                    }

                    var info =
                        "<div id='marker'>" +
                            "<h2>" + self.marker.title + "</h2>" +
                            phone +
                            twitter +
                            "<p><b>Address:</b> " + place.location.address + ", " + place.location.city + "</p>" +
                        "</div>";
                    self.setContent(info);
                });

                console.log(place);
            })
            .catch(function (err) {
                const error = "Can't load data.";
                self.setContent(error);
            });

    }


    render() {
            var message = 'You selected ' + this.state.querySelector;

console.log("cat", this.state.querySelector)
            console.log("venues", this.state.venues)
        return (
            <div id ="container">
                <header>
                    <h1 id="title">foursquare</h1>
                    <select
                      value = {this.state.querySelector}
                      onChange = {this.updateQuery.bind(this)}
                      >
                      <option value="pool">Pool</option>
                      <option value="food">Food</option>
                      <option value="museum">Museum</option>
                      <option value="art">Art</option>

                    </select>

                    <p>{message}</p>
                    <Sidebar
                        infoWindow={this.state.info}
                        openInfo={this.openMarker}
                        virtualMarker={this.state.virtualMarkers}
                    >

                    </Sidebar>
                </header>
                <div id ="map">
                <Map markers={this.state.venues.location}></Map>
                </div>
            </div>
        );
    }
}
function createMapLink(url) {
    let tag = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.onerror = function () {
        document.write("Google Maps can't be loaded. Please reload the page, and if that doesn't work reload the page. Otherwise reload page.");
    };
    tag.parentNode.insertBefore(script, tag);
}
export default App;
