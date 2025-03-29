const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { title: 'Strona główna', message: 'Witaj świecie!' });
});

app.get("/gallery", (req, res) => {
    res.render("gallery", { title: "Galeria" });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Kontakt' });
});

app.get("/guestbook", (req, res) => {
    res.render("guestbook", { title: "Księga Gości", entries: guestbookEntries });
});

app.get("/offer", (req, res) => {
    res.render("offer", { title: "Oferta" });
});

let guestbookEntries = [];
app.post("/guestbook", (req, res) => {
    const { name, message } = req.body;
    if (name && message) {
        guestbookEntries.push({ name, message, date: new Date().toLocaleString() });
    }
    res.redirect("/guestbook");
});

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Nie znaleziono' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { title: 'Błąd serwera' });
});


app.post('/submit-form', (req, res) => {
    console.log(req.body);
    res.send('Formularz został wysłany!');
});

app.listen(port, () => {
    console.log(`Aplikacja nasłuchuje na porcie ${port}`);
});

// module.exports.handler = serverless(app);