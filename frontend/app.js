const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://backend:5000/submit', req.body);
        if (response.data.status === 'success') {
            res.redirect('/success');
        } else {
            res.send(`<p>${response.data.message}</p><a href="/">Back</a>`);
        }
    } catch (err) {
        res.send(`<p>Error submitting data: ${err.message}</p><a href="/">Back</a>`);
    }
});

app.get('/success', (req, res) => {
    res.send('<h1>Data submitted successfully</h1>');
});

app.listen(3000, () => console.log('Frontend running on port 3000'));
