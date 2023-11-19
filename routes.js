const fs = require('fs');
var msg;

const reqHandler = (req, res) =>{
    const method = req.method;
    const url = req.url;

    if(url ==='/'){
        fs.readFile('message.txt',(err, data)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log(data);
            msg = data;
            

            res.write('<html>')
            res.write('<head>Enter Message</head>')
            res.write(`<body><p>${msg}</p><form action= "/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>`)
            res.write('</html>')
            return res.end();
        
        
        });
        
    }

    if(url === '/message' && method ==='POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);

        });
        return req.on( 'end', ()=>{
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1]
            fs.writeFile('message.txt', message , (err) =>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }

}
// module.exports = reqHandler;

// module.exports = {
//     handler: reqHandler,
//     someText: 'Hi Robin'
// };

module.exports.handler = reqHandler;
module.exports.someText = 'Hello World'

// exports.handler = reqHandler;
// exports.someText = 'Hello World'