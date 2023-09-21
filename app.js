const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'info_db'
});

// ルートパス
app.get('/', (req, res) => {
    res.render('index', { error: null });
});

app.use(express.static('assets'));

// アンケートの送信
app.post('/submit', (req, res) => {
    const { name, kana, gender, email, address, phone, source, inquiry } = req.body;

    let errorMessage = '';

    if (!/^[一-龯ぁ-んァ-ヶa-zA-Z]*$/.test(name)) {
        errorMessage = '名前は漢字、ひらがな、英字のみ許可されています。';
    }

    if (!/^[ぁ-ん]+$/.test(kana)) {
        errorMessage = 'かなはひらがなのみ許可されています。';
    }

    if (!gender) {
        errorMessage = '性別は必須項目です。';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage = '正しいメールアドレス形式で入力してください。';
    }

    if (!/^[一-龯ぁ-んァ-ヶ0-9]*$/.test(address)) {
        errorMessage = 'お住まいの住所は漢字、ひらがな、数字のみ許可されています。';
    }

    if (!/^\d+$/.test(phone) || phone.includes('-')) {
        errorMessage = '電話番号はハイフンを含まずに数字のみ許可されています。';
    }

  if (errorMessage) {
        res.render('index', { error: errorMessage }); // エラーがある場合、エラーメッセージを表示
    } else {
        // データベースに情報を保存するコードを追加
        const sql = 'INSERT INTO worksheet (name, kana, gender, email, address, phone, source, inquiry) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        con.query(sql, [name, kana, gender, email, address, phone, source, inquiry], (err, result) => {
            if (err) {
                console.error('データベースエラー:', err);
                res.render('index', { error: 'データベースエラーが発生しました。' }); // データベースエラーの場合、エラーメッセージを表示
            } else {
                res.redirect('/thankyou'); // 正常に保存された場合、thankyouページにリダイレクト
            }
        });
    }
});

// 送信完了ページ
app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
