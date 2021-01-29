// *****************************************
// アプリケーション初期化
// *****************************************

// コントローラー、ミドルウェア
const controller_dashboard = require('./controllers/dashboard');
const controller_quiz = require('./controllers/quiz');

// ExpressJS初期化
const express = require('express');
const Quiz = require('./quiz');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.locals.quiz = new Quiz(10);

// アプリケーション設定
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// *****************************************
// ルーティング
// *****************************************

// ダッシュボード
app.get('/dashboard', controller_dashboard.dashboardForm);

// クイズ取得
app.get('/quizes', controller_quiz.getQuizes);

// ルート
app.get('/',
  controller_dashboard.dashboardRedirect
);

// *****************************************
// サーバー開始
// *****************************************
app.listen(port, () => {
  console.log('Server started');
});
