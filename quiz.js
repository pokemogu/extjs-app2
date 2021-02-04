function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

module.exports = class Quiz {
    async getAllQuiz() {
        const amount = 10;

        const Axios = require('axios');
        this.axios = Axios.create({
            responseType: 'json',
            proxy: false
        });

        const response = await this.axios.get('https://opentdb.com/api.php?amount=' + amount)
        if (response) {
            if (response.data.response_code === 0 && response.data.results.length === amount) {
                this.quizes = response.data.results;
                return shuffleArray(this.quizes);
            }
            else
                throw new Error('Invalid response from the Quiz server.');
        }
    }
}