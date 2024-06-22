// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/Register', async (req, res) => {
  const { username, password, identity } = req.body;
  try {
    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户
    const newUser = new User({
      username,
      password: hashedPassword,
      identity
    });

    // 保存用户并返回
    await newUser.save();
    res.status(201).send('用户注册成功');
  } catch (error) {
    console.error(error);
    res.status(500).send('服务器错误');
  }
});

module.exports = router;
