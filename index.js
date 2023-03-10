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
      `š City:${location.name}\n-\n š” Temperature ${
        current.temperature
      }Ā°\n-\nš current weather condition : ${
        (weatherStatus.toLowerCase().includes("clear") === true && "āļø") ||
        (weatherStatus.toLowerCase().includes("sunny") === true && "ā") ||
        (weatherStatus.toLowerCase().includes("cloud") === true && "ā") ||
        (weatherStatus.toLowerCase().includes("overcast") === true && "āļø") ||
        (weatherStatus.toLowerCase().includes("rain") === true && "š§") ||
        (weatherStatus.toLowerCase().includes("snow") === true && "āļø")
      } ${current.weather_descriptions[0]}`
    );

    },60 * 60 * 1000);
   
  }
});


bot.launch();
