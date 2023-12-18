const fs = require("fs");
const path = require("path");

function loadPlugins(client) {
  const pluginsFolder = path.join(__dirname, "./plugins");
  const pluginFiles = fs
    .readdirSync(pluginsFolder)
    .filter((file) => file.endsWith(".js"));

  pluginFiles.forEach(async (file) => {
    const plugin = require(`./plugins/${file}`);
    if (plugin.initialize) plugin.initialize(client);
    client.logger.info(`Loaded plugin: ${plugin.name} v${plugin.version}`);
  });
}

module.exports = loadPlugins;

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
