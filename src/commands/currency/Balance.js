const { Command } = require("../../structures/index.js");
const Currency = require("../../schemas/currency.js");
const numeral = require("numeral");

class Balance extends Command {
  constructor(client) {
    super(client, {
      name: "balance",
      description: {
        content: "Shows the coin balance",
        examples: ["coin"],
        usage: "coin",
      },
      category: "currency",
      aliases: ["bal", "cash", "coin"],
      cooldown: 3,
      args: false,
      permissions: {
        dev: false,
        client: ["SendMessages", "ViewChannel", "EmbedLinks"],
        user: [],
      },
      slashCommand: true,
      options: [],
    });
  }
  async run(client, ctx, args) {
    let data = await Currency.findOne({ userId: ctx.author.id });
    if (!data)
      await Currency.create({
        userId: ctx.author.id,
        cash: 500,
        bankSpace: 5000,
      });

    let prefix;
    if (!prefix) {
      prefix = this.client.config.prefix;
    } else {
      prefix = prefix.prefix;
    }
    let embed = this.client.embed();
    let balance = data.balance;
    let bank = data.bank;
    let bankSpace = data.bankSpace;
    let percentage = (bank / bankSpace) * 100 || 0;

    return await ctx.sendMessage({
      embeds: [
        embed
          .setAuthor({
            name: this.client.user.username,
            iconURL: this.client.user.displayAvatarURL(),
          })
          .setColor(this.client.color.main)
          .setDescription(
            `Cash **${numeral(balance.toLocaleString()).format()}**
Bank **${numeral(bank.toLocaleString()).format()}** ( ${percentage.toFixed(
              2
            )}% full )
Total Net **${numeral((balance + bank).toLocaleString()).format()}**
              
For claim your daily reward use \`${prefix}daily\`!`
          ),
      ],
    });
  }
}

module.exports = Balance;

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
