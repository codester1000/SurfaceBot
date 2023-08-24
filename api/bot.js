/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
require("dotenv").config(); //to start process from .env file

const { Client, GatewayIntentBits, User, EmbedBuilder } = require("discord.js");
const { Routes } = require("discord-api-types/v9");
const { REST } = require("@discordjs/rest");
const { Configuration, OpenAIApi } = require("openai");

const mongoose = require("mongoose");
const UserData = require("../api/models/user");
const MessageData = require("../api/models/message");
const DiscordServerData = require("./models/discordserver");
const InvitesData = require("./models/invites");
const ChannelData = require("./models/channel");
const ReactionData = require("./models/reaction");
const { channel } = require("diagnostics_channel");

const dbURL = process.env.MONGODB_URL;
const token = process.env.TOKEN;
const openAIKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: openAIKey,
  //add this
});
const openai = new OpenAIApi(configuration);

// check if the message violates terms of service
async function moderateMessage(message) {
  try {
    const response = await openai.createModeration({
      input: message,
    });

    // Process the response and extract the moderation result
    const moderationResult = response.data;
    return moderationResult;
  } catch (error) {
    console.error("Error while sending message to OpenAI:", error);
    return {};
  }
}

// send to openAI to get the sentiment of the message
async function sentimentAnalysis(message) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a Discord message, and your task is to score its sentiment from 1-10.  \nIf the message is too short or incomplete, respond with a score of 5. ",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0,
      max_tokens: 24,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    var output = response.data.choices[0].message.content;
    output = output.split(": ");
    if (!output[1]) {
      return 5;
    }
    const sentimentScoreString = output[1];
    const sentimentScore = parseFloat(sentimentScoreString);

    // console.log(`Sentiment score is: ${sentimentScore}`)

    return sentimentScore;
  } catch (error) {
    console.error("Error while sending message to OpenAI:", error);
    return {};
  }
}

const client = new Client({
  // token: process.env.TOKEN,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildInvites,
  ],
});

const wait = require("timers/promises").setTimeout;

async function createMessageDatas(msg) {
  if (msg.author.bot) {
    return;
  }
  if (!msg.content) {
    return;
  }

  const userDataArray = [];

  const messageAdd = await UserData.findOneAndUpdate(
    { userID: msg.author.id.toString() },
    {
      $inc: { numberOfMessages: 1 },
      $push: { messages: msg.id.toString() },
    },
    { new: true }
  );

  const channelAddUp = await ChannelData.findOneAndUpdate(
    { channelID: msg.channelId.toString() },
    { $inc: { messagesSent: 1 }, $push: { messages: msg.id.toString() } },
    { new: true }
  );
  const serverAddUp = await DiscordServerData.findOneAndUpdate(
    { serverID: msg.guildId.toString() },
    { $inc: { messagesSent: 1 }, $push: { messages: msg.id.toString() } },
    { new: true }
  );

  const insertMessage = await MessageData.create({
    messageID: msg.id,
    messageContent: msg.content,
    channelID: msg.channelId,
    serverID: msg.serverId,
  });

  // message moderation before server info
  const flags = await moderateMessage(msg.content);
  var modFlag = false;
  if (flags.flagged) {
    const addUserFlag = await UserData.findOneAndUpdate(
      { userID: msg.author.id.toString() },
      { $push: { flags: msg.id } },
      { new: true }
    );

    const addServerFlag = await DiscordServerData.findOneAndUpdate(
      { serverID: msg.guildId.toString() },
      { $push: { flaggedMessages: msg.id } },
      { new: true }
    );

    modFlag = true;
    for (flag in flags) {
      var flagsString = "";
      if (flags[flag]) {
        if (flagsString === "") {
          flagsString = flag;
        } else {
          flagsString += ", " + flag;
        }
      }
    }
  } else {
    const sentiment = await sentimentAnalysis(msg.content);
    const addKarma = await MessageData.findOneAndUpdate(
      { messageID: msg.id },
      { $inc: { karma: sentiment, messageKarma: sentiment } },
      { new: true }
    );
    const addServerKarma = await DiscordServerData.findOneAndUpdate(
      { serverID: msg.guildId.toString() },
      { $inc: { karma: sentiment } },
      { new: true }
    );
    const addUserKarma = await UserData.findOneAndUpdate(
      { userID: msg.author.id.toString() },
      { $inc: { karma: sentiment } },
      { new: true }
    );
    const addChannelKarma = await ChannelData.findOneAndUpdate(
      { channelID: msg.channelId.toString() },
      { $inc: { karma: sentiment } },
      { new: true }
    );
  }

  if (modFlag) {
    const addFlags = await MessageData.findOneAndUpdate(
      { messageID: msg.id },
      {
        flagged: true,
        flags: flagsString,
        flagCategoryScores: flags.category_scores,
      },
      { new: true }
    );
  }
}

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await wait(100);

  client.guilds.cache.forEach(async (guild) => {
    // Fetch all Guild Invites
    const removeInvite = await InvitesData.deleteMany({
      serverID: guild.id.toString(),
    }).exec();
    const firstInvites = await guild.invites.fetch();
    const firstmembers = await guild.fetch();

    // maps all the invites and asigns them to the db
    firstInvites.map((invite) => {
      const addInvite = InvitesData.create({
        serverID: invite.guild.id,
        code: invite.code,
        uses: invite.uses,
        member: invite.inviterId,
      });
    });

    // Set the key as Guild ID, and create a map which has the invite code, and the number of uses
  });
});

