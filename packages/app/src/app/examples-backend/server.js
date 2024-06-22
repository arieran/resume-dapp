// server.js
const express = require('express');
const mysql = require('mysql2/promise'); // 引入mysql2库的promise版本
const fileUpload = require('express-fileupload');
const app = express();
app.use(express.json());
const crypto = require('crypto');

// MySQL数据库配置
const dbConfig = {
  host: 'localhost',
  user: 'myuser', // 你的MySQL用户名
  password: 'mypassword', // 你的MySQL密码
  database: 'mydatabase' // 你的数据库名
};

// 异步函数来初始化数据库连接
async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('MySQL 连接成功');
    return connection;
  } catch (err) {
    console.error('MySQL 连接失败:', err);
    process.exit(1); // 在数据库连接失败时退出应用
  }
}

const dbConnection = initializeDatabase();


app.use(fileUpload());

app.post('/api/upload', (req, res) => {
    const resumeFile = req.files.resume;
    const hash = crypto.createHash('sha256').update(resumeFile.data).digest('hex');

    // 这里调用区块链API检查哈希
    const blockchainResponse = checkBlockchainForHash(hash);
    if (blockchainResponse.isValid) {
        res.send({ message: '检验成功，简历有效' });
    } else {
        res.send({ message: '检验失败，简历有误' });
    }
});
function generateHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function checkBlockchainForHash(hash) {
  // 假设的区块链调用逻辑
  return { isValid: true }; // 模拟结果
}


// 引入路由
const userRoutes = require('./route/userRoutes.js');

// 路由中间件，传递数据库连接
app.use('/api', (req, res, next) => {
  req.db = dbConnection;
  next();
}, userRoutes);

app.post('/examples/Register', (req, res) => {
  const { username, password, identity } = req.body;

  // 检查输入
  if (!username || !password || !identity) {
    return res.status(400).json({ message: '缺少必要信息' });
  }

  // 注册逻辑（如存储到数据库）
  // 假设注册成功
  res.status(200).json({ message: '注册成功' });

  // 如果失败
  // res.status(500).json({ message: '服务器错误，请稍后再试' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`));
