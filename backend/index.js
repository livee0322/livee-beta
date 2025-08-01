const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    'https://livee0322.github.io', // 기존 io 버전
    'https://livee0322.github.io/livee-beta', // ✅ 새 beta 도메인
  ],
  credentials: true,
}));
app.use(bodyParser.json());

// 회원가입 라우트
app.post('/api/users/signup', (req, res) => {
  const { name, email, password } = req.body;
  console.log('📥 회원가입 요청:', { name, email, password });

  // 임시 저장 로직 (DB 미사용 시)
  res.status(200).json({ message: '회원가입 성공!' });
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
