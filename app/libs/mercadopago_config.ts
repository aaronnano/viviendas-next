// import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import mercadopago from 'mercadopago'

// declare global {
//   var mpagoClient: MercadoPagoConfig | undefined
// }

// const mp = globalThis.mpagoClient || new MercadoPagoConfig({ 
//   accessToken: 'TEST-2986334524590589-110517-91151a27b0b5ac64e92849565b149bea-1536163399',
//   options: { timeout: 5000 }
// });

mercadopago.configure({
  access_token: 'TEST-2986334524590589-110517-91151a27b0b5ac64e92849565b149bea-1536163399',
})




export default mercadopago

// Step 3: Initialize the API object
// const payment = new Payment(client);

// // Step 4: Create the request object
// const body = {
// 	transaction_amount: 12.34,
// 	description: '<DESCRIPTION>',
// 	payment_method_id: '<PAYMENT_METHOD_ID>',
// 	payer: {
// 		email: '<EMAIL>'
// 	},
// };

// // Step 5: Make the request
// payment.create({ body }).then(console.log).catch(console.log);