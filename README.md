# PickUpGame
https://serene-falls-78526.herokuapp.com/

## Description:
A site to help connect locals for pick up games around the area.

## Main Features:
Check out posted events on the google map
Vistors may signup 
Log in/ Log out

### Registered users may:
RSVP a spot for an event
Cancel their RSVP for an event
Create/Post new events
Delete events that they created
A User Dashboard "My Events" where a user can view events they have created and events they plain to attend.

## Tools
#### React Router with React-router-dom module
* A React routing library
* Used to setup different pages for Home, My Events, Sign Up, and Log in
#### Axios
* Promise base HTTP client for the browser and node.js
* Make http request to the backend and APIs
#### Google-maps-react
* A declarative Google Map React component that uses Google Maps API
* Use as a feature of the project
#### Google GeoCode API
* A service that provides geocoding and reverse geocoding of addresses
* Google Map API uses geographic coordinates to place markers on the map. 
* Google GeoCode API helps convert a location into a geograpic coordinates.  
* When the user create a new event, user must specify location of city and state.  Once that infomation is given, it pass to Google GeoCode API using a GET request and the API returns geographic coordinates that best matches the provided location.

#### React-date-picker
* A simple date picker component for React
* A feature provided in 'Create Event'


## Backend using Java, Spring(Boot, MVC, Security), and H2 database
https://github.com/cwalke3408/PickUp_JavaBackEnd

## Deployed to the cloud using Heroku
