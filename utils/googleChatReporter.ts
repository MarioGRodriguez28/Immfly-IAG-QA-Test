import axios from 'axios';

// URL del webhook de Google Chat
const GOOGLE_CHAT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAAAveg_UJU/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=OQdcjGIaZLuwQJjkRcbDUvvG16DeWhSJeD9jEqDfz34';

export async function sendErrorToGoogleChat(testName: string, step: string, errorMessage: string) {
    const message = {
        text: `Playwright Test Error:\nTest: ${testName}\nStep: ${step}\nError: ${errorMessage}`,
    };

    try {
        await axios.post(GOOGLE_CHAT_WEBHOOK_URL, message);
        console.log('Error report sent to Google Chat');
    } catch (error) {
        console.error('Failed to send error report to Google Chat', error);
    }
}
