const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Hàm kiểm tra tài khoản đăng nhập
function checkLogin(username, password, callback) {
    fs.readFile('user.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const users = data.split('\n');
        for (let user of users) {
            const [savedUsername, savedPassword] = user.trim().split(':');
            if (savedUsername === username && savedPassword === password) {
                return callback(true, savedUsername);
            }
        }
        return callback(false);
    });
}

// Route xử lý form login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    checkLogin(username, password, (isValid, user) => {
        if (isValid) {
            res.status(200).json({ success: true, username: user });
        } else {
            res.status(401).json({ success: false, message: 'Đăng nhập không thành công. Username hoặc password không đúng.' });
        }
    });
});


// Route mặc định trả về trang login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Chạy server trên port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});