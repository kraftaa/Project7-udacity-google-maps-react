import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import list from './list'
import axios from 'axios'

import Map from './components/Map'
import Sidebar from "./components/Sidebar";
// import SearchBar from 'material-ui-search-bar'
// import MuiThemeProvider from 'material-ui'
import AutoComplete from 'material-ui/AutoComplete';


class App extends Component {

  state = {
    venues: [],
    query: '',
    autocomplete: null,
    virtualMarkers: [],
    info: ''
  }

  componentDidMount() {
    this.getVenues()
    // this.onclickLocation()

}

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCIgum1zb5V0e5Z6em7zkzPhbM7R_E2eB0&callback=initMap")
    window.initMap = this.initMap
    // window.initAutocomplete = this.initAutocomplete
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "YCMGPBOPZCPOG4QYVXZ4ETGY5TLVNO34BGYAZ1NNKA3T44KS",
      client_secret: "EKIC4ZUG3DJJGATRLZA2WO1W3X5L204BHM0XG2RE5IGP0GK5",
      query: "food",
      near: "Sydney",
      v: "20180903"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
        console.log(response)
        //response.data.response.groups[0].items
      })
      .catch(error => {
        console.log("ERROR! " + error)
      })
  }

// https://developers.google.com/maps/documentation/javascript/tutorial
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.84, lng: 150.9319},
      zoom: 10,
      mapTypeId: 'roadmap'
    })

    var infowindow = new window.google.maps.InfoWindow()
    console.log("state ", this.state)


    // Display Dynamic Markers
    this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name}`

      // Create A Marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
        title: myVenue.venue.name
      })


        var virtMarker = this.state.virtualMarkers;
        virtMarker.push(marker);
        this.setState({virtualMarkers: virtMarker});

      marker.addListener('click', function() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2100);
        infowindow.setContent(contentString)
        infowindow.open(map, marker)


      })
    })
  }

    openMarker(marker = '') {
        const clientId = "VVPEFJC40SJDVH1YFRJS4IBNQ0GGZJY5X1XLHEA23H1LTVOQ\n";
        const clientSecret = "MEAM2N42L434P1MB1AJZFUHM5XAGMCDNGETUH5XNZIYEHOKI\n";
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

  render() {
      console.log(this.state.venues)
    return (
      // <main>

      <div id="container">
      <header>
                    <Sidebar
                        infoWindow={this.state.info}
                        openInfo={this.openMarker}
                        virtualMarker={this.state.virtualMarkers}
                    >

                    </Sidebar>
                    <h1 id="title">foursquare markers</h1>
                </header>

          <div
            id="map">
          </div>
      </div>

    )
  }
}

/*
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIgum1zb5V0e5Z6em7zkzPhbM7R_E2eB0&callback=initMap"
    async defer></script>
*/

function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
