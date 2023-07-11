const http = require('http');
const url = require('url');
const express = require('express');

http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });

    if (request.url === '/about') {
        response.write('<h1>This is the about endpoint</h1>');
    } else if (request.url === '/contact') {
        response.write('<h1>This is the contact endpoint</h1>');
    } else {
        let q = url.parse(request.url, true).query;
        let txt = q.year + " " + q.month;
        response.end(txt);
    }

}).listen(8080, () => {
    console.log('Server is running...');
});
