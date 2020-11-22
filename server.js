
require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

////
const SQLite = require("sqlite");
const path = require("path");
const invites = {};
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyBhfMGpSyw0LVX4Dptcx2WoDzuQTsM_7DM"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyBhfMGpSyw0LVX4Dptcx2WoDzuQTsM_7DM"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(process.env.TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
const figlet = require('figlet');
var ti={}
,spee={}
,attentions={};

client.on("ready", () => {
  console.log("hi");
});


var used1 = false;

var version = '1.0.0';

client.on('ready', () => {
    console.log('This bot is online! ' + version);
    client.user.setStatus('idle').catch(console.error);
    setInterval(() => {
        if(used1){
          client.user.setActivity(`DaBot | ${client.guilds.size} Server`,{
          type: "LISTENING"
          })
        used1 = false;}
      else{
        client.user.setActivity("d+help",{
        type: "LISTENING"
        });
        used1 = true;}
    }, 5000);


});
client.on('message', message => {
                                if(!message.channel.guild) return;
                        if (message.content.startsWith(prefix+'ping')) {
                            if(!message.channel.guild) return;
                            var msg = `${Date.now() - message.createdTimestamp}`
                            var api = `${Math.round(client.ping)}`
                            if (message.author.bot) return;
                        let embed = new Discord.RichEmbed()
                        .setThumbnail(client.user.avatarURL)
                        .setAuthor(message.author.username,message.author.avatarURL)
                        .setColor('BLACK')
                        .addField('**__Time Taken:__**',msg + " ms :signal_strength: ",true)
                        .addField('**__WebSocket:__**',api + " ms :signal_strength: ",true)
         message.channel.send({embed:embed});
                        }
                    });

///////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", msg=> {
  if (!msg.content.startsWith(prefix)) return;
  if (msg.content === prefix+"help") {
   const embed = new Discord.RichEmbed()
      .setThumbnail(client.user.avatarURL)
      .setColor("#050505")
      .setTitle(`**__DaBot Command List__**`)
      .setDescription(`
<:DDiscord:718240829558226995> - Server Support **__[Click here](https://discord.gg/xEPtHmh)__**
<:DBot:718240829034070058> - Bot invite **__[Click here](https://discord.com/api/oauth2/authorize?client_id=696812064425115668&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)__**`,true)
      .addField('<:Dcash:718237408696729650> __Economy__',`\`${prefix}help economy\``,true)
      .addField('<:iko4:718237357031030825> __Utility__',`\`${prefix}help utility\` `,true)
      .addField('<:DFun:718238908994945024> __Fun__',`\`${prefix}help fun\``,true)
      .addField('<:Dnote:718237465214713939> __Music__',`\`${prefix}help music\``,true)     
      .addField('<:Dtext:718237351188627508> __Text__',`\`${prefix}help text\``,true)
      .addField('<:DGame:718238909472964708> __Games__',`\`${prefix}help games\``,true)
      .setFooter("Requested By : "+msg.author.username, msg.author.avatarURL)
      .setTimestamp();
msg.channel.send(embed);
  }
});


///////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if (message.content.startsWith(prefix + "new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists(gg => gg.name === "Ticket Team"))
      return message.channel.send(`you need role \`Ticket Team\`.`);
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Ticket Team");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `Please try explain why you opened this ticket with as much detail as possible. Our **Ticket Staff** will be here soon to help.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith(prefix + "closet")) {
    if (!message.guild.roles.exists(gg => gg.name === "Ticket Team"))
      return message.channel.send(`you need role name \`Ticket Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Ticket Team").first().id
      )
    )
      return message.channel.send("You don't have the `Ticket Team` role!");
    message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////utility
client.on("message", message => {
    if(!message.channel.guild) return;
if(message.content.startsWith(prefix+"server")) {
    if(message.author.bot) return;
    if(!message.channel.guild) return;
    if(message.guild.region === "brazil") {
    var br = "Brazil"
    var flag = ":flag_br:"
    } else if(message.guild.region === "europe") {
    var br = "europe"
    var flag = ":flag_eu:"
    } else if(message.guild.region === "hongkong") {
    var br = "Hongkong"
    var flag = ":flag_hk:"
    } else if(message.guild.region === "japan") {
    var br = "Japan"
    var flag = ":flag_jp:"
    } else if(message.guild.region === "russia") {
    var br = "Russia"
    var flag = ":flag_ru:"
    } else if(message.guild.region === "singapore") {
    var br = "Singapore"
    var flag = ":flag_sg:"
    } else if(message.guild.region === "southafrica") {
    var br = "Southafrica"
    var flag = ":flag_za:"
    } else if(message.guild.region === "sydney") {
    var br = "Sydney"
    var flag = ":flag_au:"
    } else if(message.guild.region === "us-central") {
    var br = "Us-Cetral"
    var flag = ":flag_us:"
    } else if(message.guild.region === "us-east") {
    var br = "Us-East"
    var flag = ":flag_us:"
    } else if(message.guild.region === "us-south") {
    var br = "Us-South"
    var flag = ":flag_us:"
    } else if(message.guild.region === "us-west") {
        var br = "Us-West"
        var flag = ":flag_us:"
    } else if(message.guild.region === "eu-west") {
    var br = "Eu-West"
    var flag = ":flag_eu:"
    } 
    var online = message.guild.members.filter(m=>m.presence.status == 'online').size + message.guild.members.filter(m=>m.presence.status == 'dnd').size +  message.guild.members.filter(m=>m.presence.status == 'idle').size
    let embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setTitle(`**${message.guild.name} Information:**`)
    .setDescription("- **Server Name** :`" + `${message.guild.name}` + "`\n" + "- **Server ID** :`" + `${message.guild.id}` + "`\n" + 
    "- **Server Region** :" + `\` ${message.guild.region} \` ${flag} \n` + 
    "- **Server Owner** :" + `${message.guild.owner}` + "\n" + "\n" + "```md\n[Guild](Members)```" + "\n" + 
    "- **Total Bots** :`" + `${message.guild.members.filter(member => member.user.bot).size}` + "`\n" + "- **Total Members** :`" + `${message.guild.memberCount}` + "`\n" +
    "- **Online Members** :`" + `${online}` + "`\n" + "- **Offline Members** :`" + `${message.guild.members.filter(m=>m.presence.status == 'offline').size}` + "`\n" + 
    "\n" + "```tex\n$ Guild Channels```" + "\n" + 
    "- **Channels Size** :`" + `${message.guild.channels.size}` + "`\n" + "- **Text Channels** :`" + `${message.guild.channels.filter(m => m.type === 'text').size}` + "`\n" + "- **Voice Channels** :`" + `${message.guild.channels.filter(m => m.type === 'voice').size}` + "`\n" +
    "- **Afk Channel** :" + `${message.guild.afkChannel}` + "\n" + "- **Afk Timeout** :`" + `${message.guild.afkTimeout} Second` + "`\n" + "- **System Channel** :" + `${message.guild.systemChannel}` + "\n" +
    "\n" +"```fix\nMore Information```" + "\n" +
    "- **Roles Size** :`" + `${message.guild.roles.size}` + "`\n" +  "- **Emojis Size** :`" + `${message.guild.emojis.size}` + "`\n" + 
    "- **Created At** :`" + `${message.guild.createdAt}` + "`\n" + "- **Verified** :`" + `${message.guild.verified}` + "`\n" +"- **VerificationLevel** :`" + `${message.guild.verificationLevel}` + "`\n")
    .setFooter(message.author.tag, message.author.avatarURL)
    message.channel.send(embed)
    
}
})
client.on("message", message=>{
    if(message.author.bot) return;
    if(!message.channel.guild) return;
    if(message.content.startsWith(prefix+"bot")) {
        let uptime = client.uptime;

        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        let notCompleted = true;
    
        while (notCompleted) {
    
            if (uptime >= 8.64e+7) {
    
                days++;
                uptime -= 8.64e+7;
    
            } else if (uptime >= 3.6e+6) {
    
                hours++;
                uptime -= 3.6e+6;
    
            } else if (uptime >= 60000) {
    
                minutes++;
                uptime -= 60000;
    
            } else if (uptime >= 1000) {
                seconds++;
                uptime -= 1000;
    
            }
    
            if (uptime < 1000)  notCompleted = false;
    
        }
        var ping = `${Date.now() - message.createdTimestamp}`
        var api = `${Math.round(client.ping)}`
        let ramUsage = (process.memoryUsage().rss / 1048576).toFixed();

    let embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setThumbnail(client.user.avatarURL)
    .setAuthor(client.user.tag, client.user.avatarURL)
    .setFooter(message.author.tag, message.author.avatarURL)
    .setTitle("**DaBot Information:**")
    .setDescription("- **Bot Name** :`" + `${client.user.tag}` + "`\n" +  "- **Bot ID** :`" + `${client.user.id}` + "`\n" + 
    "- **Bot Prefix** :`" + `${prefix}` + "`\n" + "- **Ping** :`" + `${ping}` + "`\n" + "- **Uptime** :`" + `${days} days, ${hours} hrs, ${minutes} , ${seconds} sec` + "`\n" + 
    "- **Creator** :`" + `D_Dev#8285` + "`\n" + "\n" + "```md\n[Servers](Information)```" + "\n" + "- **Guilds** :`" + `${client.guilds.size}` + "`\n" + 
    "- **Members** :`" + `${client.users.size}` + "`\n" + "- **Channels** :`" + `${client.channels.size}` + "`\n" + 
    "\n" + "```tex\n$ Developer Information```" + "\n" + "- **NodeJs** :`" + `${process.version}` + "`\n" + "- **DiscordJs** :`" + `${Discord.version}` + "`\n" + 
    "- **Arch** :`" + `${process.arch}` + "`\n" + "- **Platform** :`" + `${process.platform}` + "`\n" + "\n" + "```cs\n# Host Information```" + "\n" + 
    "- **UseHeap** :`" + `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB` + "`\n" + 
    "- **Heap** :`" + `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100} MB` + "`\n" + 
    "- **Ram** :`" + `${ramUsage} MB` + "`\n" + "- **Rss** :`" + `${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100} MB` + "`\n")



    message.channel.send(embed)


    
    }
    });

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  let args = msg.content.split(" ");
const user = msg.mentions.users.first() || msg.author;
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === `avatar`) {
    if (msg.channel.type === "dm")
      return msg.channel.send(
        "Nope Nope!! u can't use avatar command in DMs (:"
      );
    let mentions = msg.mentions.members.first();
    if (!mentions) {
      let sicon = msg.author.avatarURL;
      let embed = new Discord.RichEmbed()
    .setColor('#000000')
    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .setDescription(`**[Avatar Link](${user.avatarURL})**`)
    .setImage(user.displayAvatarURL)
    .setFooter(`Requested By ${msg.author.username}#${msg.author.discriminator}` , msg.author.displayAvatarURL)
      msg.channel.send({ embed });
    } else {
      let sicon = mentions.user.avatarURL;
      let embed = new Discord.RichEmbed()
    .setColor('#000000')
    .setAuthor(`${user.username}#${user.discriminator}`, user.displayAvatarURL)
    .setDescription(`**[Avatar Link](${user.avatarURL})**`)
    .setImage(user.displayAvatarURL)
    .setFooter(`Requested By ${msg.author.username}#${msg.author.discriminator}` , msg.author.displayAvatarURL)
      .setImage(sicon);
      msg.channel.send({ embed });
    }
  }
});
client.on('message', message=>{
    if(message.content.startsWith(prefix+"user")) {
    if(!message.channel.guild) return;
    let uinfo = message.mentions.users.first() || message.author 
if(uinfo.bot) {
    var type = "BOT"
    var emoji = ":robot:"
    } else {
    var type = "Human"
    var emoji = ":man_in_tuxedo:"
    }
    if (uinfo.presence.game !== null) {
    playing = `${uinfo.presence.game.name}`;
    } else {
     playing = "Not Playing";
    };
    if(uinfo.presence.status == "online") {
    var hello = "Online";
    } else {
    if(uinfo.presence.status == "online") {
    var hello = "Online";
    } else {
    if(uinfo.presence.status == "dnd") {
    var hello = "Do Not Disturb";
    } else {
    if(uinfo.presence.status == "idle") {
    var hello = "Idle";
    } else {
    if(uinfo.presence.status == "offline") {
    var hello = "Invisible";
    }}}}}
    let embed =new Discord.RichEmbed()
    .setColor("#000000")
    .setAuthor(uinfo.username, uinfo.avatarURL)
    .setThumbnail(uinfo.avatarURL)
    .setTitle(`**${uinfo.username} Information:**`)
    .setDescription("- **UserName** :" + `<@${uinfo.id}>` + "\n" + "- **UserID** :`" + `${uinfo.id}` + "`\n" + "- **Discrim** :`" + `${uinfo.discriminator}` + "`\n" +
    "- **Account Type** :" + `${emoji}` + "`" + `${type}` + "`\n" + "- **Playing** :`" + `${playing}` + "`\n" + "- **Status** :`" + `${hello}` + "`\n" + 
    "- **CreatedAt** :`" + `${moment(uinfo.createdTimestamp).format('YYYY/M/D HH:mm:ss')}` + "`\n" + "- **Joined Server** :`" + message.member.joinedAt.toLocaleString() + "`\n" + 
    "\n" + "```md\n[More](Information)```" + "\n" + "- **Last Message** :`" + `${message.author.lastMessage}` + "`\n" + "- **Last Message ID** :`" + `${message.author.lastMessage.id}` + "`\n")
    message.channel.send(embed)
    }
    });

