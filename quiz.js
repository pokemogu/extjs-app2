module.exports = class Quiz {
    constructor(amount) {
        if (Number.isInteger(amount) === false || amount < 0)
            throw new RangeError('amount should be unsigned interger.');

        const Axios = require('axios');
        this.axios = Axios.create({
            responseType: 'json',
            proxy: false
        });

        this.axios.get('https://opentdb.com/api.php?amount=' + amount)
            .then((response) => {
                if (response.ok === false)
                    throw new Error('Failed to fetch url ' + response.url);
                if (response.data['response_code'] === 0 && response.data['results'].length === amount)
                    this.quizes = response.data['results'];
                else
                    throw new Error('Invalid response from the Quiz server.');
            })
            .catch((error) => {
                throw error;
            });
    }

    getAllQuiz() {
        if (this.quizes !== undefined)
            return this.quizes;
        else
            return undefined;
    }
}