import * as dotenv from 'dotenv-safe';
import * as request from 'request';
import { DcardService } from './services';
// const dotenv: any = require('dotenv');
// const request = require('request');
dotenv.config({ allowEmptyValues: true });
dotenv.load();

const hostName: string = 'https://www.dcard.tw';
const dacrdApi: string = `${hostName}/_api/dcard`;
const acceptApi: string = `${hostName}/_api/dcard/accept`;
const cookie: string = process.env.DCARD_COOKIE || '';
const xCsrfToken: string = process.env.DCARD_XCSRF_TOKEN || '';

const dcardService: DcardService = new DcardService(cookie);


dcardService.getDcardInfo().then(
  (data) => {
    console.log(data);
  }
);