///////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////
const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (args[0].toLowerCase() == `${prefix}credits`) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**:bank:| ${mention.username}, your account balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]) || [",", "."].includes(args[2]))
        return message.channel.send(`**:x: | Error**`);

      if (args[2] < 1) return message.channel.send(`**:x: | Error**`);
      if (mention.bot) return message.channel.send(`**:x: | Error**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | Error**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error , You Don't Have Enough Credit**`
        );
      if (args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
      let resulting =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] - args[2] * (5 / 100));
      let tax =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let Canvas = require("canvas");
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = "20px Arial Bold";
      ctx.fontSize = "20px";
      ctx.fillStyle = "#ffffff";
      message.channel
        .send(
          `**${
            message.author.username
          }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
        )
        .then(async essss => {
          message.channel.send(`\`${num}\``).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (collected.first().content === num) {
                  essss.delete()
                  message.channel.send(
                    `**:moneybag: | ${
                      message.author.username
                    }, has transferred \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                  );
                  mention.send(
                    `**:money_with_wings: | Transfer Receipt **\`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                      message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting.toLocaleString()
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting.toLocaleString()
                  );
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  essss.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily`) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:rolling_eyes: |  ${
          message.author.username
        }, your daily :dollar: credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (600, 700, 650, 300, 500, 100, 200, 120, 150, 350, 320, 220, 250, 400);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:atm:  | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
}); //

