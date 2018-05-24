import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv-safe';
dotenv.config({ allowEmptyValues: true });
// var dotenv = require('dotenv');
// dotenv.load();
// const sendgridUsername: string = process.env.SENDGRID_USERNAME || '';
// const sendgridPassword: string = process.env.SENDGRID_PASSWORD || '';
const to: string = process.env.TO || '';

// const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

sgMail.send({
  to: 'yourmail@gmail.com',
  from: 'yourmail@gmail.com',
  subject: 'Hello world',
  text: 'Hello plain world!',
  html: '<b>Hello HTML world!</b>',
});

// interface MailServer {
//   /**
//    * sendMail
//    */
//   sendMail: () => void;
// }

// export class SendGrid implements MailServer {
//   /**
//    * sendMail
//    */
//   public void sendMail(): any {

//   }
// }
