import * as dotenv from 'dotenv-safe';
import * as request from 'request';
import { Gender } from './models';
import { DcardService } from './services';
import { MailService } from './services/mailService';
// const dotenv: any = require('dotenv');
// const request = require('request');
dotenv.config({ allowEmptyValues: true });
dotenv.load();

const hostName: string = 'https://www.dcard.tw';
const dacrdApi: string = `${hostName}/_api/dcard`;
const acceptApi: string = `${hostName}/_api/dcard/accept`;
const cookie: string = process.env.DCARD_COOKIE || '';
const xCsrfToken: string = process.env.DCARD_XCSRF_TOKEN || '';
const acceptGender: number = Number.parseInt(process.env.DCARD_ACCEPT_GENDER) || 2;
const dcardService: DcardService = new DcardService(cookie);
const mailService: MailService = new MailService();

dcardService.getDcardInfo().then(
  async (dcardInfo) => {
    console.log(JSON.stringify(dcardInfo));
    // if (dcardInfo.dcard.gender === Gender.M) {
    //   dcardService.sendAccept();
    //   return;
    // }
    if (acceptGender > 1) {
      await mailService.sendDcardInfo(dcardInfo);
      const result: { bothAccept: boolean } = await dcardService.sendAccept();
      console.log(`bothAccept: ${result.bothAccept}`);
      return;
    }
  }
);

