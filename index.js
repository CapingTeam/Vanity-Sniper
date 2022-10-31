const discord = require('discord.js')
const client = new discord.Client({intents: new discord.Intents(32767)})

const Color = require('sync-color')
Color.init()
const consolecolor = Color.InitGradient(["#00ff08", "#91ff00", "#00ff88"])

const request = require('request')

const { guildid, token, url } = require('./config')


if (!token) throw new TypeError("Place your token or bot token in the config file")
if (!guildid) throw new TypeError("Place the ID of the guild in the config file")
if (!url) throw new TypeError("Put the last part of the vanity in the config file")
if (url.includes("discord.gg/") || url.includes(".gg/") || url.includes("/")) throw new TypeError("The URL in the config file must not contain 'discord.gg/'")

client.login(token)

client.on('ready', () => {
    console.clear()
    console.log(consolecolor(`

    ██▒   █▓ ▄▄▄       ███▄    █  ██▓▄▄▄█████▓▓██   ██▓     ██████  ███▄    █  ██▓ ██▓███  ▓█████  ██▀███  
    ▓██░   █▒▒████▄     ██ ▀█   █ ▓██▒▓  ██▒ ▓▒ ▒██  ██▒   ▒██    ▒  ██ ▀█   █ ▓██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒
     ▓██  █▒░▒██  ▀█▄  ▓██  ▀█ ██▒▒██▒▒ ▓██░ ▒░  ▒██ ██░   ░ ▓██▄   ▓██  ▀█ ██▒▒██▒▓██░ ██▓▒▒███   ▓██ ░▄█ ▒
      ▒██ █░░░██▄▄▄▄██ ▓██▒  ▐▌██▒░██░░ ▓██▓ ░   ░ ▐██▓░     ▒   ██▒▓██▒  ▐▌██▒░██░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  
       ▒▀█░   ▓█   ▓██▒▒██░   ▓██░░██░  ▒██▒ ░   ░ ██▒▓░   ▒██████▒▒▒██░   ▓██░░██░▒██▒ ░  ░░▒████▒░██▓ ▒██▒
       ░ ▐░   ▒▒   ▓▒█░░ ▒░   ▒ ▒ ░▓    ▒ ░░      ██▒▒▒    ▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒ ░▓  ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░
       ░ ░░    ▒   ▒▒ ░░ ░░   ░ ▒░ ▒ ░    ░     ▓██ ░▒░    ░ ░▒  ░ ░░ ░░   ░ ▒░ ▒ ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░
         ░░    ░   ▒      ░   ░ ░  ▒ ░  ░       ▒ ▒ ░░     ░  ░  ░     ░   ░ ░  ▒ ░░░          ░     ░░   ░ 
          ░        ░  ░         ░  ░            ░ ░              ░           ░  ░              ░  ░   ░     
         ░                                      ░ ░                                                         
    `))

})


client.on('ready', () => {



    setInterval(() => {
        const guild = client.guilds.cache.get(guildid)
        if (!guild) throw new TypeError("No guild found...")
        if (guild.vanityURLCode === url){
            console.log(consolecolor("[+] The guild has now your vanity URL"))
            process.exit(1)
        }

        const settings = {
            url: `https://discord.com/api/v6/guilds/${guildid}/vanity-url`,
            body: {
              code: url
            },
            json: true,
            method: 'PATCH',
            headers: {
              "Authorization": `Bot ${token}`
            }
          };
    
          request(settings, (err, res, body) => {
            if (err) {
            }
          });     
    }, 1);



})