client.on("message", async message => {
  let Fire = message.content.split(" ")[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (Fire === "addcredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += +args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`** Adedd Money For : \`${args[1]}\` Done **`);
  } else if (Fire === "removecredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += -args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`**, Remove Money For : \`${args[1]}\`**`);
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

const { Attachment } = require("discord.js");
const { resolve, join } = require("path");
const fetch = require("node-fetch");
const prettySeconds = require("pretty-seconds");
const fsn = require("fs-nextra");


///////////////////////////////////////////////////////////////////////////////////////////////

///كود منشن بوتات

client.on("message", message => {
  if (message.content === prefix + "list") {
    var list_all = [];
    message.guild.members.forEach(bb => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    message.channel.send(list_all.join(", "));
  }
});
///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////text
const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};

'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});


client.on('message' , async (message) => {
       if(message.content.startsWith(prefix + "emoji")) {
        if(!message.channel.guild) return;
          let args = message.content.split(" ").slice(1);
  if (args.length < 1) {
    message.channel.send('You must provide some text to emojify!');
}

message.channel.send(
    args.join(' ')
        .split('')
        .map(c => mapping[c] || c)
        .join('')
);
};
});


client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "poll") {
    message.channel.send(`**${message.author.username} **`+ "asks :" + args.join("  ")).then(async msg => {
      msg.react("👍")
      msg.react("👎")
    message.delete();
 
    }
  )}
});

client.on('message', message => {
  if (message.author.bot) return;
  if(!message.channel.guild) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);


  if (command === "say") {
          message.delete()
    message.channel.sendMessage(args.join(" "))
  }



if (command == "embed") {
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor("#050505")
    message.channel.sendEmbed(say);
    message.delete();

  }


});
client.on('message', message => {
if (message.content.startsWith(prefix + 'tag')) {
    let args = message.content.split(" ").slice(1);
if(!args[0]) return message.reply('Write Some Things');  

    figlet(args.join(" "), (err, data) => {
              message.channel.send("```" + data + "```")
           })
}
});
///////////////////////////////////////////////////////////////////////////////////////////////fun
client.on('message',  (message) => {
        if(message.content.startsWith('d+kiss')) {
  let user = message.mentions.users.first();
  if (!user) {

    return message.emit('commandUsage', message, this.help);
  }
  var kiss = [
    'https://media.giphy.com/media/dP8ONh1mN8YWQ/giphy.gif',
    'https://media.giphy.com/media/CzCi6itPr3yBa/giphy.gif',
    'https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif',
    'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif',
	'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
	'https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif',
    'https://media.giphy.com/media/BaEE3QOfm2rf2/giphy.gif',
	'https://media.giphy.com/media/OSq9souL3j5zW/giphy.gif',
	'https://giphy.com/gifs/kiss-anime-nISHppsUAzosMhttps://media.giphy.com/media/nISHppsUAzosM/giphy.gif',
	'https://media.giphy.com/media/ll5leTSPh4ocE/giphy.gif',
	'https://media.giphy.com/media/10r6oEoT6dk7E4/giphy.gif',
	'https://media.giphy.com/media/YC4QEtFmz64sE/giphy.gif',
	'https://media.giphy.com/media/KH1CTZtw1iP3W/giphy.gif',
	'https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif',
	'https://media.giphy.com/media/Z21HJj2kz9uBG/giphy.gif',
	'https://media.giphy.com/media/mGAzm47irxEpG/giphy.gif',
	'https://media.giphy.com/media/JynbO9pnGxPrO/giphy.gif',
	'https://media.giphy.com/media/7z1xs4Fl9Kb8A/giphy.gif',
	'https://media.giphy.com/media/EP9YxsbmbplIs/giphy.gif',
	'https://media.giphy.com/media/q7MxQyarcDHDW/giphy.gif',
	'https://media.giphy.com/media/uSHX6qYv1M7pC/giphy.gif',
	'https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif',
	'https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif',
	'https://media.giphy.com/media/fHtb1JPbfph72/giphy.gif',
	'https://media.giphy.com/media/pwZ2TLSTouCQw/giphy.gif',
	'https://media.giphy.com/media/DfzHC09hY64Gk/giphy.gif',
	'https://media.giphy.com/media/l0MYB8Ory7Hqefo9a/giphy.gif',
	'https://media.giphy.com/media/Y9iiZdUaNRF2U/giphy.gif',
	'https://media.giphy.com/media/CTo4IKRN4l4SA/giphy.gif',
	'https://media.giphy.com/media/jR22gdcPiOLaE/giphy.gif',
    'https://media.giphy.com/media/pFg4Ko6pXqQVy/giphy.gif'
  ];

  message.channel.send({
    embed: {
      description: `:kissing_heart: **${message.author.username}** kisses **${user.username}**!`,
      image: {
        url: kiss[Math.floor(Math.random() * kiss.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }  
});
client.on('message',  (message) => {
        if(message.content.startsWith('d+love')) {
  let user = message.mentions.users.first();
  if (!user) {

    return message.emit('commandUsage', message, this.help);
  }
  let loves = [
    'https://media.giphy.com/media/YDB4EF3U6i6IM/giphy.gif',
    'https://media.giphy.com/media/l41JWw65TcBGjPpRK/giphy.gif',
    'https://media.giphy.com/media/3o6gDZ9unSrDk3EuR2/giphy.gif',
    'https://media.giphy.com/media/ymkLJAxVz2la/giphy.gif',
    'https://media.giphy.com/media/ZOln4JxCoZay4/giphy.gif',
    'https://media.giphy.com/media/l0K4kWJir91VEoa1W/giphy.gif',
    'https://media.giphy.com/media/X3FmqQ7ehoCBy/giphy.gif',
    'https://media.giphy.com/media/VlzUkJJzvz0UU/giphy.gif',
    'https://media.giphy.com/media/NbPJFUS6Vkx7q/giphy.gif',
    'https://media.giphy.com/media/wDEWXcisSjrQQ/giphy.gif',
    'https://media.giphy.com/media/xT8qBuhwq0OyL7UkdW/giphy.gif',
    'https://media.giphy.com/media/gfvxlwRKH1y5q/giphy.gif',
    'https://media.giphy.com/media/PuTSgeacS3Z7i/giphy.gif',
    'https://media.giphy.com/media/l49JBwneyflgjm5zO/giphy.gif',
    'https://media.giphy.com/media/QKUA2bIAgjFgk/giphy.gif',
    'https://media.giphy.com/media/T3Uzzre7Ap0mk/giphy.gif',
    'https://media.giphy.com/media/3oeSB6pawq6G99xCXS/giphy.gif',
    'https://media.giphy.com/media/iKIgD5j0I3hMQ/giphy.gif',
    'https://media.giphy.com/media/hhHcFH0xAduCs/giphy.gif',
    'https://media.giphy.com/media/3o7qDJKIO5rSeyHhvO/giphy.gif',
    'https://media.giphy.com/media/92bGINsmjAuUE/giphy.gif',
    'https://media.giphy.com/media/bErElGdAHUmoE/giphy.gif',
    'https://media.giphy.com/media/jQqU9dCKUOdri/giphy.gif',
    'https://media.giphy.com/media/10uJ0IFxlCA06I/giphy.gif',
    'https://media.giphy.com/media/bMLGNRoAy0Yko/giphy.gif',
    'https://media.giphy.com/media/3osxYcry2fDfqyhOQ8/giphy.gif',
    'https://media.giphy.com/media/3ohs84a6AyArTscVsk/giphy.gif',
    'https://media.giphy.com/media/3o6Zt6D0wctP0kpuwg/giphy.gif',
    'https://media.giphy.com/media/4zmFt0xpke8AU/giphy.gif',
    'https://media.giphy.com/media/l3vR9O3vpOCDRo8rC/giphy.gif',
    'https://media.giphy.com/media/13sgibUDaaaEU0/giphy.gif'
  ];

  message.channel.send({
    embed: {
      description: `:heart: **${message.author.username}** He expresses his true love **${user.username}**!`,
      image: {
        url: loves[Math.floor(Math.random() * loves.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }  
});

client.on('message',  (message) => {
        if(message.content.startsWith('d+hug')) {
  let user = message.mentions.users.first();
  if (!user) {

    return message.emit('commandUsage', message, this.help);
  }
  let hugs = [
    'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
    'https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif',
    'https://media.giphy.com/media/wnsgren9NtITS/giphy.gif',
    'https://media.giphy.com/media/qscdhWs5o3yb6/giphy.gif',
    'https://media.giphy.com/media/hi0VuTUqLrmuc/giphy.gif',
	'https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif',
	'https://media.giphy.com/media/7WQQXPg6o3YNa/giphy.gif',
	'https://media.giphy.com/media/LWTxLvp8G6gzm/giphy.gif',
	'https://media.giphy.com/media/xZshtXrSgsRHy/giphy.gif',
	'https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif',
	'https://media.giphy.com/media/10BcGXjbHOctZC/giphy.gif',
	'https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif',
	'https://media.giphy.com/media/xUPGcgtKxm4PADy3Cw/giphy.gif',
	'https://media.giphy.com/media/JTjSlqiz63j5m/giphy.gif',
	'https://media.giphy.com/media/aD1fI3UUWC4/giphy.gif',
	'https://media.giphy.com/media/5eyhBKLvYhafu/giphy.gif',
	'https://media.giphy.com/media/ddGxYkb7Fp2QRuTTGO/giphy.gif',
	'https://media.giphy.com/media/pXQhWw2oHoPIs/giphy.gif',
	'https://media.giphy.com/media/ZRI1k4BNvKX1S/giphy.gif',
	'https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif',
	'https://media.giphy.com/media/s31WaGPAmTP1e/giphy.gif',
	'https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif',
	'https://media.giphy.com/media/aVmEsdMmCTqSs/giphy.gif',
	'https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif',
	'https://media.giphy.com/media/ArLxZ4PebH2Ug/giphy.gif',
	'https://media.giphy.com/media/kFTKQfjK4ysZq/giphy.gif',
	'https://media.giphy.com/media/vVA8U5NnXpMXK/giphy.gif',
	'https://media.giphy.com/media/2q2qHJu838EyQ/giphy.gif',
	'https://media.giphy.com/media/q3kYEKHyiU4kU/giphy.gif',
	'https://media.giphy.com/media/3ZnBrkqoaI2hq/giphy.gif',
	'https://media.giphy.com/media/ExQqjagJBoECY/giphy.gif',
    'https://media.giphy.com/media/3o6Yg5fZCGeFArIcbm/giphy.gif'
  ];

  message.channel.send({
    embed: {
      description: `:hugging: **${message.author.username}** hugs **${user.username}**!`,
      image: {
        url: hugs[Math.floor(Math.random() * hugs.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }  
});

client.on('message',  (message) => {
        if(message.content.startsWith('d+slap')) {
  let user = message.mentions.users.first();
  if (!user) {

    return message.emit('commandUsage', message, this.help);
  }
  let slaps = [
    'https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
    'https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
    'https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif',
    'https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif',
    'https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif',
    'https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif',
    'https://media.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif',
    'https://media.giphy.com/media/9U5J7JpaYBr68/giphy.gif',
    'https://media.giphy.com/media/q0uYk5uwJVFug/giphy.gif',
    'https://media.giphy.com/media/6Fad0loHc6Cbe/giphy.gif',
    'https://media.giphy.com/media/prKt29rL7zAbe/giphy.gif',
    'https://media.giphy.com/media/6UTkJXBd26qiI/giphy.gif',
    'https://media.giphy.com/media/CIvfqJqBbvliU/giphy.gif',
    'https://media.giphy.com/media/3pSKnxaDzl9Oo/giphy.gif',
    'https://media.giphy.com/media/m0VwgrO5yXxQY/giphy.gif',
    'https://media.giphy.com/media/2o855hr1xVotO/giphy.gif',
    'https://media.giphy.com/media/URBigLkgWoYzS/giphy.gif',
    'https://media.giphy.com/media/pGOdXNi6J7ML6/giphy.gif',
    'https://media.giphy.com/media/HHUd5nOFbSYtG/giphy.gif',
    'https://media.giphy.com/media/wqP5TOFnOMwqQ/giphy.gif'
    
  ];

  message.channel.send({
    embed: {
      description: `:raised_hand: **${message.author.username}** slaps **${user.username}**!`,
      image: {
        url: slaps[Math.floor(Math.random() * slaps.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }  
});

client.on('message',  (message) => {
        if(message.content.startsWith('d+boom')) {
  let user = message.mentions.users.first();
  if (!user) {

    return message.emit('commandUsage', message, this.help);
  }
  let bombs = [
    'https://media.giphy.com/media/Xp98Vi5OBvhXpwA0Zp/giphy.gif',
    'https://media.giphy.com/media/POnwee2RZBWmWWCeiX/giphy.gif',
	'https://media.giphy.com/media/oywQ7OhnYupINQa0L4/giphy.gif',
    'https://media.giphy.com/media/5aLrlDiJPMPFS/giphy.gif',
	'https://media.giphy.com/media/l1BgS9aNtdCdjgkaQ/giphy.gif',
	'https://media.giphy.com/media/d0NnEG1WnnXqg/giphy.gif',
    'https://media.giphy.com/media/NmrqUdwGXPOog/giphy.gif',
	'https://media.giphy.com/media/dpnfPvaCIHBrW/giphy.gif',
	'https://media.giphy.com/media/mks5DcSGjhQ1a/giphy.gif',
    'https://media.giphy.com/media/8wfoaIjVc0FBaLu5xH/giphy.gif',
	'https://media.giphy.com/media/xThtanBNixj1O1m5oY/giphy.gif',
	'https://media.giphy.com/media/fdGkCOiM0oOqI/giphy.gif',
    'https://media.giphy.com/media/c862b2dAhJXYA/giphy.gif',
	'https://media.giphy.com/media/CepTYjGRbV1ba/giphy.gif',
	'https://media.giphy.com/media/sRGCQ7INgSD0qbTqB5/giphy.gif',
    'https://media.giphy.com/media/ZJYOwl8SbFsic/giphy.gif',
	'https://media.giphy.com/media/3oEhmKspQX9EN48HNm/giphy.gif',
	'https://media.giphy.com/media/l1KVcAP6jvP9r4MaA/giphy.gif',
    'https://media.giphy.com/media/j2mY6orBJqAdG/giphy.gif',
	'https://media.giphy.com/media/3oz8xEqn8AGAQbR0yY/giphy.gif',
	'https://media.giphy.com/media/l4lQW9KfRQscU0ds4/giphy.gif',
    'https://media.giphy.com/media/XathaB5ILqSME/giphy.gif',
	'https://media.giphy.com/media/26AHvF2p5pridaSf6/giphy.gif',
	'https://media.giphy.com/media/Nlur5uO8GkjC0/giphy.gif',
    'https://media.giphy.com/media/l1J3preURPiwjRPvG/giphy.gif',
	'https://media.giphy.com/media/8cdZit2ZcjTri/giphy.gif',
	'https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif',
    'https://media.giphy.com/media/V88pTEefkoOFG/giphy.gif',
    'https://media.giphy.com/media/rfWAomOTPeOo8/giphy.gif'
  ];

  message.channel.send({
    embed: {
      description: `:boom: **${message.author.username}** Ferge3 lik Sowa Dialk **${user.username}**!`,
      image: {
        url: bombs[Math.floor(Math.random() * bombs.length)]
      }
    }
  }).catch(e => {
    client.log.error(e);
  })
        }  
});
///////////////////////////////////////////////////////////////////////////////////////////////games
const cuttweet = [
     '**CutTweet** |  Imagine if you were to draw a single thing into reality, what would you draw?‏',
     '**CutTweet** |  What do you think most silences the child? ‏',
     '**CutTweet** |   Freedom for ...?‏',
     '**CutTweet** |  Your favorite cartoon channel in your childhood?‏',
     '**CutTweet** |   A word for headache?‏',
     '**CutTweet** |   What separates you?‏',
     '**CutTweet** |  A special situation I did with someone who still reminds him of you? ‏',
     '**CutTweet** |   Which is victorious, pride or love?‏',
     '**CutTweet** |   After 10 years, what will you be?‏',
     '**CutTweet** |  Who are the strangest and most beautiful names that passed by you?‏',
     '**CutTweet** |   How old have you been misfortune about someone wanting?‏',
     '**CutTweet** |   Most recently asked?‏',
     '**CutTweet** |   What makes you feel fear?‏',
     '**CutTweet** |   What spoil the friendship?‏',
     '**CutTweet** |   Someone who does not refuse his request ?‏',
     '**CutTweet** |   How many times have you lost someone you love?‏',
     '**CutTweet** |   How do you deal with negative people?‏',
     '**CutTweet** |   A word you feel shy if you were told?‏',
     '**CutTweet** |   Your body is older than your age or vice versa ?!‏',
     '**CutTweet** |   The Hardest lie you walked around?‏',
     '**CutTweet** |   Are you affected by the tears of someone crying in front of you before you know the reason?‏',
     '**CutTweet** |   Have you ever sacrificed for someone you loved?‏',
     '**CutTweet** |   Most recently used app?‏',
     '**CutTweet** |   What satisfies you most if you get upset without thinking?‏',
     '**CutTweet** |   What do you need to be happy?‏',
     '**CutTweet** |  Your only request then?‏',
     '**CutTweet** |  Have you ever felt like you committed a sin while fasting?‏',
]
 
 client.on('message', message => {
   if (message.content.startsWith("d+cuttweet")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('BLACK')
   .setThumbnail(message.author.avatarURL)
 .addField('CutTweet Game' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});

client.on('message', msg => {

  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  // Command that makes a 50/50 coin flip
  if (command === "coinflip") {
    const flip = ["**It's Tails!  **  ", "**It's Heads! **"];
    let randText = flip[Math.floor(Math.random() * flip.length)];
    let embedflip = new Discord.RichEmbed()
      .setTitle(`** ${randText} **`)
      .setAuthor(msg.author.username,msg.author.avatarURL)
      .setColor("#050505")
      .setThumbnail(msg.author.avatarURL)
      .setImage("https://cdn.discordapp.com/attachments/679923881292857345/698212130192752690/giphy.gif")
      .setTimestamp()
      .setFooter(msg.guild.name,msg.guild.iconURL)
      msg.channel.sendEmbed(embedflip)
    
  }
  
  // Command that acts as an eight ball
  if (command === "8ball") {
    const eightBall = [
      'It is certain',
      'It is decidedly so',
      'Without a doubt',
      'Yes definitely',
      'You may rely on it',
      'As I see it, yes',
      'Most likely',
      'Outlook good',
      'Yes',
      'Signs point to yes',
      'Reply hazy, try again',
      'Ask again later',
      'Better not tell you now',
      'Cannot predict now',
      'Concentrate and ask again',
      "Don't count on it",
      'My reply is no',
      'My sources say no',
      'Outlook not so good',
      'Very doubtful'];
    let randVal = eightBall[Math.floor(Math.random() * eightBall.length)];
    msg.channel.send(randVal);
  }
});

client.on('message' , message => {
  if(message.author.bot) return;
  if(message.content.startsWith(prefix + "xo")) {
 let array_of_mentions = message.mentions.users.array();
  let symbols = ['<:o_o:777408915352453122>', '<:x_x:777409619063996436>']
  var grid_message;
 
  if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
    let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let random2 = Math.abs(random1 - 1);
    if (array_of_mentions.length == 1) {
      random1 = 0;
      random2 = 0;
    }
    var player1_id = message.author.id
    let player2_id = array_of_mentions[random2].id;
    var turn_id = player1_id;
    var symbol = symbols[0];
    let initial_message = `The Game Between : <@${player1_id}> and <@${player2_id}>!`;
    if (player1_id == player2_id) {
      initial_message += '\n_(you lose, Play with ur self :joy:)_'
    }
    message.channel.send(`Xo ${initial_message}`)
    .then(console.log("Successful tictactoe introduction"))
    .catch(console.error);
    message.channel.send(':one::two::three:' + '\n' +
                         ':four::five::six:' + '\n' +
                         ':seven::eight::nine:')
    .then((new_message) => {
      grid_message = new_message;
    })
    .then(console.log("Successful tictactoe game initialization"))
    .catch(console.error);
    message.channel.send('Loading... Please wait for the :ok: reaction.')
    .then(async (new_message) => {
      await new_message.react('1⃣');
      await new_message.react('2⃣');
      await new_message.react('3⃣');
      await new_message.react('4⃣');
      await new_message.react('5⃣');
      await new_message.react('6⃣');
      await new_message.react('7⃣');
      await new_message.react('8⃣');
      await new_message.react('9⃣');
      await new_message.react('🆗');
      await new_message.edit(`It\'s <@${turn_id}>\'s turn! The symbol is ${symbol}`)
      .then((new_new_message) => {
        require('./xo.js')(client, message, new_new_message, player1_id, player2_id, turn_id, symbol, symbols, grid_message);
      })
      .then(console.log("Successful tictactoe listeprefix initialization"))
      .catch(console.error);
    })
    .then(console.log("Successful tictactoe react initialization"))
    .catch(console.error);
  }
  else {
    message.channel.send(`Try ${prefix}xo @user`)
    .then(console.log("Successful error reply"))
    .catch(console.error);
  }
}
 });
client.on('message', message => {
    if(message.content.startsWith("d+slots")) {
      let slot1 = ['💛', '💚', '💙', '💜'];
      let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
      let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
      let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
      let we;
      if(slots1 === slots2 && slots2 === slots3) {
        we = "**You Win!** <a:696611299144106154:696611299144106154>"
      } else {
        we = "**You Lose!** <a:696611329955463208:696611329955463208>"
      }
      let embedcasi = new Discord.RichEmbed()
      .setTitle(`${we}`)
      .setAuthor(message.author.username,message.author.avatarURL)
      .setColor("#050505")
      .setDescription(`** ${slots1}|━━━━━━━━|${slots2}|━━━━━━━━|${slots3} **`)
      .setImage("https://cdn.discordapp.com/attachments/696599357402906685/715438230128033832/divider.gif")
      .setThumbnail(message.author.avatarURL)
      .setTimestamp()
      .setFooter(message.guild.name,message.guild.iconURL)
      message.channel.sendEmbed(embedcasi)
    }
    });
const Sra7a = [
     '**Truth**  |   Your voice is sweet?',
     '**Truth**  |   You met people with two faces?',
     '**Truth**  |   Something and you check tongue?',
     '**Truth**  |   Am I a weak person when?',
     '**Truth**  |   Do you want to show your love and elbow to someone or see this weakness?',
     '**Truth**  |   Show that lying times are necessary.',
     '**Truth**  |   I feel lonely though I surround you so much?',
     '**Truth**  |   How to reveal who lies to you?',
     '**Truth**  |   If someone tries to hate him to approach you and take care of you, give him a chance?',
     '**Truth**  |   The bravest thing sweet in your life? ',
     '**Truth**  |   A good way persuades even if the idea is wrong. "Agree?',
     '**Truth**  |   How do you behave with those who misunderstand you, take their minds, and then wait for them to refuse?',
     '**Truth**  |   Ordinary change when the person he loves?',
     '**Truth**  |   Difficult situations weaken you and do not lift?',
     '**Truth**  |   A look and spoil the friendship?',
     '**Truth**  |   Someone with you sweet and bitter?',
     '**Truth**  |   Take the words of those who advise you and do not settle what you want?',
     '**Truth**  |   What do you wish people to know about you?',
     '**Truth**  |   Sell the galaxy for ?',
     '**Truth**  |   Sometimes I feel like people, complete?',
     '**Truth**  |   With who do you sleep today?',
     '**Truth**  |   The coincidence of sweet old is that I?',
     '**Truth**  |   Great hate Dame comes after a strong love "agree?',
     '**Truth**  |   Attribute you like in yourself?',
     '**Truth**  |   Do you pray all five prayers?',
     '**Truth**  |   Bravest thing sweet in your life?',
     '**Truth**  |   What do you intend to settle today?',
     '**Truth**  |   What do you feel when you see the rain?',
     '**Truth**  |   Do you change this guide and not solve problems?',
     '**Truth**  |   What do we most addicted to?',
     '**Truth**  |   Which countries do you wish to visit?',
     '**Truth**  |   When was the last time you cried?',
     '**Truth**  |   Evaluate your luck? Of 10?',
     '**Truth**  |   Do you think you have a bad luck?',
     '**Truth**  |   A person you wish to take revenge on?',
     '**Truth**  |   A word you want to hear every day?',
     '**Truth**  |   Are you perfect at work or bored?',
     '**Truth**  |   Did you impersonate a person to lie to those around you?',
     '**Truth**  |   When was the last time you made a major problem and caused losses?',
     '**Truth**  |   What is the worst news you`ve ever heard in your life?',
     '**Truth**  |   Have you ever hurt someone you love?',
     '**Truth**  |   What do you like to stay away from?',
     '**Truth**  |   Do you love your family or hate them?',
     '**Truth**  |   Have you been ashamed of yourself before?',
     '**Truth**  |   What is a dream that you could not achieve?',
     '**Truth**  |   What is your dream every night?',
     '**Truth**  |   Did you get into an embarrassing situation that made you hate your friend?',
	   '**Truth**  |   Did you cry in front of your loved one?',
     '**Truth**  |   What do you choose your lover or your friend?',
     '**Truth**  |   Is your life happy or sad?',
     '**Truth**  |   What is the most beautiful year you lived in your life?',
     '**Truth**  |   what is your real age?',
     '**Truth**  |   What more did you regret it?',
	   '**Truth**  |   What are your future wishes?',
	   '**Truth**  |   Do you love a girl or liked it before?',
	   '**Truth**  |   Are you looking sweet, good, medium or bad?',
	   '**Truth**  |   What subject do you like and prefer the most?',
	   '**Truth**  |   Do you like your school?',
	   '**Truth**  |   What do you hope will happen?',
	   '**Truth**  |   Do you love your family?',
]
   client.on('message', message => {
       if (message.author.bot) return;
 if (message.content.startsWith('d+truth')) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
  .setThumbnail("https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png")
  .setTitle("Truth Game...")
  .setColor('BLACK')
  .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)

   message.channel.sendEmbed(client);
   message.react("❔")
 }
});
client.on('message', message => {
    if (message.content == "d+fkk") {
        var x = ["Kill",
"School",
"House",
"Love",
"Football",
"Summer",
"Google",
"antiestablishmentarianism",
"DAJJAL",
"Server",
];
        var x2 = ['K i l l',
        "S c h o o l",
        "H o u s e",
        "L o v e ه",
"F o o t b a l l",
"S u m m e r",
"G o o g l e",
"a n t i e s t a b l i s h m e n t a r i a n i s m",
"D A J J A L",
"S e r v e r",
     ];
        
        var x3 = Math.floor(Math.random()*x.length)
        message.channel.send(`  Disassemble
\`Don't Forget The first letter should be Capital\`
 :  __**${x[x3]}**__
You Have 20 seconds`).then(msg1=> {
            var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
                maxMatches : 1,
                time : 20000,
                errors : ['time']
            })
        r.catch(() => {
            return message.channel.send(`:negative_squared_cross_mark: The time is up and no one has answered correctly
            The correct answer is __**${x2[x3]}**__`)
        })
        
        r.then((collected)=> {
            message.channel.send(`${collected.first().author} You have taken apart a word at a convenient time`);
        })
        })
    }
})

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
  if(!message.channel.guild) return message.reply('** This command only for servers **')
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    if (command === "kill"){

   var sabotage = message.mentions.users.first();
   if(sabotage == message.author)return message.reply(`**Suicide not good , i swear**`);
    if(sabotage === client.user) return message.reply(`** You want to kill me **`);
  if (sabotage < 1) {
    message.delete();
    return message.channel.sendMessage('Put something to kill, like mentioning a user, or using an emoji');
  }
  if (!sabotage) return message.channel.send(`Please Mention A Member to Kill :warning:`)
  message.channel.send("▄︻̷̿┻̿═━一 ${sabotage")
  .then(msg =>{
  msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :three:`);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :two:`);
  }, 2000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 ${sabotage} :one:`);
  }, 3000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :boom:`);
  }, 4000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :fire:`);
  }, 5000);
  setTimeout(function() {
    msg.edit(`▄︻̷̿┻̿═━一 :skull:`);
  }, 6000);
  msg.delete(7000)
  message.delete()
  })
  message.channel.send("**🕳 The crime was successfully hidden**").then(msg => msg.delete(8000));
    }
});
client.on('message', message => {
    if (message.content.startsWith("d+hack")) {
        if(!message.author.id === '') return;
      if (message.author.bot) return
      function randomem() {
let email = '';
const ReBeL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._';
for (let i = 0; i < 5; i++) email += ReBeL.charAt(Math.floor(Math.random() * ReBeL.length));
return email;
}
function randompass() {
let pass = '';
const CoDeS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 8; i++) pass += CoDeS.charAt(Math.floor(Math.random() * CoDeS.length));
return pass;
}
           const random1 = randomem();
           const random2 = randompass();
             let args = message.content.split(' ').slice(1);
 
                   let virusname = args.join(' ');
                 if (virusname < 1) {
                     return message.channel.send("> ```Woaaah slow down, who are we hacking?```");
                 }
                 message.channel.send({embed: new Discord.RichEmbed().setTitle('Loading ' + virusname + "...").setColor("#050505")}).then(function(m) {
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓ ] 1%').setColor("#050505")})
             }, 1000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓ ] 2%').setColor("#050505")})
             }, 2000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓ ] 3%').setColor("#050505")})
             }, 3000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓ ] 4%').setColor("#050505")})
             }, 4000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓ ] 20%').setColor("#050505")})
             }, 5000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 30%').setColor("#050505")})
             }, 6000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 40%').setColor("#050505")})
             }, 7000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 50%').setColor("#050505")})
             }, 8000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 70%').setColor("#050505")})
             }, 9000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 85%').setColor("#050505")})
             }, 10000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 90%').setColor("#050505")})
             }, 11000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 95%').setColor("#050505")})
             }, 12000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 96%').setColor("#050505")})
             }, 13000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 97%').setColor("#050505")})
             }, 14000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 98%').setColor("#050505")})
             }, 15000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']:' + virusname + 'done it\'s going good 100.9%').setColor("#050505")})
             }, 18000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Be hacked ').setColor("#050505")})
             }, 19000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Simple update\n' + virusname + ".key").setColor("#050505")})
             }, 22000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Please wait 5 second ...').setColor("#050505")})
             }, 25000)
               setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Please wait 4 second ...').setColor("#050505")})
             }, 26000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Please wait 3 second ...').setColor("#050505")})
             }, 27000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Please wait 2 second ...').setColor("#050505")})
             }, 28000)
                setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Please wait 1 second ...').setColor("#050505")})
             }, 29000)
             setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 99%').setColor("#050505")})
           }, 30000)
              setTimeout(function() {
               m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓]100% virus added').setColor("#050505")})
           }, 31000)
              setTimeout(function() {
               m.delete()
           }, 32000)
             setTimeout(function() {               
message.channel.send(`
Finished hacking ${virusname}
\`Result of The hack operation\`
Email : **${random1}@gmail.com**
Password : **${random2}**
`)
           }, 33000)
           });
         }
})


///////////////////////////////////////////////////////////////////////////////////////////////
let cmds = {
  play: { cmd: "play", a: ["p"] },
  skip: { cmd: "skip", a: ["s"] },
  stop: { cmd: "stop" },
  pause: { cmd: "pause" },
  resume: { cmd: "resume", a: ["r"] },
  volume: { cmd: "volume", a: ["vol"] },
  queue: { cmd: "queue", a: ["q"] },
  repeat: { cmd: "repeat", a: ["re"] },
  forceskip: { cmd: "forceskip", a: ["fskip"] },
  skipto: { cmd: "skipto", a: ["st"] },
  nowplaying: { cmd: "Nowplaying", a: ["np"] }
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

Object.keys(cmds).forEach(key => {
  var value = cmds[key];
  var command = value.cmd;
  client.commands.set(command, command);

  if (value.a) {
    value.a.forEach(alias => {
      client.aliases.set(alias, command);
    });
  }
});

let active = new Map();

client.on("warn", console.warn);

client.on("error", console.error);

client.on("ready", () => {
  console.log(`on`);
  console.log(`Guilds: ${client.guilds.size}`);
  console.log(`Users: ${client.users.size}`);
});

client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

  let cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  let s;

  if (cmd === "play") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        `:no_entry_sign: You must be listening in a voice channel to use that!`
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        `:no_entry_sign: I can't join Your voiceChannel because i don't have ` +
          "`" +
          "`CONNECT`" +
          "`" +
          ` permission!`
      );
    }

    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        `:no_entry_sign: I can't SPEAK in your voiceChannel because i don't have ` +
          "`" +
          "`SPEAK`" +
          "`" +
          ` permission!`
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(`Added to queue: ${playlist.title}`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(args, 1);

          // eslint-disable-next-line max-depth
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(" <:DBot:718240829034070058> **Sorry , I can't find any thing**");
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }

    async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = active.get(msg.guild.id);

      //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));

      let hrs =
        video.duration.hours > 0
          ? video.duration.hours > 9
            ? `${video.duration.hours}:`
            : `0${video.duration.hours}:`
          : "";
      let min =
        video.duration.minutes > 9
          ? `${video.duration.minutes}:`
          : `0${video.duration.minutes}:`;
      let sec =
        video.duration.seconds > 9
          ? `${video.duration.seconds}`
          : `0${video.duration.seconds}`;
      let dur = `${hrs}${min}${sec}`;

      let ms = video.durationSeconds * 1000;

      const song = {
        id: video.id,
        title: video.title,
        duration: dur,
        msDur: ms,
        url: `https://www.youtube.com/watch?v=${video.id}`
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [], ////تعديل غير اساسي
          volume: 25, //// تعديل درجة الصوت الاساسية
          requester: msg.author,
          playing: true,
          repeating: false
        };
        active.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
          active.delete(msg.guild.id);
          return msg.channel.send(`I cant join this voice channel`);
        }
      } else {
        serverQueue.songs.push(song);

        if (playlist) return undefined;
        if (!args) return msg.channel.send("no results.");
        else
          return msg.channel
            .send(":watch: Loading... [`" + args + "`]")
            .then(m => {
              setTimeout(() => {
                //:watch: Loading... [let]
                m.edit(
                  `:notes: Added **${song.title}**` +
                    "(` " +
                    song.duration +
                    ")`" +
                    ` to the queue at position ` +
                    `${serverQueue.songs.length}`
                );
              }, 500);
            });
      }
      return undefined;
    }

    function play(guild, song) {
      const serverQueue = active.get(guild.id);

      if (!song) {
        serverQueue.voiceChannel.leave();
        active.delete(guild.id);
        return;
      }
      //console.log(serverQueue.songs);
      if (serverQueue.repeating) {
        console.log("Repeating");
      } else {
        serverQueue.textChannel.send(
          ":notes: Added **" +
            song.title +
            "** (`" +
            song.duration +
            "`) to begin playing."
        );
      }
      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
          //if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
          //else console.log(reason);
          if (serverQueue.repeating) return play(guild, serverQueue.songs[0]);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);
    }
  } else if (cmd === "stop") {
    if (msg.guild.me.voiceChannel !== msg.member.voiceChannel)
      return msg.channel.send(
        `You must be in ${msg.guild.me.voiceChannel.name}`
      );
    // if (!msg.member.hasPermission("ADMINISTRATOR")) {
    //    msg.react("❌");
    //    return msg.channel.send("You don't have permission `ADMINSTRATOR`");
    //  }
    let queue = active.get(msg.guild.id);
    if (queue.repeating)
      return msg.channel.send(
        "Repeating Mode is on, you can't stop the music, run `" +
          `${prefix}repeat` +
          "` to turn off it."
      );
    queue.songs = [];
    queue.connection.dispatcher.end();
    return msg.channel.send(
      ":notes: The player has stopped and the queue has been cleared."
    );
  } else if (cmd === "skip") {
    let vCh = msg.member.voiceChannel;

    let queue = active.get(msg.guild.id);

    if (!vCh)
      return msg.channel.send(
        "Sorry, but you can't because you are not in voice channel"
      );

    if (!queue) return msg.channel.send("No music playing to skip it");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip it, because repeating mode is on, run " +
          `\`${prefix}forceskip\``
      );

    // let req = vCh.members.size - 1;

    //if (req == 1) {
    msg.channel.send("**:notes: Skipped **" + args);
    return queue.connection.dispatcher.end("Skipping ..");
    // }

    // if (!queue.votes) queue.votes = [];

    // if (queue.votes.includes(msg.member.id))
    //  return msg.say(
    //    `You already voted for skip! ${queue.votes.length}/${req}`
    //  );

    //  queue.votes.push(msg.member.id);

    //  if (queue.votes.length >= req) {
    //     msg.channel.send("**:notes: Skipped **" + args);

    //     delete queue.votes;

    //     return queue.connection.dispatcher.end("Skipping ..");
    //   }
    //
    //  msg.channel.send(
    //  `**You have successfully voted for skip! ${queue.votes.length}/${req}**`
    // );
  } else if (cmd === "pause") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) {
      return msg.channel.send("No music playing to pause.");
    }

    if (!queue.playing)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let disp = queue.connection.dispatcher;

    disp.pause("Pausing..");

    queue.playing = false;

    msg.channel.send(
      ":notes: Paused " + args + ". **Type** `" + prefix + "resume` to unpause!"
    );
  } else if (cmd === "resume") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) return msg.channel.send(":notes: No music paused to resume.");

    if (queue.playing)
      return msg.channel.send(":notes: No music paused to resume.");

    let disp = queue.connection.dispatcher;

    disp.resume("Resuming..");

    queue.playing = true;

    msg.channel.send(":notes: Resumed.");
  } else if (cmd === "volume") {
    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send(
        ":notes: There is no music playing to set volume."
      );

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(":notes: You are not in my voice channel");

    let disp = queue.connection.dispatcher;

    if (isNaN(args[0])) return msg.channel.send(":notes: Numbers only!");

    if (parseInt(args[0]) > 100)
      return msg.channel.send("You can't set the volume more than **100**.");
    //:speaker: Volume changed from 20 to 20 ! The volume has been changed from ${queue.volume} to ${args[0]}
    msg.channel.send(
      ":loud_sound: Volume has been **changed** from (`" +
        queue.volume +
        "`) to (`" +
        args[0] +
        "`)"
    );

    queue.volume = args[0];

    disp.setVolumeLogarithmic(queue.volume / 100);
  } else if (cmd === "queue") {
    let queue = active.get(msg.guild.id);

    if (!queue)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let embed = new Discord.RichEmbed().setAuthor(
      `${client.user.username}`,
      client.user.displayAvatarURL
    );
    let text = "";

    for (var i = 0; i < queue.songs.length; i++) {
      let num;
      if (i > 8) {
        let st = `${i + 1}`;
        let n1 = Converter.toWords(st[0]);
        let n2 = Converter.toWords(st[1]);
        num = `:${n1}::${n2}:`;
      } else {
        let n = Converter.toWords(i + 1);
        num = `:${n}:`;
      }
      text += `${num} ${queue.songs[i].title} [${queue.songs[i].duration}]\n`;
    }
    embed.setDescription(`Songs Queue | ${msg.guild.name}\n\n ${text}`);
    msg.channel.send(embed);
  } else if (cmd === "repeat") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send("There is no music playing to repeat it.");

    if (queue.repeating) {
      queue.repeating = false;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`False`)"
      );
    } else {
      queue.repeating = true;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`True`)"
      );
    }
  } else if (cmd === "forceskip") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (queue.repeating) {
      queue.repeating = false;

      msg.channel.send("ForceSkipped, Repeating mode is on.");

      queue.connection.dispatcher.end("ForceSkipping..");

      queue.repeating = true;
    } else {
      queue.connection.dispatcher.end("ForceSkipping..");

      msg.channel.send("ForceSkipped.");
    }
  } else if (cmd === "skipto") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue.songs || queue.songs < 2)
      return msg.channel.send("There is no music to skip to.");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip, because repeating mode is on, run " +
          `\`${prefix}repeat\` to turn off.`
      );

    if (!args[0] || isNaN(args[0]))
      return msg.channel.send(
        "Please input song number to skip to it, run " +
          prefix +
          `queue` +
          " to see songs numbers."
      );

    let sN = parseInt(args[0]) - 1;

    if (!queue.songs[sN])
      return msg.channel.send("There is no song with this number.");

    let i = 1;

    msg.channel.send(
      `Skipped to: **${queue.songs[sN].title}[${queue.songs[sN].duration}]**`
    );

    while (i < sN) {
      i++;
      queue.songs.shift();
    }

    queue.connection.dispatcher.end("SkippingTo..");
  } else if (cmd === "Nowplaying") {
    let q = active.get(msg.guild.id);

    let now = npMsg(q);

    msg.channel.send(now.mes, now.embed).then(me => {
      setInterval(() => {
        let noww = npMsg(q);
        me.edit(noww.mes, noww.embed);
      }, 5000);
    });

    function npMsg(queue) {
      let m =
        !queue || !queue.songs[0] ? "No music playing." : "Now Playing...";

      const eb = new Discord.RichEmbed();

      eb.setColor(msg.guild.me.displayHexColor);

      if (!queue || !queue.songs[0]) {
        eb.setTitle("No music playing");
        eb.setDescription(
          "\u23F9 " + bar(-1) + " " + volumeIcon(!queue ? 100 : queue.volume)
        );
      } else if (queue.songs) {
        if (queue.requester) {
          let u = msg.guild.members.get(queue.requester.id);

          if (!u) eb.setAuthor("Unkown (ID:" + queue.requester.id + ")");
          else eb.setAuthor(u.user.tag, u.user.displayAvatarURL);
        }

        if (queue.songs[0]) {
          try {
            eb.setTitle(queue.songs[0].title);
            eb.setURL(queue.songs[0].url);
          } catch (e) {
            eb.setTitle(queue.songs[0].title);
          }
        }
        eb.setDescription(embedFormat(queue));
      }

      return {
        mes: m,
        embed: eb
      };
    }

    function embedFormat(queue) {
      if (!queue || !queue.songs) {
        return "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(100);
      } else if (!queue.playing) {
        return (
          "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(queue.volume)
        );
      } else {
        let progress = queue.connection.dispatcher.time / queue.songs[0].msDur;
        let prog = bar(progress);
        let volIcon = volumeIcon(queue.volume);
        let playIcon = queue.connection.dispatcher.paused ? "\u23F8" : "\u25B6";
        let dura = queue.songs[0].duration;

        return (
          playIcon +
          " " +
          prog +
          " `[" +
          formatTime(queue.connection.dispatcher.time) +
          "/" +
          dura +
          "]`" +
          volIcon
        );
      }
    }

    function formatTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }

    function bar(precent) {
      var str = "";

      for (var i = 0; i < 12; i++) {
        let pre = precent;
        let res = pre * 12;

        res = parseInt(res);

        if (i == res) {
          str += "\uD83D\uDD18";
        } else {
          str += "▬";
        }
      }

      return str;
    }

    function volumeIcon(volume) {
      if (volume == 0) return "\uD83D\uDD07";
      if (volume < 30) return "\uD83D\uDD08";
      if (volume < 70) return "\uD83D\uDD09";
      return "\uD83D\uDD0A";
    }
  }
});

