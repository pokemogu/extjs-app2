module.exports.getQuizes = async function (req, res) {
    const Quiz = require('../quiz');
    const quiz = new Quiz();
    const quizes = await quiz.getAllQuiz();
    if (quizes !== undefined)
        res.json(quizes);
    else
        res.status(500).json({ error: 'Quizes undefined.' });
}
