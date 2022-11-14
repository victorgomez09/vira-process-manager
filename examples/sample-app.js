// sample-app.js
require('http').createServer((req, res) => {
    res.end(process.argv.join(' ')); // Reply with process arguments
}).listen(3334, (error) => {
    if (error) {
        throw error;
    }
    console.log("Process started, telling master we are ready...");
    process.send('ready');
});
