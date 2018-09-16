import React, {Component} from 'react';
import './App.css';
import axios from 'axios'
// import Dropdown from './components/Dropdown'
import Map from './components/Map'
import Search from "./components/Search";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            center:
              {
              lat: -33.86411252085682,
              lng: 151.2079701552909
              },
            zoom: 13,
            map: '',
            info: '',
            venues: [],
            listedMarkers: [],
            highlightedIcon: null,
            querySelector: 'pool',
            client_id: "YCMGPBOPZCPOG4QYVXZ4ETGY5TLVNO34BGYAZ1NNKA3T44KS",
            client_secret: "EKIC4ZUG3DJJGATRLZA2WO1W3X5L204BHM0XG2RE5IGP0GK5"
        };


 // const clientId = "VVPEFJC40SJDVH1YFRJS4IBNQ0GGZJY5X1XLHEA23H1LTVOQ\n";
 //        const clientSecret = "MEAM2N42L434P1MB1AJZFUHM5XAGMCDNGETUH5XNZIYEHOKI\n";
 //        const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";


        this.updateQuery = this.updateQuery.bind(this);
        this.initMap = this.initMap.bind(this);
        this.onclickLocation = this.onclickLocation.bind(this)
        // this.generateMarkers = this.generateMarkers.bind(this);
        // this.openMarker = this.openMarker.bind(this);
    }

// // to get foursquare query selection from child element Dropdown
//         updateQuery = (data) => {
//             this.setState({
//               querySelector: data
//             });
//           }

    updateQuery =(event) => {
        // this.setState({venues: []})
        // this.setState({virtualMarkers: []})
        this.setState({querySelector:event.target.value});
        this.getVenues()
        this.refreshListedMarkers();
        // this.setState({venues: this.state.venues})
      }

      refreshListedMarkers = () => {
        this.setState({listedMarkers: []})
        this.setState({listedMarkers: this.state.listedMarkers})
      }
        // this.setState({listedMarkers: this.state.listedMarkers})
         // this.getVenues()
        // this.componentDidMount()
        // this.renderMap()
        // this.generateMarkers()
    // }
//do not do initMap in this component as we won't have venues then
  componentDidMount() {
    // this.updateQuery()
    this.getVenues()
    this.onclickLocation()

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
      client_id: this.state.client_id,
      client_secret: this.state.client_secret,
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
        // this.generateMarkers(map);

        this.state.venues.forEach(fsVenue => {

          var contentString = `${fsVenue.venue.name} + ${fsVenue.venue.location.address}` + ' ' + `${fsVenue.venue.id}`

          const markerLocation = {lat: fsVenue.venue.location.lat, lng: fsVenue.venue.location.lng}
        //creating the custom marker icon
            let iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            let marker = new window.google.maps.Marker({
              position: markerLocation,
              map: map,
              title: fsVenue.venue.name,
              icon: iconBase + 'coffee.png'
            });


          marker.addListener('click', function () {
              console.log(markerLocation)

              // self.openMarker(mark);
              // this.setState({highlightedIcon: this.makeMarkerIcon('FFFF24')})
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
                  setTimeout(function() {
                    marker.setAnimation(null);
                  }, 2100);
                  infowindow.setContent(contentString)
              infowindow.open(map, marker)
          //need to move a center of a map to the marker position
              let newMarkerCenter=new window.google.maps.LatLng(markerLocation);
              map.setCenter(newMarkerCenter)


          });
          // this.setState((state) => ({
          //   listedMarkers: [...state.listedMarkers]
          // }))
          let listedMarker = this.state.listedMarkers;
          listedMarker.push(marker);

          this.setState({listedMarkers: listedMarker});

        });
  }

// onclickLocation = () => {
//     const that = this
//     const {infowindow} = this.state

