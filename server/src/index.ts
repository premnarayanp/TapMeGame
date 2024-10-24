import express, { Request, Response } from "express";
import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Initialize the Telegram bot
const bot = new TelegramBot(process.env.MY_BOT_TOKEN!, { polling: true });

const User = {
    telegramId: 1,
    username: "",
    chatId: 1,
};


// set action for Start command - /start
// Start command - /start
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    // Ensure msg.from is not undefined otherwise do not respond
    if (!msg.from) {
        await bot.sendMessage(chatId, 'Something went wrong. User information is missing.');
        return; // Exit if msg.from is undefined
    }

    const userId = msg.from.id;
    const userName = msg.from.username;

    try {

        if (!User) {
            // Send a message with a game link
            // await bot.sendMessage(chatId, `Welcome, ${userName}! Click the button below to start the game.`, {
            //     reply_markup: {
            //         inline_keyboard: [
            //             [
            //                 { text: 'Play Game', web_app: { url: 'https://premnarayanp.github.io/chat-app/' } }
            //             ]
            //         ]
            //     }
            // });
            const gameUrl = `https://premnarayanp.github.io/chat-app?username=${userName}&userId=${userId}`;
            await bot.sendMessage(chatId, `Welcome, ${userName}! Click the button below to start the game.`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Play Game', web_app: { url: gameUrl } }
                        ]
                    ]
                }
            });
        } else {
            // If user exists, send a welcome back message with the game link
            await bot.sendMessage(chatId, `Welcome back, ${userName}! Click the button below to continue playing.`, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Play Game', web_app: { url: 'https://premnarayanp.github.io/chat-app/' } }
                        ]
                    ]
                }
            });


        }
    } catch (err) {
        console.error(err);
        await bot.sendMessage(chatId, 'Something went wrong.');
    }
});


app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
