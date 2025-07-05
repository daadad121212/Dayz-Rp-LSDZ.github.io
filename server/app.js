require('dotenv').config(); // Загружает переменные окружения из файла .env
const express = require('express');
const axios = require('axios'); // Сохраняем axios, так как он может быть полезен для других API
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Обслуживание статических файлов (фронтенд)
app.use(express.static(path.join(__dirname, '../public')));

// Закомментирован или удален маршрут к admin-panel.html, так как админ-панель убрана
// app.get('/admin-panel.html', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/admin-panel.html'));
// });

// Переменные окружения (можно оставить, если планируется использование GitHub API для других целей)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;

// Если вы больше не используете GitHub API совсем, эти проверки и роуты можно удалить.
// Для данного запроса, так как фронтенд не вызывает API, они просто не будут использоваться.
// if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
//     console.error('Ошибка: Переменные окружения GITHUB_TOKEN, GITHUB_OWNER или GITHUB_REPO не установлены. Проверьте файл .env');
//     // process.exit(1); // Можно не выходить, если API не критичны
// }

// Закомментирован или удален эндпоинт для загрузки файлов на GitHub, так как админ-панель убрана
// app.post('/api/github/upload-file', async (req, res) => {
//     const { path: filePath, content, message } = req.body;

//     if (!filePath || !content || !message) {
//         return res.status(400).json({ message: 'Отсутствуют необходимые данные: path, content или message.' });
//     }

//     const githubApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

//     try {
//         let sha = null;
//         try {
//             const getResponse = await axios.get(githubApiUrl, {
//                 headers: {
//                     'Authorization': `token ${GITHUB_TOKEN}`,
//                     'Accept': 'application/vnd.github.v3+json'
//                 }
//             });
//             sha = getResponse.data.sha;
//         } catch (error) {
//             if (error.response && error.response.status === 404) {
//                 // Файл не существует, это нормально, мы будем его создавать
//             } else {
//                 console.error('Ошибка при получении файла с GitHub:', error.response ? error.response.data : error.message);
//                 return res.status(500).json({ message: 'Ошибка при проверке существования файла на GitHub.', error: error.message });
//             }
//         }

//         const base64Content = Buffer.from(content).toString('base64');

//         const data = {
//             message: message,
//             content: base64Content,
//             sha: sha
//         };

//         const putResponse = await axios.put(githubApiUrl, data, {
//             headers: {
//                 'Authorization': `token ${GITHUB_TOKEN}`,
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/vnd.github.v3+json'
//             }
//         });

//         res.status(200).json({
//             message: 'Файл успешно загружен/обновлен на GitHub.',
//             commitUrl: putResponse.data.commit.html_url,
//             contentUrl: putResponse.data.content.html_url
//         });

//     } catch (error) {
//         console.error('Ошибка GitHub API:', error.response ? error.response.data : error.message);
//         res.status(500).json({
//             message: 'Произошла ошибка при связи с GitHub API.',
//             error: error.response ? error.response.data : error.message
//         });
//     }
// });

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Бэкенд сервер запущен на http://localhost:${PORT}`);
    console.log(`Основная страница: http://localhost:${PORT}`);
});