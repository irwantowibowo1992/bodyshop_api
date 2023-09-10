require('dotenv').config();
const midtransClient = require('midtrans-client');

function charge() {
  let core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });

  let parameter = {
    payment_type: 'bank_transfer',
    transaction_details: {
      gross_amount: 24145,
      order_id: 'test-transaction-321',
    },
    bank_transfer: {
      bank: 'bni',
    },
  };

  core
    .charge(parameter)
    .then((chargeResponse) => {
      console.log('chargeResponse:', JSON.stringify(chargeResponse));
    })
    .catch((e) => {
      console.log('Error occured:', e.message);
    });
}

module.exports = {
  charge,
};
