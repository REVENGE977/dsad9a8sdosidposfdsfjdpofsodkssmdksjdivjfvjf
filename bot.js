const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "%";
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});




client.on('message', message => {
    if (message.content.startsWith(prefix + "help")) {
let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.addField('     **%mute** ' ,' **Tempmute** ')
.addField('     **%unmute** ' ,' **UnMute a Member** ')
.addField('     **%ban**  ' ,' **tempbanned some one** ')
.addField('     **%bc**  ' ,' **Broadcast** ')
.addField('     **%kick** ' , '**Kick someone**')
.addField('     **%prune** ' , '**Clear the chat**')
.addField('     **%addrole** ' ,' **Give SomeOne a Role**')
.addField('     **%removerole** ' ,' **Remove a Role of a Person**')
.addField('     **%report** ' ,' **Report SomeOne Require reports chat**')
.addField('     **%say ** ' ,' **Reapet Your Text** ')
.setColor('#7d2dbe')
message.channel.sendEmbed(embed);
}
});


const mmss = require('ms');
client.on('message', async message => {
    var moment = require('moment');
    let date = moment().format('Do MMMM YYYY , hh:mm');
    let User = message.mentions.users.first();
    let Reason = message.content.split(" ").slice(3).join(" ");
    let messageArray = message.content.split(" ");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "ban")) {
       if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**- ما معك برمشن**");
       if(!User) message.channel.send("**- Could not find that user**");
       if(User.id === client.user.id) return message.channel.send("**- You cant banned the bot**");
       if(User.id === message.guild.owner.id) return message.channel.send("**- You cant banned the ownership**");
       if(!time) return message.channel.send("**- Type the ban time**");
       if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- Error in the banned time :/**');
       if(!Reason) message.channel.send("**- Type the reason**");
       
       
       
              let bannedEmbed = new Discord.RichEmbed()
       .setColor("#bc0000")
       .setDescription("» New Banned User «")
       .setAuthor(`You have been banned from ${message.guild.name} !`)
       .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
       .addField('- Banned By: ',message.author.tag,true)
       .addField('- Reason:',Reason,true)
       .addField('- Date & Time :',date,true)
       .addField('- Banned Time:',time,true)
       .addField('- Server Link: https://discord.gg/kjaJGvh')
       .setFooter(message.author.tag,message.author.avatarURL);
       User.sendMessage({embed: bannedEmbed}).then(() => message.guild.member(User).ban({reason: Reason}))
       .then(() => message.channel.send(`**# Done! I banned: ${User}**`)).then(() => { setTimeout(() => {
           message.guild.unban(User);
       }, mmss(time));
       
       let banEmbed = new Discord.RichEmbed()
       .setDescription("» New banned user ! «")
       .setColor("#bc0000")
       .addField("Banned User", `${User} with ID ${User.id}`)
       .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
       .addField("Banned In", message.channel)
       .addField("Time", message.createdAt)
       .addField("Reason", Reason);
       let incidentchannel = message.guild.channels.find(`name`, "incidents");
       if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
       
        client.users.get(User.id).send('https://discord.gg/kjaJGvh')
        incidentchannel.send(banEmbed);
    });
   }
});



client.on("message", message => {
    if (message.author.bot) return;
        let User = message.mentions.users.first();
    let muteRole = message.guild.roles.find("name", "Muted");
    let command = message.content.split(" ")[0];

    if (command === prefix + "unmute") {
      
        if(!User) return message.channel.send("Usage: %unmute [User].");
      if(!message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('**You don’t have `MANAGE_ROLES_OR_PERMISSIONS` permissions**');
    let modlog = client.channels.find('name', 'incidents');


    if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('** The Bot dont have the Manage Roles permissions **').catch(console.error);

    if (message.guild.member(User).removeRole(muteRole.id)) {
  return message.reply("**:white_check_mark: .. Done Unmuted ! **").catch(console.error);
  } else {

  let mutedEmbed = new Discord.RichEmbed()
.setDescription("» New UnMute User «")
.setColor("#bc0000")
.addField("Unmuted", `${User} with ID ${User.id}`)
.addField("Unmuted By", `<@${message.member.id}> with ID ${message.member.id}`)
.addField("In Channel", message.channel)
let incidentchannel = message.guild.channels.find(`name`, "incidents");
if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
incidentchannel.send(mutedEmbed);
  
    }

  };
  });


  const  child_process  =  require("child_process");
    client.on('ready'  ,  function  (){
var  time  =  7200000;
client.setInterval(function()  {
        client.destroy();
                child_process.fork(__dirname  +  "/help.js");
    },  time);
});



client.on('message', message => {
              if(!message.channel.guild) return;
    if(message.content.startsWith('%bc')) {
    if(!message.channel.guild) return message.channel.send('** This Command For Servers Only **').then(m => m.delete(5000));
  if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You Dont Have ** `ADMINISTRATOR`' );
    let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
    let copy = "Andro Bot";
    let request = `Requested By ${message.author.username}`;
    if (!args) return message.reply('**Send The Message after Typing The Command**');message.channel.send(`**Are You Sure To Send This Broadcast ? \nBroadcast Content:** \` ${args}\``).then(msg => {
    msg.react('✅')
    .then(() => msg.react('❌'))
    .then(() =>msg.react('✅'))







    let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
    let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
       let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
    let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
    reaction1.on("collect", r => {
    message.channel.send(`☑ |   ${message.guild.members.size} Now Send Broadcast For The Members `).then(m => m.delete(5000));
    message.guild.members.forEach(m => {
    var bc = new
       Discord.RichEmbed()
       .setColor('RANDOM')
       .setTitle('Broadcast') .addField('Server', message.guild.name) .addField('Send By', message.author.username)
       .addField('Message', args)
       .setThumbnail(message.author.avatarURL)
       .setFooter(copy, client.user.avatarURL);
    m.send({ embed: bc })
    msg.delete();
    })
    })
    reaction2.on("collect", r => {
    message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
    msg.delete();
    })
    })
    }
    })
    
    
    client.on('message', message => {
          let args = message.content.split(' ').slice(1);
   if(message.content.split(' ')[0] == '%color'){
           const embedd = new Discord.RichEmbed()
     .setFooter('Requested by '+message.author.username, message.author.avatarURL)
   .setDescription(`**لا يوجد لون بهذا الأسم ** :x: `)
   .setColor(`ff0000`)
 
    if(!isNaN(args) && args.length > 0)
   
 
if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
 
 
       var a = message.guild.roles.find("name",`${args}`)
                if(!a)return;
const embed = new Discord.RichEmbed()
                   
     .setFooter('Requested by '+message.author.username, message.author.avatarURL)
   .setDescription(`**Done , تم تغير لونك . :white_check_mark: **`)
 
   .setColor(`${a.hexColor}`)
  message.channel.sendEmbed(embed);
          if (!args)return;
setInterval(function(){})
                  let count = 0;
                  let ecount = 0;
        for(let x = 1; x < 201; x++){
           
            message.member.removeRole(message.guild.roles.find("name",`${x}`))
         
            }
                message.member.addRole(message.guild.roles.find("name",`${args}`));
       
           
    }
});
client.on('message', ra3d => {
 
  if (ra3d.content ===  prefix + 'cc'){
              if (!ra3d.member.hasPermission('MANAGE_ROLES')) return ra3d.channel.sendMessage('`**⚠ | `[MANAGE_ROLES]` لا يوجد لديك صلاحية**');
              ra3d.channel.send("**✅ | يتم عمل الالوان**");
                  setInterval(function(){})
                    let count = 0;
                    let ecount = 0;
          for(let x = 1; x < 141; x++){
            ra3d.guild.createRole({name:x,
              color: 'RANDOM'})
              }
            }
       });





client.login(process.env.BOT_TOKEN)
