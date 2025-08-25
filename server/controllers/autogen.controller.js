// gpt.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const answer = (req, res) => {

    const { jobTitle,
        jobDescription,
        note
    } = req.body;

    const sentence1 = `I want to apply for the job titled "${jobTitle}".
    The job description is as follows: ${jobDescription}
    Here is a note about me that might be useful: ${note}`;

    console.log(sentence1)
    openai.responses.create({
        model: "gpt-5",
        input: sentence1
    }).then((response) => {
        console.log(response);
        res.json({ answer: response.output_text });
        
    }).catch((error) => {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: error.message });
    });
}


module.exports = {
    answer,
};