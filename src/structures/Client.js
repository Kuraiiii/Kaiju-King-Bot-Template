const {
  ApplicationCommandType,
  Client,
  Collection,
  EmbedBuilder,
  PermissionsBitField,
  REST,
  Routes,
} = require("discord.js");
const { connect, connection } = require("mongoose");
const fs = require("fs");
const path = require("path");
const Logger = require("./Logger.js");
const config = require("../config.js");
const loadPlugins = require("../plugin/index.js");
const Utils = require("../utils/Utils.js");

module.exports = class KaijuClient extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldown = new Collection();
    this.config = config;
    this.logger = new Logger();
    this.color = config.color;
    this.body = [];
    this.utils = Utils;
  }

  embed() {
    return new EmbedBuilder();
  }

  async start(token) {
    this.loadCommands();
    this.logger.info(`Successfully loaded commands!`);
    this.loadEvents();
    this.logger.info(`Successfully loaded events!`);
    this._connectMongodb();
    this.logger.info("Successfully connected to MongoDB.");
    loadPlugins(this);
    await this.login(token);
  }

  async _connectMongodb() {
    if ([1, 2, 99].includes(connection.readyState)) return;
    await connect(this.config.database);
  }

  loadCommands() {
    const commandsPath = fs.readdirSync(path.join(__dirname, "../commands"));
    commandsPath.forEach((dir) => {
      const commandFiles = fs
        .readdirSync(path.join(__dirname, `../commands/${dir}`))
        .filter((file) => file.endsWith(".js"));
      commandFiles.forEach(async (file) => {
        const cmd = require(`../commands/${dir}/${file}`);
        const command = new cmd(this, file);
        command.category = dir;
        command.file = file;
        this.commands.set(command.name, command);
        if (command.aliases.length !== 0) {
          command.aliases.forEach((alias) => {
            this.aliases.set(alias, command.name);
          });
        }
        if (command.slashCommand) {
          const data = {
            name: command.name,
            description: command.description.content,
            type: ApplicationCommandType.ChatInput,
            options: command.options ? command.options : null,
            name_localizations: command.nameLocalizations
              ? command.nameLocalizations
              : null,
            description_localizations: command.descriptionLocalizations
              ? command.descriptionLocalizations
              : null,
            default_member_permissions:
              command.permissions.user.length > 0
                ? command.permissions.user
                : null,
          };
          if (command.permissions.user.length > 0) {
            const permissionValue = PermissionsBitField.resolve(
              command.permissions.user
            );
            if (typeof permissionValue === "bigint") {
              data.default_member_permissions = permissionValue.toString();
            } else {
              data.default_member_permissions = permissionValue;
            }
          }
          const json = JSON.stringify(data);
          this.body.push(JSON.parse(json));
        }
      });
    });
    this.once("ready", async () => {
      const applicationCommands =
        this.config.production === true
          ? Routes.applicationCommands(this.config.clientId ?? "")
          : Routes.applicationGuildCommands(
              this.config.clientId ?? "",
              this.config.guildId ?? ""
            );
      try {
        const rest = new REST({ version: "9" }).setToken(
          this.config.token ?? ""
        );
        await rest.put(applicationCommands, { body: this.body });
        this.logger.info(`Successfully loaded slash commands!`);
      } catch (error) {
        this.logger.error(error);
      }
    });
  }

  loadEvents() {
    const eventsPath = fs.readdirSync(path.join(__dirname, "../events"));
    eventsPath.forEach((dir) => {
      const events = fs
        .readdirSync(path.join(__dirname, `../events/${dir}`))
        .filter((file) => file.endsWith(".js"));
      events.forEach(async (file) => {
        const event = require(`../events/${dir}/${file}`);
        const evt = new event(this, file);
        switch (dir) {
          case "player":
            this.shoukaku.on(evt.name, (...args) => evt.run(...args));
            break;
          default:
            this.on(evt.name, (...args) => evt.run(...args));
            break;
        }
      });
    });
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
