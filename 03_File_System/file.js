var fs = require('fs');

/*
// +++++++++++++++Operation1-> CREATE AND WRITE +++++++++++++
// create File in current Directory sync way =>
    fs.writeFileSync('./test.txt', 'Hii Harshit 1 times...')

// create File in current Directory async way =>
    fs.writeFile('./test.txt', 'Hii Harshit 1 times...', function (err) {
        if (err) throw err;
        console.log('File created!');
    });

// create File in current Directory async way with callback
    fs.writeFile('./test.txt', 'Hii Harshit 1 times...', (err) => {
        if (err) throw err;
        console.log('File created!');
    });
*/

/*
+++++++++++++++Operation2-> READ +++++++++++++
// Read data from test.txt file sync way =>
    const data = fs.readFileSync('./test.txt', 'utf-8')
    console.log(data);
    
// Read data from test.txt file in async way
    var fs = require('fs');
    fs.readFile('./test.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });

    // - Output => Hii Harshit 1 times...

// Read data from test.txt file in async way with callback
    var fs = require('fs');
    fs.readFile('./test.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
    // - Output => Hii Harshit 1 times...
*/

/*
// +++++++++++++++++++Operation3-> APPEND++++++++++++++++++
// Append the data in test.txt file in sync way
    fs.appendFileSync('./test.txt', '\nHello Harshit Second Time')

// Append the data in test.txt file in async way
    fs.appendFile('./test.txt', 'Hii Harshit 2 times...', (err) => {
        if (err) throw err;
        console.log('File appended!');
    });
    // - Output => File appended!

// Append the data in test.txt file in async way with callback
    fs.appendFile('./test.txt', 'Hii Harshit 2 times...', (err) => {
        if (err) throw err;
        console.log('File appended!');
    });
    // - Output => File appended! 
*/

// ++++++++++++++++++++++Operation4-> delete
    // fs.unlinkSync('./test.txt')





