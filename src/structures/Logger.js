const { Signale } = require("signale");

const options = {
  disabled: false,
  interactive: false,
  logLevel: "info",
  scope: "Wavemusic",
};

class Logger extends Signale {
  constructor() {
    super({
      ...options,
      types: {
        info: {
          badge: "ℹ",
          color: "blue",
          label: "info",
        },
        warn: {
          badge: "⚠",
          color: "yellow",
          label: "warn",
        },
        error: {
          badge: "✖",
          color: "red",
          label: "error",
        },
        debug: {
          badge: "🐛",
          color: "magenta",
          label: "debug",
        },
        success: {
          badge: "✔",
          color: "green",
          label: "success",
        },
        log: {
          badge: "📝",
          color: "white",
          label: "log",
        },
        pause: {
          badge: "⏸",
          color: "yellow",
          label: "pause",
        },
        start: {
          badge: "▶",
          color: "green",
          label: "start",
        },
      },
    });
  }
}

module.exports = Logger;

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
