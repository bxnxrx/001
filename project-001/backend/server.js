const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.get('/', (req, res) => {
    res.send('✅ ChatGPT backend is running!');
});

app.post('/chat', async (req, res) => {
    const { message, mode } = req.body;

    if (!message || !mode) {
        return res.status(400).json({ error: 'Message and mode are required.' });
    }

    const systemPrompt = mode === 'Akka'
        ? 'You are Akka: a caring, sassy big sister from Sri Lanka. Speak warmly with some Sinhala. Be a little cheeky, but helpful.'
        : 'You are Ayya: a laid-back, funny big brother from Sri Lanka. Use relaxed language, Sinhala slang, and a buddy tone.';

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message },
            ],
        });

        const reply = completion.choices[0].message.content.trim();
        res.json({ reply });
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to get response from OpenAI API.' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
