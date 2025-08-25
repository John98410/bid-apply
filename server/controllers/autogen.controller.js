// gpt.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const answer = (req, res) => {
    // const { prompt } = req.body;

    // openai.chat.completions.create({
    //     model: 'gpt-4',
    //     messages: [{ role: 'user', content: prompt }],
    // }).then((response) => {
    //     res.json({ answer: response.choices[0].message.content });
    // }).catch((error) => {
    //     res.status(500).json({ error: error.message });
    // });

    const input = req.body.input;;
    openai.responses.create({
        model: "gpt-5",
        input: input
    }).then((response) => {
        res.json({ answer: response.output_text });
    }).catch((error) => {
        res.status(500).json({ error: error.message });
    });
}


module.exports = {
    answer,
};