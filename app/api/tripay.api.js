require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');
const InvalidError = require('../exceptions/invalid.exception');

async function requestTransaction(data) {
  const apiKey = process.env.TRYPAY_API_KEY;
  const privatKey = process.env.TRYPAY_PRIVAT_KEY;
  const merchantCode = process.env.TRIPAY_MERCHANT_CODE;
  const merchantRef = data.invoice; // ini invoice dari sistem kita
  const amount = data.amount; // ini total amount dari sistem kita

  const expiry = parseInt(Math.floor(new Date() / 1000) + 24 * 60 * 60); // 24 jam

  const signature = crypto
    .createHmac('sha256', privatKey)
    .update(merchantCode + merchantRef + amount)
    .digest('hex');

  const payload = {
    method: data.payment_method, // ini dari sistem kita
    merchant_ref: merchantRef,
    amount: amount,
    customer_name: data.customer_name, // ini dari sistem kita
    customer_email: data.customer_email,
    customer_phone: data.customer_phone, // ini dari sitem kita
    order_items: data.order_items,
    return_url: 'https://domainanda.com/redirect',
    expired_time: expiry,
    signature: signature,
  };

  try {
    const result = await axios.post(process.env.TRIPAY_URL, payload, {
      headers: { Authorization: 'Bearer ' + apiKey },
    });

    return result.data.data;
  } catch (error) {
    throw new InvalidError(eror);
  }
}

module.exports = {
  requestTransaction,
};