var analyrics = require("analyrics"); //npm i analyrics
var hastebin = require('hastebin-gen'); //npm i hastebin-gen
analyrics.setToken("vQC2IQZ30BSOD664jJz7LKbUEy1It_qkNBWpCYR9WexY_xYhX0Tqzh4Y91dgT8eF");

client.on("message", async message => {
  if (message.content.startsWith("d+lyrics")) {
    let args = message.content.split(" ").slice(1).join(" ");
    analyrics.getSong(args, function (song) {
      hastebin(song.title, "txt").then(r => {
        message.channel.send(`${song.title} **Lyrics in hastebin** : 
[ ${r} ]`)
      }).catch(console.error);
      let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(`${song.lyrics}`)
        .setFooter(`**${song.title}` + " Song Lyrics**");
      message.channel.send(embed)
    });
  }
})

///////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help utility'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var utility = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:iko4:718237357031030825> : __Utility Help menu__**`)
         .setDescription(`
\`${prefix}server\` - server information ,
\`${prefix}user\` - user information ,
\`${prefix}bot\` - bot information ,
\`${prefix}avatar\` - show your pic
`)
.setColor("#050505")
msg.channel.sendEmbed(utility);

    }
});

client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help music'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var Music = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:Dnote:718237465214713939> __Music Help menu__**`)
         .setDescription(`
 \`${prefix}play\` or \`p <title|URL|subcommand>\` - : plays the provided song.

 \`${prefix}pause\` - : pauses the current song .

 \`${prefix}resume\` - : Complete the song.

 \`${prefix}leave\` or     \`lv\` - : stops the current song and leave the voice channel.

 \`${prefix}forceskip\` - : skip Direct the current song.

 \`${prefix}queue\` - : shows the current queue.

 \`${prefix}skipto\` : To skip the song to the next song in the next music queue.

 \`${prefix}skip\` : Skip to the next song.

 \`${prefix}volume\` or   \`vol\` - : sets or shows volume.

 \`${prefix}nowplaying\` or  \`np\`   - : shows the song that is currently playing.

 \`repeat\` - : Repeat the song.`)
