// Import necessary modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

// Initialize express
const app = express();

// Middleware for parsing JSON bodies and URL encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for Cross-origin resource sharing
app.use(cors());

// Route for creating briefs
app.post('/createBrief', async (req, res) => {
    const { product, targetAudience, advertisingChannel } = req.body;

    // Ensure all necessary data is provided
    if (!product || !targetAudience || !advertisingChannel) {
        return res.status(400).json({ error: 'Missing necessary data for brief creation.' });
    }

    // Define the prompt for the GPT-3 model
    const prompt = `Create an advertising brief for a ${product} targeting ${targetAudience} on ${advertisingChannel}.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt,
            max_tokens: 200,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Respond with the generated text
        res.json({ brief: response.data.choices[0].text.trim() });
    } catch (error) {
        // Respond with error information
        res.status(500).json({ error: error.toString() });
    }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

