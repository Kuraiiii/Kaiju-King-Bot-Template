const WaveClient = require("../../structures/Client");

const KeepAlive = {
  name: "keep-alive",
  version: "1.0.0",
  author: "Blacky",
  /**
   *
   * @param {WaveClient} client
   */
  initialize: (client) => {
    if (client.config.keepAlive) {
      const http = require("node:http");
      const server = http.createServer((req, res) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(
          `I'm alive! Currently serving ${client.guilds.cache.size} guilds.`
        );
      });
      server.listen(3000, () => {
        client.logger.info("Keep-Alive server is running on port 3000");
      });
    }
  },
};

module.exports = KeepAlive;

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
