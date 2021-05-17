const Discord = require("discord.js")
const mineflayer = require("mineflayer")
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk');
const performance = require('perf_hooks').performance;
const mc = require('minecraft-protocol');

let prefix = config.bot_prefix;
let ver = config.version;
let ip = config.ip;
let username = config.username;
let mc_pass = config.mcpass;
let auth = config.auth;
let discord_chat = config.mc_discord_chat;
let login_pass = config.password;
let dev_role = config.dev_role_id;
let color = "#F1C40F";
var bot
if (mc_pass == "") {
  bot = mineflayer.createBot({
    host: ip,
    username: username,
    version: ver
  })
} else {
  bot = mineflayer.createBot({
    host: ip,
    username: username,
    password: mc_pass,
    auth: auth,
    version: ver
  })
}

client.on('ready', activity => {
  client.user.setStatus(`available`)
  client.user.setActivity(
    `${ip} Servers Chat | For Help Do  ${prefix}help `, {
      type: "WATCHING"
    }
  )
});

client.on("ready", async =>{
  console.log(chalk.yellow(`Online as ${client.user.tag}`))
})

bot.on("login", async =>{
  bot.chat(`/login ${login_pass}`)
  console.log(chalk.green(`Logged in as ${username} in ${ip}`))
})

bot.on("message", message =>{
  let channel = client.channels.cache.get(discord_chat)
  if (!channel) return;
  channel.send(`\`\`\`${message}\`\`\``)
})

client.on('message', msg => {
  if (!msg.content.startsWith(prefix)) return
  if (!msg.member.roles.cache.has(dev_role)) return msg.channel.send("\`\`You do not have the required perms\`\`")
  let args = msg.content.split(" ").slice(1)
  args = msg.content.slice(prefix.length).split(/ +/);
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  command = args.shift().toLowerCase();

  if (command == "sudo") {
    const chat = args.join(" ")
    bot.chat(chat)
    const success = new Discord.MessageEmbed()
      .setDescription(`:white_check_mark: ${msg.author.tag} sent \`${chat}\``)
      .setColor(color)
    msg.channel.send(success)
  }else if (command == "help") {
    const help = new Discord.MessageEmbed()
      .setTitle(`Help`)
      .addField(` ${prefix}sudo`, 'Get The bot say what you want')
      .addField(` ${prefix}ping`, 'Ping the server')
      .addField(` ${prefix}exit`, 'Exit the application')
      .setColor(color)
    msg.channel.send(help)
  }else if (command == "ping") {
    pingTimerStart = performance.now();
    mc.ping({
        host: ip,
        port: 25565
    }, (err, serv) =>
    {
        if (err) return '';
        pingTimerEnd = performance.now();
        const ping = new Discord.MessageEmbed()
        .setTitle(`Pinged`)
        .addField('Host', ip)
        .addField('Version', `${serv.version.name}`)
        .addField('Latency', `${serv.latency} ms`)
        .addField('Time taken to ping',`${Math.round(pingTimerEnd-pingTimerStart)} ms`)
        .setColor(color)
        msg.channel.send(ping)
    });
  }else if (command == "exit") {
    bot.clearControlStates()
    const MoStop = new Discord.MessageEmbed()
      .setDescription(`:white_check_mark: Shutting down...`)
      .setColor(color)
    msg.channel.send(MoStop).then(() => {
            process.exit(0);
        })
  }
})

client.login(config.token)
.catch(error =>{
  console.log(chalk.red('Discord Bot Failed Login'));
})
