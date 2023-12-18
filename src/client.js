const { GatewayIntentBits } = require("discord.js");
const config = require("./config.js");
const WaveClient = require("./structures/Client.js");

const {
  GuildMembers,
  MessageContent,
  GuildVoiceStates,
  GuildMessages,
  Guilds,
  GuildMessageTyping,
} = GatewayIntentBits;

const clientOptions = {
  intents: [
    Guilds,
    GuildMessages,
    MessageContent,
    GuildVoiceStates,
    GuildMembers,
    GuildMessageTyping,
  ],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
};

const client = new WaveClient(clientOptions);
client.start(config.token);

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
