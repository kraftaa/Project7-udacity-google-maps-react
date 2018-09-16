## Project 7 Neighborhood Map React App

## Table of Contents

* [Motivation](#motivation)
* [Description](#description)
* [Tools](#tools)
* [Files](#files)
* [Installation](#installation)
* [Result](#result)
* [Instructions](#instructions)
* [Contributing](#contributing)


## Motivation

This project is the seven and the last project of Front End Developer Nanodegree.
This is a project which build with React.
The scholars provided with the mock example of the page and the requirements.
Scholars need to create working React app from scratch.

## Description

This is an application which allows user to see food venues near the location (in this case - Sydney, AU as location was taken from the example from google maps API docs:
This project allows user to see the list (30) of the venues and to see them on the map.
If user clicks either on the listed item or on the marker then marker bounce and infowindow with venue's name and the address.

## Tools

This project has been done with:

 [HTML](https://developer.mozilla.org/en-US/docs/Glossary/HTML),
 [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript),
 [CSS](https://developer.mozilla.org/en-US/docs/Glossary/CSS),
 [ServiceWorkers] (https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API),
 [React in DevTools] (https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en),
 [Create React App] (https://github.com/facebook/create-react-app)
 [React] (https://github.com/facebook/create-react-app)
 [Foursquare] (https://developer.foursquare.com/docs/api/)
 [Google Maps API] (https://developers.google.com/maps)
## Files

```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── package.lock # npm
├── node_modules # npm
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
    ├── manifest.json # React
│   └── index.html #
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of your app. .
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── images
    │   └── coffee.png
    ├── components
    │   ├── Map.js
    │   └── Search.js
    ├── index.css # Global styles. You probably won't need to change anything here.
    ├── index.js # You should not need to modify this file. It is used for DOM rendering only.
    └──logo.png # React logo
```

## Installation

To install all dependencies use "npm install".
To start a server use "npm start"


## Result

As a resulf of we have a working React application with Google Maps amd Foursquare.


## Instructions

In order to use this app you need to start a server ("npm start"), it would bring you to the main page.
You can see the list of the food venues on the left side.
If you click on any book, then the appropriate marker would bounce and the name of the venue became red for 1/5sec.
If you click on the marker then marker would bounce for 1.5 sec and you can see the address and the venue name.
You can use search to search for the venue.
If you click on the hamburger menu icon then the side bar collapses and the map takes the whole 100% of the designated area.


