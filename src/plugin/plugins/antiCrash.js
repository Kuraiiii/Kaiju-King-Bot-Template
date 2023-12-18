const antiCrash = {
  name: "AntiCrash Plugin",
  version: "1.0.0",
  author: "Blacky",
  initialize: (client) => {
    process.on("unhandledRejection", (reason, promise) => {
      client.logger.error(
        "Unhandled Rejection at:",
        promise,
        "reason:",
        reason
      );
    });

    process.on("uncaughtException", (err) => {
      client.logger.error("Uncaught Exception thrown:", err);
    });
  },
};

module.exports = antiCrash;

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