.setColor("#050505")
msg.channel.sendEmbed(Music);

    }
});

client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help text'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var text = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:Dtext:718237351188627508> __Text Help menu__**`)
         .setDescription(`\`${prefix}tag\` ,\`${prefix}poll\` ,\`${prefix}say\`,\`${prefix}embed\`,\`${prefix}emoji \``)
.setColor("#050505")
msg.channel.sendEmbed(text);

    }
});
client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help fun'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var fun = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:DFun:718238908994945024> __Fun Help menu__**`)
         .setDescription(`\`${prefix}kiss\` ,\`${prefix}hug\` ,\`${prefix}love\`,\`${prefix}slap\`,\`${prefix}boom\`,
\`${prefix}drake <bad> <good>\``)
.setColor("#050505")
msg.channel.sendEmbed(fun);

    }
});

client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help economy'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var economy = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:Dcash:718237408696729650> __ Economy Help menu__**`)
         .setDescription(`\`${prefix}credits\` ,\`${prefix}daily\` ,
\`${prefix}credits <@mention> <amount>\` - to transfer credits
`)
.setColor("#050505")
msg.channel.sendEmbed(economy);

    }
});

client.on('message', msg => {
        
        var args = msg.content.split(" ").slice(1);
    if (msg.content === 'd+help games'){
        if(!msg.channel.guild) return msg.reply('** This command only for servers **');
         var Games = new Discord.RichEmbed() 
         .setThumbnail(client.user.avatarURL)
         .setTitle(`**<:DGame:718238909472964708> __Games Help menu__**`)
         .setDescription(`
 - \`${prefix}cuttweet\` - \`${prefix}coinflip\`   - \`${prefix}truth\`  - \`${prefix}8ball\` .  
 - \`${prefix}slots\` -  \`${prefix}kill\` -  \`${prefix}hack\` - \`${prefix}fkk\` - \`${prefix}xo\` .

`)
.setColor("#050505")
msg.channel.sendEmbed(Games);

    }
});
client.on('message' , message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "contact")) {
  if (!message.channel.guild) return;
  
  
  
  let args = message.content.split(" ").slice(1).join(" ");
  
  
  
  client.users.get("579794073976569888").send(
      "\n" + "**__" + "● Server :" + "__**" +
      "\n" + "\`" + "» " + message.guild.name + "\`" +
      "\n" + "**__" + " ● Sender : " + "__**" +
      "\n" + "\`" + "» " + message.author.tag + "\`" +
      "\n" + "**__" + " ● Message : " + "__**" +
      "\n" + "\`" + args + "\`")
  
  let embed = new Discord.RichEmbed()
       .setAuthor(message.author.username, message.author.avatarURL)
       .setDescription('**The message was successfully sent to the owner of the bot** 📬')
       .setThumbnail(message.author.avatarURL)
       .setFooter("Dabot | Contact")
                                                  
  
  message.channel.send(embed);
  
  
  }
      
  });
