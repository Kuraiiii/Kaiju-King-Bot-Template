const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET || "",
  guildId: process.env.GUILD_ID,
  database: process.env.DATABASE_URL,
  users: {
    owners: process.env.OWNERS ? process.env.OWNERS.split(",") : undefined,
  },
  color: {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    yellow: 0xffff00,
    main: 0x2f3136,
  },
  logs: {
    logGuild: process.env.LOG_GUILD || "",
    logError: process.env.LOG_ERROR || "",
    logReport: process.env.LOG_REPORT || "",
  },
  links: {
    img: process.env.IMG_LINK || "https://i.imgur.com/ud3EWNh.jpg",
    invite: process.envINVITE_LINK || "",
  },
  botStatus: process.env.BOT_STATUS || "online",
  botActivity: process.env.BOT_ACTIVITY || "WaveMusic",
  botActivityType: parseInt(process.env.BOT_ACTIVITY_TYPE || "2"),
  keepAlive: parseBoolean(process.env.KEEP_ALIVE) || false,
  production: parseBoolean(process.env.PRODUCTION) || true,
};

function parseBoolean(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case "true":
      return true;
    default:
      return false;
  }
}

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
