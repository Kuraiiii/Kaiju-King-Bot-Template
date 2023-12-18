const { model, Schema } = require("mongoose");

const CurrencySchema = new Schema({
  userId: String,
  balance: { type: Number, default: 500 },
  bank: { type: Number, default: 0 },
  bankSpace: { type: Number, default: 5000 },
});
module.exports = model("Currency", CurrencySchema);

/**
 * Project: Kaiju Kingz
 * Author: Kurai
 * Company: Disbot Studio™
 * Copyright (c) 2023. All rights reserved.
 * This code is the property of Disbot Studio™ and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/mRt2FkwxYu
 */
