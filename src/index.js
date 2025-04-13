require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const quotesData = require("./quotes.json");

// Create the client with required intents
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Ready Event
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Message Handler
client.on("messageCreate", (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  const content = message.content.toLowerCase().trim();

  // Command: hello
  if (content === "hello") {
    return message.reply("hi from bot");
  }

  // Command: inspire me
  if (content === "inspire me") {
    const quotesArray = quotesData.quotes;
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    const randomQuote = quotesArray[randomIndex];

    if (randomQuote && randomQuote.quote.trim()) {
      return message.reply(`"${randomQuote.quote}" - ${randomQuote.author}`);
    } else {
      return message.reply("Sorry, couldn't find a quote right now.");
    }
  }

  // Command: what time
  if (content === "what time") {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const meridian = hours < 12 ? "AM" : "PM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return message.reply(`The time is ${hours}:${minutes}:${seconds} ${meridian}`);
  }
});

// Login to Discord
client.login(process.env.TOKEN);