/////////////////////////////////////////////////////////////////////////////////////////////weather
const weather = require('weather-js');//npm install weather-js
client.on('message', message => {
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    if (message.content.startsWith(prefix + 'weather')) {
 
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);
 
 
            var current = result[0].current;
            var location = result[0].location;
 
 
            const embed = new Discord.RichEmbed()
.setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("BLACK")
                .addField('Timezone',`UTC${location.timezone}`, true)
                .addField('Degree Type',location.degreetype, true)
                .addField('Temperature',`${current.temperature} Degrees`, true)
                .addField('Feels Like', `${current.feelslike} Degrees`, true)
                .addField('Winds',current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
 
 
                message.channel.send({embed});
        });
    }
 
});
/////////////////////////////////////////////////////////////////////////////////////////////memey
const got = require("got");
client.on('message', message => {
  
 if (message.content === prefix + "meme") {
    const embed = new Discord.RichEmbed();
    got("https://www.reddit.com/r/meme/random/.json")
      .then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
        embed.setImage(memeImage)
      embed.setColor("#ffffff")
        embed.setFooter(
          `❤️ ${memeUpvotes} 💬 ${memeNumComments}`
        );
        message.channel
          .send(embed)
          .then(sent => console.log(`Sent a reply to ${sent.author.username}`));
        console.log("Bot responded with: " + memeImage);
      })
      .catch(console.error);
  }

})



