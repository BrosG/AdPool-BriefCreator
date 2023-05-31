// briefRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
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

module.exports = router;
