/* 
  App.js
  React component for the overall app / parent component display of the Neighborhood Map App
  Author: Steve Prager
*/

import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import './css/App.css';
import Map from './components/Map'
import Title from './components/Title'
import ListView from './components/ListView'
import Footer from './components/Footer'

class App extends Component {

  /* 
     State contains all of the app's data and passes it down to child components as needed
     Here, that's ALL the locations in our neighborhood (Bethlehem, PA) as well as any locations
     currently visible within the app (updated via filter functions).
  */
  state = {
    allLocations: [
                   {
                     title: "Banana Factory",
                     lat: 40.6124,
                     lng: -75.3795,
                     foursquareID: "4aea925ef964a520e6bb21e3",
                     foursquareInfo : {}
                   },
                   {
                     title: "Bethlehem Brew Works",
                     lat: 40.6220,
                     lng: -75.3822,
                     foursquareID: "4ac25dc5f964a520d89820e3",
                     foursquareInfo : {}
                   }, 
                   {
                     title: "Bethlehem Skate Plaza",
                     lat: 40.6124,
                     lng: -75.3554,
                     foursquareID: "4c40b95d3735be9a514e17a4",
                     foursquareInfo : {}
                   },
                   {
                     title: "Billy's Downtown Diner",
                     lat: 40.6221,
                     lng: -75.3781,
                     foursquareID: "53e4d8de498e6a14dbfed43b",
                     foursquareInfo : {}
                   },
                   {
                     title: "Lehigh University",
                     lat: 40.6069,
                     lng: -75.3783,
                     foursquareID: "4abe5688f964a520d38c20e3",
                     foursquareInfo : {}
                   },
                   {
                     title: "Moravian Book Shop",
                     lat: 40.6195,
                     lng: -75.3818,
                     foursquareID: "4b11abfff964a520eb8123e3",
                     foursquareInfo : {}
                   },
                   {
                     title: "Musikfest Cafe",
                     lat: 40.6140,
                     lng: -75.3676,
                     foursquareID: "4cd1c7213e63721e469ba5cc",
                     foursquareInfo : {}
                   },
                   {
                     title: "National Museum of Industrial History",
                     lat: 40.6128,
                     lng: -75.3706,
                     foursquareID: "4e35c34e1850ad8463dc038c",
                     foursquareInfo : {}
                   },
                   { 
                     title: "Sands Casino",
                     lat: 40.6150,
                     lng: -75.3581,
                     foursquareID: "4aeb461ff964a5206fc021e3",
                     foursquareInfo : {}
                   },
                   {
                     title: "SteelStacks",
                     lat: 40.6153,
                     lng: -75.3682,
                     foursquareID: "542856ba498e85a2c0dbf449",
                     foursquareInfo : {}
                   }
                  ],
    visibleLocations: []
  }

  /* 
     Filter locations that are currently visible based on a 'match' variable 
     (this could be either a clicked button name or a searched query string).
     Note this affects both the map (markers) and the list view components
  */
  updateVisibleLocations = (match) => {
    let filteredLocations
    const { allLocations } = this.state
    if (match) {
        const queryExp = new RegExp(escapeRegExp(match), 'i')
        filteredLocations = allLocations.filter((location) => queryExp.test(location.title))
    } 
    else {
      filteredLocations = allLocations
    }
    this.setState({visibleLocations: filteredLocations})
  }

  componentWillMount() {
    // Before we mount app component for the first time, set visible locations to be all locations
    this.setState({visibleLocations: this.state.allLocations})
  }
  
  // Shift the list view out or in. Used by the view toggle button on 
  // mobile screens to adjust the display
  shiftView = () => {
    const listViewSection = document.getElementById('list-view-section')
    const listViewToggle = document.getElementById('list-view-toggle')

    const mapSection = document.getElementById('map-section')
    const mapContainer = document.getElementById('map-container')

    listViewToggle.classList.toggle('hide')
    listViewSection.classList.toggle('open')
    mapSection.classList.toggle('shift')
    mapContainer.classList.toggle('full')
  }

  render() {
    return (
      <div className="App">
        <div id="title-section" className="row section">
          <Title/>
        </div>
        <div id="content-section">
          <div id="list-view-section" aria-label="location search" className="column section">
            <ListView locations={this.state.visibleLocations}
                      onFilter={this.updateVisibleLocations}
                      onClose={this.shiftView}/>
          </div>
          <div id="map-section" aria-label="location map" className="column section">
            <Map locations={this.state.visibleLocations}
                 toggleView={this.shiftView}/>
          </div>
        </div>
        <div id="footer-section">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
