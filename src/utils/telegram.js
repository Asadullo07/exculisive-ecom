const BOT_TOKEN = '8991898824:AAGOadUir4wGXgTBSf4hRSiF__jAn4ydZkQ';
const ADMIN_ID = '7850548934';

export const sendTelegramMessage = async (text) => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: ADMIN_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
    return await response.json();
  } catch (error) {
    return null;
  }
};
