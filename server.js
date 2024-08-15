// JavaScript source code
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 2345;

const dataStorage = [];

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// Validation endpoint
app.post('/validate', (req, res) => {
    const { username, email, phone } = req.body;
    const errors = {};

    const storedRecord = dataStorage.find(entry => 
        entry.username == username ||
        entry.email == email ||
        entry.phone == phone
    );

    
    if (storedRecord) {
        if (storedRecord.username == username) {
            errors.username = 'Username already exists.';
        }
        if (storedRecord.email == email) {
            errors.email = 'Email already exists.'
        }
        if (storedRecord.phone == phone) {
            errors.phone = 'Phone number already exists.'
        }
    } else {
        // Basic validation
        if (!username) {
            errors.username = 'Username is required.';
        }
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }
        if (!phone) {
            errors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Please enter a valid phone number.';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    dataStorage.push({ username, email, phone });
    console.log('Stored data: ', dataStorage);

    // If no errors
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
