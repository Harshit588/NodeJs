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
   
// To stop the server in Terminal use ctrl+c