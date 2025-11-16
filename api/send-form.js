export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone } = req.body;

  const BOT_TOKEN = '8356341780:AAHjE_zVqQdC0oOr9oLShQqtWOmjVFMHSAM';
  const CHAT_ID = '477634260';
  
  const message = `🔔 *Новая заявка!*\n\n📝 Имя: ${name}\n📱 Телефон: ${phone}\n\n_Время: ${new Date().toLocaleString('ru-RU')}_`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: 'Заявка отправлена!' });
    } else {
      return res.status(500).json({ error: 'Ошибка отправки в Telegram' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}
