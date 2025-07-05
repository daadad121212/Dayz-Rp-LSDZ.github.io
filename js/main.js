document.addEventListener('DOMContentLoaded', () => {
    // --- Логика прелоадера с шкалой загрузки ---
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const loadingBarProgress = document.getElementById('loading-bar-progress');

    if (preloader && content && loadingBarProgress) {
        // Устанавливаем начальное состояние: прелоадер видим, контент скрыт через CSS класс
        // content.classList.add('hidden'); // Эта строка уже не нужна, т.к. класс добавлен в index.html
        preloader.style.display = 'flex'; // Показываем прелоадер (уже есть display: flex в CSS)

        const duration = 3000; // Общая продолжительность загрузки в миллисекундах (3 секунды)
        const intervalTime = 50; // Интервал обновления шкалы в миллисекундах
        let currentProgress = 0;
        const increment = (100 / (duration / intervalTime)); // На сколько увеличивать прогресс за каждый шаг

        const loadingInterval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress > 100) {
                currentProgress = 100;
            }
            loadingBarProgress.style.width = `${currentProgress}%`;

            if (currentProgress >= 100) {
                clearInterval(loadingInterval); // Останавливаем интервал
                // Начинаем скрывать прелоадер, используя переходы CSS
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';

                // Показываем основной контент после небольшой задержки,
                // чтобы анимация исчезновения прелоадера началась.
                // Затем добавляем класс 'visible' для плавного появления.
                setTimeout(() => {
                    content.classList.remove('hidden'); // Убираем класс, который скрывал контент
                    content.classList.add('visible'); // Добавляем класс, который делает контент видимым (с переходом)

                    // Удаляем прелоадер из DOM после завершения перехода контента
                    setTimeout(() => {
                        preloader.remove();
                    }, 1000); // Должно соответствовать длительности перехода `opacity` у #content в CSS
                }, 500); // Задержка в 0.5 секунды перед началом появления контента
            }
        }, intervalTime);
    }
    // --- КОНЕЦ Логика прелоадера ---

    // --- Функция для копирования текста в буфер обмена ---
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(() => {
            const ipAddressElement = document.getElementById('ip-address');
            if (ipAddressElement) {
                const originalText = ipAddressElement.textContent; // Сохраняем оригинальный текст
                ipAddressElement.textContent = 'Скопировано!';
                ipAddressElement.classList.add('copied');

                setTimeout(() => {
                    ipAddressElement.textContent = `Нажмите для копирования: ${text}`; // Восстанавливаем оригинальный текст
                    ipAddressElement.classList.remove('copied');
                }, 1500); // Сообщение "Скопировано!" исчезнет через 1.5 секунды
            }
            console.log('IP-адрес скопирован:', text);
        }).catch(err => {
            console.error('Не удалось скопировать IP-адрес: ', err);
            // Используем alert, так как navigator.clipboard может не работать в некоторых iframe-средах
            alert('Не удалось скопировать IP-адрес. Пожалуйста, скопируйте его вручную: ' + text);
        });
    };
    // --- КОНЕЦ Функции для копирования текста в буфер обмена ---
});