//     const displayInfowindow = (e) => {
//       const {markers} = this.state
//       const markerInd =
//         markers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
//       that.populateInfoWindow(markers[markerInd], infowindow)
//     }
//     document.querySelector('.locations-list').addEventListener('click', function (e) {
//       if (e.target && e.target.nodeName === "LI") {
//         displayInfowindow(e)
//       }
//     })
//   }
  onclickLocation = () => {
    let that = this

    // let ven = this.getVenues()


      let {infowindow} = that.state.info
      let displayInfo = (e) => {
        let {markers} = that.state.venues

        // let markerInd = that.state.listedMarkers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
        // let g = that.state.listedMarkers[markerInd]

        // that.populateInfoWindow(that.state.listedMarkers[markerInd], "lala")
      }
      // let infowindowLS = new window.google.maps.InfoWindow({});
    document.querySelector('.sideBar').addEventListener('click', function (e) {
      for (var i = 0; i < that.state.listedMarkers.length; i++) {
        if  (that.state.listedMarkers[i].title.toLowerCase() === e.target.innerText.toLowerCase()) {
      // for (var i = 0; i < that.state.venues.length; i++) {
      //   if  (that.state.venues[i].venue.name.toLowerCase() === e.target.innerText.toLowerCase()) {
        e.target.style.color = 'red';
         var contentString2 = that.state.venues[i].venue.id + that.state.venues[i].venue.name
         var tot = that.state.listedMarkers[i]
         tot.setAnimation(window.google.maps.Animation.BOUNCE);
                 setTimeout(function() {
                    tot.setAnimation(null);
                  }, 2000);
          // alert(i)
      // alert(that.state.venues[i].venue.name)
      // alert(that.state.venues[i].venue.location.address)
      // alert(that.state.venues[i].venue.id)
       // infowindowLS.open(that.map, that.state.venues[i].venue)
      //   let newlocation = {lat: that.state.venues[i].venue.location.lat, lng: that.state.venues[i].venue.location.lng}
      // let newMarkerCenter = new window.google.maps.LatLng(newlocation);
      //         that.map.setCenter(newMarkerCenter)

        }
      }

      let markerInd = that.state.listedMarkers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
      // alert(that.state.listedMarkers[markerInd])
      alert(e.target.innerText.toLowerCase())
        console.log("ven", that.state.venues)
         console.log("state", that.state)
         console.log("ls", that.state.listedMarkers)

      alert('clicked')
      // alert(e.target.innerText)
      // // e.target.style.color = 'red';
      // var x = e.target.innerText.toLowerCase()
      // alert(e.target.parentNode.nodeName)
      //  if (e.target && e.target.parentNode.nodeName === 'LI') {
      //   // displayInfo("info",e)
      //   // alert(that.state.listedMarkers.title," inf")
      //   // alert(this.markerInd," ind")
      // }

    })
  }
    // openMarker(marker = '') {
    //     const clientId = "YCMGPBOPZCPOG4QYVXZ4ETGY5TLVNO34BGYAZ1NNKA3T44KS\n";
    //     const clientSecret = "EKIC4ZUG3DJJGATRLZA2WO1W3X5L204BHM0XG2RE5IGP0GK5\n";
    //     const url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";


    //     if (this.state.info.marker != marker) {
    //         this.state.info.marker = marker;
    //         this.state.info.open(this.state.map, marker);
    //         marker.setAnimation(window.google.maps.Animation.DROP);


    //         this.state.info.addListener('closeClick', function () {
    //             this.state.info.setMarker(null);
    //         });

    //         this.markerInfo(url);
    //     }
    // }

    // markerInfo(url) {
    //     let self = this.state.info;
    //     let place;
    //     fetch(url)
    //         .then(function (resp) {
    //             if (resp.status !== 200) {
    //                 const err = "Can't load data.";
    //                 this.setState({info: err});
    //             }

    //             resp.json().then(function (data) {
    //                 var place = data.response.venues[0];
    //                 let phone = '';

    //                 if (place.contact.formattedPhone) {
    //                     phone = "<p><b>Phone:</b> "+ place.contact.formattedPhone +"</p>";
    //                 }

    //                 let twitter = '';

    //                 if (place.contact.twitter) {
    //                     twitter = "<p><b>Twitter:</b> "+ place.contact.twitter +"</p>";
    //                 }

    //                 var info =
    //                     "<div id='marker'>" +
    //                         "<h2>" + self.marker.title + "</h2>" +
    //                         phone +
    //                         twitter +
    //                         "<p><b>Address:</b> " + place.location.address + ", " + place.location.city + "</p>" +
    //                     "</div>";
    //                 self.setContent(info);
    //             });

    //             console.log(place);
    //         })
    //         .catch(function (err) {
    //             const error = "Can't load data.";
    //             self.setContent(error);
    //         });

    // }


    render() {
            var message = 'You selected ' + this.state.querySelector;

     console.log("cat", this.state.querySelector)
            // console.log("venues", this.state.venues)
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
                    <Search
                        infoWindow={this.state.info}
                        openInfo={this.info}
                        listedMarker={this.state.listedMarkers}
                        onChange = {this.updateQuery.bind(this)}
                    >

                    </Search>
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
