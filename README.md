# Minecraft-Discord-Bot
## A simple mineflayer afk bot which you can hook up to a discord bot

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/Sreenington/Minecraft-Discord-Bot)


## Features

- Display server chat in a specified channel
- Supports Premium/Cracked
- Auto login in cracked servers
- Sudo command 
- Ping command
- Exit command

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v14.17.0

After cloning, make sure to edit the config.json file

```sh
cd minecraft-discord-bot
npm install mineflayer
npm install discord.js
npm install chalk
node index.js
```

## Config
```
{
  "ver" : "1.8.9" // The server version you want to play in,
  "ip" : "play.hypixel.net"  //server ip that you want to connect to,
  "username" : "ExampleBot" //username,
  "mcpass" : "bot123" //password; leave this blank if it's a cracked account,
  "auth" : "mojang" //can be "mojang" / "microsoft",
  "password" : "" //if it's a cracked server, type the password here for it to auto login (if the bot isn't registered, then use the sudo command),
  "token" : "" //discord bot token,
  "mc_discord_chat" : "" //ID of the channel you want the server chat to send the server chat (you will need to enable developer mode),
  "bot_prefix" : "=" //bot prefix,
  "dev_role_id" : "" //ID of the role that has acces to the discord bot "also requires developer mode to be enabled"
}
```

## Upcoming features

- Anti afk
- Multiple alts management
