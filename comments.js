// create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create web server
http.createServer(function(request, response){
    // get the request url and parse it
    var path = url.parse(request.url).pathname;
    console.log("path: " + path);

    // if the request is for the root directory
    if(path == "/"){
        // read index.html
        fs.readFile(__dirname + "/index.html", function(err, data){
            if(err){
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("File not found");
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data, "utf8");
            }
            response.end();
        });
    } else if(path == "/comments"){
        if(request.method == "POST"){
            // read the request data
            var requestBody = '';
            request.on('data', function(data){
                requestBody += data;
            });

            // when the request has ended
            request.on('end', function(){
                var formData = qs.parse(requestBody);
                console.log("formData: " + formData);
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("<h1>Comment received</h1>");
                response.write("<p>Comment: " + formData["comment"] + "</p>");
                response.end();
            });
        }
    } else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("Page not found");
        response.end();
    }
}).listen(8080);

console.log("Server running at http://localhost:8080/");

// open http://localhost:8080/ in your web browser
// enter a comment in the form and hit submit
// you should see the comment displayed on the page
// check the console for the form data
// you should see the form data logged to the console
// the form data is the comment that was entered into the form

// to run this file, open a terminal and type
// node comments.js
// open a web browser and go to http://localhost:8080/
// enter a comment in the form and hit submit
// you should see the comment displayed on the page
// check the console for the form data
// you should see the form data logged to