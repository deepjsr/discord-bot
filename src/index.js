require("dotenv").config();
const Quote = require("./quotes.json");
const { Client, IntentsBitField, quote } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
 

// Access the quotes array
const quotesArray = Quote.quotes;

let time = new Date();
client.on("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  console.log(`User:${message.author.username} wrote ${message.content}`);

  if (message.author.bot) return;
  if (message.content === "hello") {
    message.reply({
      content: "hi from bot",
    });
  }

  // Inspire from quote

  if (message.content === "inspire me") {
    // Accessing each quotes
    let randomQuotesIndex = [Math.floor(Math.random() * quotesArray.length)];
    let randomQuote= quotesArray[randomQuotesIndex];
    if (randomQuote.quote.trim()) {
      // Print the random quote
      message.reply(`"${randomQuote.quote}" - ${randomQuote.author}`);
    } else {
      console.log("Error: Empty quote content.");
    }
    // message.reply(quotesArray[randomQuotesIndex]);
  }



  // What time
  // Getting time component
  let hours = time.getHours();  
  const minutes = time.getMinutes();
  const second = time.getSeconds();

  // Determing 'A.M.' or 'P.M.'
  const meridian = hours <= 12 ? "AM" : "PM";
  // converting to 12 hr format
  hours = hours % 21 || 12;

  if (message.content === "what time") {
    message.reply(
      // `The time is(hh:mm:ss) --> ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
      `The time is  ${hours}:${minutes}:${second} ${meridian}`
    );
  }
});

client.login(process.env.TOKEN);
