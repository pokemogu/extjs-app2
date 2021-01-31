const retryInterval = 200;
const retryCount = 30 * 1000 / retryInterval;
let quizes;
let intervalID;
let correctNumber = 0;

function clearAllChildElements(element) {
    while (element.childElementCount > 0) {
        element.removeChild(element.lastChild);
    }
}
function htmlDecode(input) {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

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

function showQuiz(quizNo) {
    if (!quizes)
        return;

    if (quizNo > (quizes.length - 1)) {
        clearAllChildElements(document.getElementById('answer_area'));
        document.getElementById('quiz_title').innerText = 'あなたの正答数は' + correctNumber + 'です！！';
        document.getElementById('quiz_category').innerText = '';
        document.getElementById('quiz_difficulty').innerText = '';
        document.getElementById('quiz_description').innerText = '再度チャレンジしたい場合は以下をクリック！！';
        document.getElementById('form_button_main').value = 'ホームに戻る';
        document.getElementById('form_button_main').style.display = 'block'; // ボタンを表示する
        return;
    }

    clearAllChildElements(document.getElementById('answer_area'));

    document.getElementById('quiz_title').innerText = '問題' + (quizNo + 1);
    document.getElementById('quiz_category').innerText = '[ジャンル] ' + htmlDecode(quizes[quizNo].category);
    document.getElementById('quiz_difficulty').innerText = '[難易度] ' + htmlDecode(quizes[quizNo].difficulty);
    document.getElementById('quiz_description').innerText = htmlDecode(quizes[quizNo].question);

    let answerButtons = new Array();

    const correctButton = document.createElement('input');
    correctButton.type = 'button';
    correctButton.value = htmlDecode(quizes[quizNo].correct_answer);
    correctButton.correct = true;
    correctButton.addEventListener('click', () => {
        correctNumber++;
        showQuiz(quizNo + 1);
    });
    answerButtons.push(correctButton);

    quizes[quizNo]['incorrect_answers'].forEach(incorrectAnswer => {
        const incorrectButton = document.createElement('input');
        incorrectButton.type = 'button';
        incorrectButton.value = htmlDecode(incorrectAnswer);
        incorrectButton.correct = false;
        incorrectButton.addEventListener('click', () => {
            showQuiz(quizNo + 1);
        });
        answerButtons.push(incorrectButton);
    });

    answerButtons = shuffleArray(answerButtons);
    answerButtons.forEach((answerButton) => {
        document.getElementById('answer_area').appendChild(answerButton);
    });
}

function fetchQuizes() {
    fetch('/quizes')
        .then((response) => {
            if (!response.ok)
                throw new Error('クイズ取得の際にアクセスエラーが発生しました。');
            return response.json();
        })
        .then((json) => {
            if (!json) {
                if (retryCount > 0) {
                    retryCount -= 1;
                    return;
                }
                else
                    throw new Error('クイズ取得データにエラーがありました。');
            }
            if (json.length < 1) {
                if (retryCount > 0) {
                    retryCount -= 1;
                    return;
                }
                else
                    throw new Error('クイズが1つも取得できませんでした。');
            }
            quizes = json;
            window.clearInterval(intervalID);
            showQuiz(0);
        })
        .catch((error) => {
            alert(error);
        });
}

function onClickMain() {
    correctNumber = 0;
    quizes = undefined;
    document.getElementById('form_button_main').style.display = 'none'; // ボタンを消す
    document.getElementById('quiz_title').innerText = '取得中';
    document.getElementById('quiz_description').innerText = '少々お待ち下さい';
    fetchQuizes();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('form_button_main').addEventListener('click', onClickMain);
}, { once: true });