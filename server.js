const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle search requests
app.post('/search', async (req, res) => {
    const { searchContent, filter } = req.body;
    const apiUrl = "https://api.trieve.ai/api/chunk/search";
    const headers = {
        "Content-Type": "application/json",
        "TR-Organization": "290c4e97-2332-4376-a254-5b063abfcb5f",
        "TR-Dataset": "bfd9f0a5-335b-4501-9cb2-3ea3c23de3c5",
        "Authorization": "tr-E4XukxDqBIb5XcWjHMlTBIaLNnCAqAnN",
    };

    const requestBody = {
        query: searchContent,
        search_type: filter,
    };

    try {
        // Dynamically import node-fetch
        const fetch = (await import('node-fetch')).default;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