client.on("message", async m =>{
  if(m.author.bot || !m.guild) return;
  var args = m.content.split(" ");
  var command = args[0].slice(prefix.length);
  if(!m.content.startsWith(prefix)) return;
  var all = ["-"]
  switch (command) {
    case 'drake':
      if(!args[1] && !args[2]) return m.channel.send(new Discord.RichEmbed().setDescription(`:x: Usage \`${prefix}drake <bad> <good>\``));
      if(!args[2]) return m.channel.send(new Discord.RichEmbed().setDescription(":x: Unable to resolve the ``good`` argument."));
      let canvas = Canvas.createCanvas(299, 291);
      const applybad = (canvas, text) => {const ctx = canvas.getContext("2d");let fontSize = 40;do {ctx.font = `${(fontSize -= 5)}px Comic SANS`;}while(ctx.measureText(text).width > canvas.width - 150);return ctx.font;};
      const applygood = (canvas, text) => {const ctx = canvas.getContext("2d");let fontSize = 40;do {ctx.font = `${(fontSize -= 5)}px Comic SANS`;}while(ctx.measureText(text).width > canvas.width - 150);return ctx.font;};
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/662049225944596512/667320767565922304/Drakeposting.jpg");
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  
      ///////////////////////////////////bad//////////////////////////////
      ctx.font = applybad(canvas,args[1].split("-").join(" "));
      ctx.fillText(args[1].split("-").join(" "), 225, 80.8333333333);
      ////////////////////////////good///////////////////
      ctx.font = applygood(canvas,args[2].split("-").join(" "));
      ctx.fillText(args[2].split("-").join(" "), 225, 225);
      const attachment = new Discord.Attachment(canvas.toBuffer());
      m.channel.send(attachment);
      break
  }
});