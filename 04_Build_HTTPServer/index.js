// To stop the server in Terminal use ctrl+c
/*
const http = require('http'); // Import http module
const file = require('fs'); // Import fs module

const myServer = http.createServer((request, response) => {
    const log = `\nRequest at :: ${Date.now().toLocaleString()} Request for :: ${request.url}` // log the request
    file.appendFile('logs.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err); // Handle error
        }
    })
    switch (request.url) {
        case '/': response.end('Hello From Home Page'); break; // Home page
        case '/about': response.end('I am Harshit Soni'); break;// About page
        case '/project': response.end('Project Sections...'); break;// Project page
        default: response.end('Hello From Home Page');// Default page
    }
});
myServer.listen(7777, () => console.log("Server Started")) // Start the server on port 7777 and listen for incoming requests

*/
const http = require('http'); // Import http module
const file = require('fs'); // Import fs module
const { URL } = require('url'); // Import URL class

const myServer = http.createServer((request, response) => {
    if (request.url === '/favicon.ico') {
        response.end();
        return; // Exit the function to prevent further execution
    }

    const myUrl = new URL(request.url, `http://${request.headers.host}`); // Parse the URL
    const userName = myUrl.searchParams.get('myname'); // Get the 'myname' query parameter

    const log = `\nRequest at :: ${new Date().toLocaleString()} Request for :: ${request.url} And Method :: ${request.method}`; // Log the request
    file.appendFile('logs.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file:', err); // Handle error
        }
    });

    switch (myUrl.pathname) {
        case '/':
            response.end(`Hello ${userName || 'Guest'} From Home Page`); // Default to 'Guest' if no name is provided
            break; // Home page
        case '/about':
            response.end('I am Harshit Soni');
            break; // About page
        case '/project':
            response.end('Project Sections...');
            break; // Project page
        default:
            response.end('Hello From Home Page'); // Default page
    }
});

myServer.listen(7000, () => console.log("Server Started")); // Start the server on port 7000
