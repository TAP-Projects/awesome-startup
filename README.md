# Awesome Startup

NOTE: This project is the 5th of 10 projects in Treehouse's Full Stack JavaScript program.

## What this is

Deployed here: https://julianjohannesen.github.io/p5-public-api-request/

Awesome Startup is a demonstration of how to request data from a public API using the Fetch API. In this case, the public API is RandomUser.me. 

The page displays an employee directory at a fictitious startup called "Awesome Startup." Each employee card displays abbreviated contact information. Clicking on an employee card will reveal a modal with more detailed information.

From the modal, users can click on the 'x' in the upper right corner to close the modal or click on "prev" or "next" to go to the previous or next employee. Once the user reaches the end of the list, clicking "next" will wrap around and show the first employee on the list. Clicking "prev" when one the first employee's will show the last employee on the list.

Users can also search for an employee, from among the displayed employees. As the user types, the list of displayed employees will update to show only matching employees. If no employee matches the search query, an error message will appear. 

## Running the App Locally

Previously, I wrote this app using modules. However, using modules can cause all sorts of CORS and MIME type errors if a developer attempts to open the app from their file system, rather than opening it from a local server. Consequently, I've created an app-no-modules.js file containing the full script. However, if you'd like to see what the app looked like using modules, please feel free to check out the 'archive' folder.

## Issues

Please report any issues here: https://github.com/julianjohannesen/p5-public-api-request/issues
