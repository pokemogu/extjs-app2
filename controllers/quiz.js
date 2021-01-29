module.exports.getQuizes = function (req, res) {
    const quizes = req.app.locals.quiz.getAllQuiz();
    if (quizes !== undefined)
        res.json(quizes);
    else
        res.status(500).json({ error: 'Quizes undefined.' });
}
