// *****************************************
// アプリケーション初期化
// *****************************************

// コントローラー、ミドルウェア
const controller_dashboard = require('./controllers/dashboard');
const controller_quiz = require('./controllers/quiz');

// ExpressJS初期化
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

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

// 静的ファイル
app.use(express.static('public'));

// *****************************************
// サーバー開始
// *****************************************
app.listen(port, () => {
  console.log('Server started');
});
