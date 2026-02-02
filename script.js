const BOT_TOKEN = "8024983218:AAEOib7wTWosOWoB-shxkYmV_4iZMdvE3sk";
const CHAT_ID = "1044406442";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tg-form');
    const status = document.getElementById('status');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            let text = `<b>💎 Новая заявка | IDM Metal</b>\n\n`;
            text += `<b>Клиент:</b> ${name}\n`;
            text += `<b>Телефон:</b> ${phone}\n`;
            text += `<b>Задача:</b> ${message || 'Не указана'}`;

            status.innerText = "Отправка...";
            status.style.color = "#fff";

            try {
                const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        parse_mode: 'html',
                        text: text
                    })
                });

                if (response.ok) {
                    status.innerText = "✅ Заявка отправлена! Мы свяжемся с вами.";
                    status.style.color = "#4BB543";
                    form.reset();
                } else {
                    throw new Error();
                }
            } catch (error) {
                status.innerText = "❌ Ошибка. Попробуйте еще раз.";
                status.style.color = "#ff4444";
            }
        });
    }
});