client.on("messageCreate", async (msg) => {
  createMessageDatas(msg);
});

client.on("messageReactionAdd", async (reaction) => {
  // add karma to original message for message Karma
  console.log(
    `a reaction was added to ${reaction.message_id} by ${user.id} with ${reaction.emoji.name}`
  );

  const addReaction = await ReactionData.create({
    reactionID: `${reaction.emoji.name}-${reaction.message_id}-${reaction.user_id}`,
    messageID: reaction.message_id,
    userID: reaction.user_id,
    emoji: reaction.emoji.name,
    emojiID: reaction.emoji.id,
  });
  // get the message from db and add karma to both user and message
  // need to sentiment analysis on the emoji name to see if it is positive or negative
});

client.on("inviteDelete", async (invite) => {
  // Delete the Invite from Cache
  const removeInvite = await InvitesData.deleteMany({
    code: invite.code,
  }).exec();
  console.log("invite delete", removeInvite);
});

client.on("inviteCreate", async (invite) => {
  // Update cache on new invites
  console.log(invite);
  const addInvite = await InvitesData.create({
    serverID: invite.guild.id,
    code: invite.code,
    users: invite.users,
  });
  console.log("invite create", addInvite);
});

client.on("guildMemberAdd", async (member) => {
  const createUser = await UserData.create({
    username: member.user.username,
    discriminator: member.user.discriminator,
    verified: member.user.verified,
    userID: member.user.id,
    serverID: member.guild.id,
    numberOfMessages: 0,
    messages: [],
    avatar: member.user.avatar,
    banner: member.user.banner,
    accentColor: member.user.accentColor,
    voiceChatTime: 0,
    premiumType: member.user.premiumType,
    email: member.user.email,
  });
  const newInvites = await member.guild.invites.fetch();
  const oldInvites = await InvitesData.find({});
  const newInvitesData = newInvites.map(async (newInvite) => {
    const oldInvite = await InvitesData.findOne({
      code: newInvite.code,
    }).exec();
    if (newInvite.uses > oldInvite.uses) {
      console.log(oldInvite.uses);
      const serverID = member.guild.id.toString();
      const updateInviteUses = await InvitesData.findOneAndUpdate(
        { code: newInvite.code, serverID: serverID },
        { $inc: { uses: 1 } },
        { new: true }
      );
      console.log(member.id);
      const userID = oldInvite.member.toString();
      const updateInvites = await UserData.findOneAndUpdate(
        { userID: userID, serverID: serverID },
        { $push: { invitees: member.id } },
        { new: true }
      );
    }
  });
});

client.on("guildMemberRemove", async (member) => {
  console.log("this shit", member.user.id, member.guild.id, "doesnt work");
  userID = member.user.id.toString();
  serverID = member.guild.id.toString();

  const removeServerUser = await UserData.findOneAndDelete({
    userID: userID,
    serverID: serverID,
  }).exec();
  console.log(removeServerUser);
});

client.on("guildMemberUpdate", async (member) => {
  userID = member.user.id.toString();
  const updateUsersData = await UserData.findOneAndUpdate(
    { userID: userID },
    {
      username: member.user.username,
      avatar: member.user.avatar,
    },
    { new: true }
  );
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  let newUserChannel = newState.channel;
  let oldUserChannel = oldState.channel;

  if (oldUserChannel === null && newUserChannel !== null) {
    // User Join a voice channel
    // Handle your save when user join in memcache, database , ...
    const addVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id.toString() },
      { startVoiceTime: Date.now() },
      { new: true }
    );
  } else if (oldUserChannel !== null && newUserChannel === null) {
    // User Leave a voice channel
    // Calculate with previous save time to get in voice time
    const timedata = await UserData.findOne(
      { userID: newState.id },
      "startVoiceTime"
    ).exec();
    const delta = Math.floor((Date.now() - timedata.startVoiceTime) / 1000);
    console.log(delta);
    const endVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id.toString() },
      {
        $inc: { voiceChatTime: delta },
        startVoiceTime: 0,
      },
      { new: true }
    );
    const addVoiceTime = await ChannelData.findOneAndUpdate(
      { serverID: oldState.channel.systemChannelId },
      { $inc: { voiceChatTime: delta } }
    );
  } else if (
    oldUserChannel !== null &&
    newUserChannel !== null &&
    oldUserChannel.id != newUserChannel.id
  ) {
    // this adds the time to the user so that later the time can be
    const timedata = await UserData.findOne(
      { userID: newState.id },
      "startVoiceTime"
    ).exec();
    const delta = Math.floor((Date.now() - timedata.startVoiceTime) / 1000);
    console.log(delta);
    console.log(newState.channel);

    const endVoiceStart = await UserData.findOneAndUpdate(
      { userID: newState.id.toString() },
      {
        $inc: { voiceChatTime: delta },
        startVoiceTime: Date.now(),
      },
      { new: true }
    );
    const addVoiceTime = await ChannelData.findOneAndUpdate(
      { serverID: oldState.channel.systemChannelId },
      { $inc: { voiceChatTime: delta } },
      { new: true }
    );

    // User Switch a voice channel
    // This is bonus if you want to do something futhermore
  }
});

