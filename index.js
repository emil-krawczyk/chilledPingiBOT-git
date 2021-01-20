const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const token = config.token
const status = config.status
const command = require('./command')
const logChannelID = `798583490970124318`
const muteRoleID = `797868333965246535`

const missingPermissions = new Discord.MessageEmbed().setTitle('🛑 MISSING PERMISSIONS').setDescription(`You don't have sufficient permissions to do this.`).setColor('YELLOW').setFooter('PingiBOT')


client.on('ready', () => {
    console.log('Client is ready')

    client.user.setActivity(status);

    command(client, '&ban', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)

            const channel = member.guild.channels.cache.get(logChannelID);
    
            const banEmbed = new Discord.MessageEmbed()
            .setTitle('🔨 BANNED')
            .setDescription(`${targetMember} has been banned.`)
            .setColor('#EBC91E')
            .setFooter('Server Administration')

            targetMember.ban()

            message.channel.send(`✅ ${targetMember} has been succesfully banned.`)
	        channel.send(banEmbed);
            
          } else {
            message.channel.send(`❗ Please specify user to ban.`)
          }
        } else {

          message.channel.send(missingPermissions)
        }
      })

      command(client, '&mute', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)

            const channel = member.guild.channels.cache.get(logChannelID);

            const muted = member.guild.roles.cache.get(muteRoleID)
    
            const muteEmbed = new Discord.MessageEmbed()
            .setTitle('Ooops!')
            .setDescription(`${targetMember} has been muted.`)
            .setColor('#EBC91E')
            .setFooter('Server Administration')
            
            targetMember.roles.add(muted)

            message.channel.send(`✅ Succesfully muted ${targetMember}.`)
	        channel.send(muteEmbed);
            
          } else {
            message.channel.send(`❗ Please specify user to mute.`)
          }
        } else {
          message.channel.send(missingPermissions)
        }
      })

      command(client, '&unmute', (message) => {
        const { member, mentions } = message
    
        const tag = `<@${member.id}>`
    
        if (
          member.hasPermission('ADMINISTRATOR') ||
          member.hasPermission('BAN_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)

            const channel = member.guild.channels.cache.get('798582825212706857');

            const muted = member.guild.roles.cache.get('781072460254150686')

            targetMember.roles.remove(muted)

            message.channel.send(`✅ Succesfully unmuted ${targetMember}.`)
            
          } else {
            message.channel.send(`❗ Please specify user to unmute.`)
          }
        } else {
          message.channel.send(missingPermissions)
        }
      })
})

command(client, '&ping', message => {
    message.channel.send('Pong!')
})

command(client, '&help', message => {
    const author = message.author.username
    const helpEmbed = new Discord.MessageEmbed()
    .setTitle('COMMAND LIST')
    .setDescription('1. `&shaggy` or `&kudłacz` - get a funny shaggy picture. \n 2. `&słoniu` or `&elephant` - get a funny elephant picture. \n 3. `&kazoo` or `kazoo` - get a funny kazoo-duck picture. \n 4. `&unicorn` or `unicorn` - get a funny unicorn picture. \n More commands for users is coming soon. \n © 2021 by @emil.krawczyk™#1875.')
    .setFooter(`PingiBOT | Requested by: ${author}.`)
    .setColor('YELLOW')

    message.channel.send(helpEmbed)
})

command(client, [ '&słoniu', '&elephant'] , message => {
  message.channel.send('https://images-ext-1.discordapp.net/external/eCgNrRgTQR-RiWA_mck8CeUZ4gFJt4CKvM_NCGESSlE/https/media.discordapp.net/attachments/773491441434492939/779291934078140428/IMG_20201118_105243.png?width=637&height=473')
})

command(client, [ '&kudłacz', '&shaggy' ] , message => {
  message.channel.send('https://images-ext-2.discordapp.net/external/dk6ceHtD-57CkrJUuaCBa0sCjb_qOhscfiXI5Dk_46Y/%3Fwidth%3D492%26height%3D475/https/media.discordapp.net/attachments/773491441434492939/780398845715677224/shaggy.jpg?width=490&height=473')
})

command(client, [ '&kazoo', 'kazoo' ]  , message => {
  message.channel.send('https://media.discordapp.net/attachments/773491441434492939/800990828843106335/Stickers_Marching_Ducks_Kazoo_Ducky.png')
})

command(client, [ '&unicorn', 'unicorn' ], message => {
  message.channel.send('https://cdn.discordapp.com/attachments/773491441434492939/800991537051074560/Stickers_Unicorns_Gallop.png')
})

client.on("message", msg => {
  const { author, guild, content} = msg

  if(msg.author.bot) return;

  if (content.toLowerCase().startsWith('xd') || content.toLowerCase() === 'xd') {
    msg.channel.send("xDDDDD")}
});

client.on("message", msg => {

  const { author, guild } = msg

  if(msg.author.bot) return;

  if (msg.content.toLowerCase() === "yes") {
      msg.channel.send('no')
  }
})

client.on("message", msg => {

  const { author, guild } = msg

  if(msg.author.bot) return;

  if (msg.content.toLowerCase() === "no") {
      msg.channel.send('yes')
  }
})

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.get(logChannelID);
    if (!channel) return;
    
    const welcomeEmbed = new Discord.MessageEmbed()
    .setTitle('👋 Welcome')
    .setDescription(`Welcome, ${member}! \n Don't forget to accept our rules!`)
    .setColor('#EBC91E')
    .setFooter('Server Administration')

	channel.send(welcomeEmbed);
});

client.on('guildMemberRemove', async member => {
	const channel = member.guild.channels.cache.get(logChannelID);
    if (!channel) return;
    
    const byeEmbed = new Discord.MessageEmbed()
    .setTitle('[*]')
    .setDescription(`${member}! has left the server.`)
    .setColor('#EBC91E')
    .setFooter('Server Administration')

	channel.send(byeEmbed);
});

command(client, '&status', message => {
    const { member } = message
    const content = message.content.replace('&status ', '')

    if (member.hasPermission('ADMINISTRATOR')) {
        if (content === 'clear') {
            client.user.setActivity(status)
            message.channel.send(`Status has succesfully cleared.`)
        }

        else { if(content === 'hard-clear') {
            client.user.setActivity('')
            message.channel.send('Status has been succesfully deleted. Type `&status clear` to restore.')
        }
    else {
        client.user.setActivity(content)
        message.channel.send(`Status has been succesfully set to ${content}.`)
    }}}
    else {
        message.channel.send(missingPermissions)
    }


})

client.login(token)