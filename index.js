// импорт библиотек
const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);

// запуск бота
let password = '...';  // type
const bot = mineflayer.createBot({
  host: 'mc.edenor.ru',
  port: 25565,
  username: '...',  // type
  version: '1.18'
});

// загрузка плагинов
bot.loadPlugin(tpsPlugin);

let auth = false;

// вход
bot.on('spawn', () => {
  if (!auth) {
    console.log(' ~ Join in lobby');
    bot.chat('/login ' + password);
    console.log(' ~ Auth...');

    bot.chat('Пейн топ кодер');

    setTimeout(() => {
      bot.activateItem();
      bot.once('windowOpen', (window) => {
        // тупой перебор
        bot.clickWindow(12, 0, 0, (err) => {
          console.log(' ~ ' + err);
        });
        bot.clickWindow(13, 0, 0, (err) => {
          console.log(' ~ ' + err);
        }); 
        bot.clickWindow(14, 0, 0, (err) => {
          console.log(' ~ ' + err);
        });
        bot.clickWindow(15, 0, 0, (err) => {
          console.log(' ~ ' + err);
        });
      });
      console.log(' ~ Join in server');
        
    }, 1000)
    auth = true
  } else {
    setInterval(() => {console.log(' ~ TPS: ' + bot.getTps())}, 15000);
    return bot.chat('!Пейн стоит афк, а Херостив уже мог бы блин сделать /afk, чтобы скрипт это не писал');
  }
});

// команды
bot.on('chat', (username, message) => {
  console.log(`${username}: ${message}`);
  // тпс
  //if (message === 'Tps') {
  //    bot.chat('!Current tps: ' + bot.getTps())
  //}
})

// если умер
bot.on('death', function() {
  console.log(" ~ I died x.x");
  bot.chat("!I died x.x");
});

// Прослушивание ошибок и причин отключения от сервера:
bot.on('kicked', (reason, loggedIn) => {
  console.log(' ~ ' + reason + ' ' + loggedIn);
});
bot.on('end', (reason) => {
  console.log(' ~ ' + reason);
  console.log(' ~ дисконект...')
});
bot.on('error', err => console.log(' ~ ' + err));
