# Neighborhood Map Project

## Overview
This web app shows different tourist places to visit in Dublin, Ireland.  I am using the Google Maps API to show the different locations on a map and I am using the Wikipedia API to show some information about each location.  There is a sidebar menu that shows the locations and includes a filtering functionality for the locations.

## Install instructions
  - If in development environment
    - Once you are in the project directory, enter `npm install` to install the project dependencies.
    - After the installation is complete, enter `npm start` to start the development server.
- If in Prod environment
    - In the project directory, enter `npm install`.
    - After the installation, enter `npm run build`.  This will start building the files for use in a prod environment.
    - Enter `npm install -g serve`.
    - Enter `serve -s build`.  This will allow the service worker to work.

## API's used
 - Google Maps (https://developers.google.com/maps/documentation/javascript/tutorial)
 - Wikipedia (https://www.mediawiki.org/wiki/API:Main_page)
 
## Other packages
 - escape-string-regexp 