// send only moderators to the website and give them access????
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  // if (!interaction.author.hasPermission("MANAGE_MESSAGES")) {
  //   console.log('working')
  //   return
  // };
  if (commandName === "dashboard") {
    const dashboardEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${interaction.member.guild.name} Dashboard`)
      .setURL(`http://localhost:3001/${interaction.member.guild.id}`)
      .setAuthor({ name: "Surface Bot" })
      .setDescription("Surface your top contributors faster")
      .setThumbnail("https://i.ibb.co/vjCT8w7/SB-L-1.png");

    await interaction.reply({ embeds: [dashboardEmbed] });
    var guild = await client.guilds.cache.get(interaction.member.guild.id);

    const serversChannels = guild.channels.cache;

    serversChannels.forEach((channel) => {
      console.log(channel);
    });

    // what role has dashboard setup
    // jot for timeout
  } else if (commandName === "setup") {
    await interaction.reply("Setting up server for you!");
    var guild = await client.guilds.cache.get(interaction.member.guild.id);
    userDataArray = [];
    const createServer = await DiscordServerData.create({
      serverName: interaction.member.guild.name,
      serverID: interaction.member.guild.id,
      icon: interaction.member.guild.icon,
      messagesSent: 0,
      memberCount: guild.memberCount,
    });
    // creates all the members
    await interaction.member.guild.members.fetch().then((members) => {
      members.forEach((member) => {
        if (!member.user.bot) {
          const createUser = UserData.create({
            username: member.user.username,
            discriminator: member.user.discriminator,
            verified: member.user.verified,
            userID: member.user.id,
            serverID: interaction.member.guild.id,
            messages: [],
            avatar: member.user.avatar,
            joinDate: new Date(member.joinedTimestamp),
            premiumType: member.premiumType,
            locale: member.user.locale,
            email: member.user.email,
          });
          userataArray.push(member.user.id);
        }
      });
    });
    let addChannels = [];
    let serversChannels = guild.channels.cache;
    serversChannels.forEach((channel) => {
      addChannels.push(channel.id);
      if (
        channel.name !== "Text Channels" &&
        channel.name !== "Voice Channels"
      ) {
        const createChannel = ChannelData.create({
          channelName: channel.name,
          channelID: channel.id,
          type: channel.type,
        });
      }
    });
    const addUserAndServers = await DiscordServerData.findOneAndUpdate(
      { serverID: guild.id },
      {
        users: userDataArray,
        channels: addChannels,
      },
      { new: true }
    );
  } else if (commandName === "health") {
    await interaction.reply("Getting your server's health rating");

    if (interaction.channel) {
      try {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const messages = await interaction.channel.messages.fetch({
          limit: 100, // Fetch a higher limit initially
        });

        const recentMessages = messages.filter(
          (msg) => msg.createdTimestamp >= oneWeekAgo
        );
        console.log(`Received ${recentMessages.size} recent messages`);

        if (recentMessages.size === messages.size) {
          console.log("All messages are from the past week");
          const oldestMessage = messages.last(); // Get the least recent message
          const olderMessages = await interaction.channel.messages.fetch({
            limit: 100,
            before: oldestMessage.id,
          });

          recentMessages.concat(olderMessages);
          console.log(`Received ${olderMessages.size} older messages`);
        }

        const sentimentPromises = [];
        for (const msg of recentMessages.values()) {
          if (!msg.author.bot) {
            const existingMessage = await MessageData.findOne({
              messageID: msg.id,
            });
            const channel = await ChannelData.findOne({
              channelID: msg.channelId,
            });
            if (existingMessage) {
              console.log(
                "Message already exists in the database:",
                existingMessage.messageID
              );
              sentimentPromises.push(existingMessage.karma);
              // You can add further handling here if needed
            } else {
              if (channel) {
                await createMessageDatas(msg);
              } else {
                await interaction.reply("Please complete setup first");
              }
            }
          } else {
            console.log("Skipping bot message:", msg.content);
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    } else {
      console.error("Interaction channel is not defined.");
    }
  }
});

client.on("error", (err) => {
  console.warn(err);
});

client.login(token);

mongoose.connect(dbURL, () => {
  console.log("Connected to surfacebot db");
});
