const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.get(/(xyz)$/, (req, res) => {
    res.send("That's all I wrote.")
})

// /capital-letters/little
app.get(/^(\/capital-letters\/)/, (req, res) => {
    let str = req.path.slice(17);
    res.send(`${str.toUpperCase()}`);
});

const routeArr = [/(\/bio)$/, /(\/contact)$/]

app.get(routeArr, (req, res) => {
    if (routeArr[0].test(req.path)) {
        return res.send("Bio");
    } else if (routeArr[1].test(req.path)) {
        return res.send("Contact");
    }
});

app.get('/about/foo', (req, res) => {
    res.status(404);
    res.done();
})

app.all('*', (req, res) => {
    let randomNum = Math.floor(Math.random() * Math.floor(50));

    const pageData = {
        method: `${req.method}`,
        path: `${req.path}`,
        randomNum: randomNum
    };
    res.render('index', pageData);
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port: ${port}.......`));
