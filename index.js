import axios from "axios";
import { Telegraf } from "telegraf";

// telegram-bot-api-token
const TOKEN = "5802453106:AAE5Nz1Ey-uKBTs4nRLJhC6XRqdz65qXcN4";

const Url ='http://api.weatherstack.com/current?access_key=cc2ed78cc4cd636fdd6fc804d455ea47&query="';

// making api call to weather api
const fetchData = async (cityName) => {
  const res = await axios.get(`${Url + cityName}`);
  return res;
};

const bot = new Telegraf(TOKEN);

bot.start((ctx) => {
  console.log("bot started");
  ctx.reply("hello welcome to weather bot @GM");
});

bot.on("text", async (ctx) => {
  const { message } = ctx;
  const { data } = await fetchData(message.text);
  if (data.success === false) {
    ctx.reply("Enter a valid city name:");
  } else {
    const { current, location } = data;
    const weatherStatus = current.weather_descriptions[0];
    setInterval(function(){ 
      ctx.reply(
      `🌆 City:${location.name}\n-\n 🌡 Temperature ${
        current.temperature
      }°\n-\n🌐 current weather condition : ${
        (weatherStatus.toLowerCase().includes("clear") === true && "☀️") ||
        (weatherStatus.toLowerCase().includes("sunny") === true && "⛅") ||
        (weatherStatus.toLowerCase().includes("cloud") === true && "☁") ||
        (weatherStatus.toLowerCase().includes("overcast") === true && "☁️") ||
        (weatherStatus.toLowerCase().includes("rain") === true && "🌧") ||
        (weatherStatus.toLowerCase().includes("snow") === true && "❄️")
      } ${current.weather_descriptions[0]}`
    );

    },60 * 60 * 1000);
   
  }
});
console.log("hii")


bot.launch();
