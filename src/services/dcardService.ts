// import * as dotenv from 'dotenv-safe';
import * as request from 'request';
import { DcardInfo } from './../models/cardInfo';

const hostName: string = 'https://www.dcard.tw';
const dacrdApi: string = `${hostName}/_api/dcard`;
const acceptApi: string = `${hostName}/_api/dcard/accept`;
// const cookie: string = process.env.DCARD_COOKIE || '';
const xCsrfToken: string = 'eWPA8tWi-elC-Rd7bVeskMUvvrLC92hnxkX4';

export class DcardService {
  public static $inject: string[] = ['request'];

  constructor(
    private cookie: string
  ) {
  }

  /**
   * getDcardInfo
   */
  public getDcardInfo(): Promise<DcardInfo> {
    return new Promise<DcardInfo>((resolve, reject) => {
      request.get({
        url: dacrdApi,
        headers: {
          Cookie: this.cookie
        },
        followAllRedirects: true
      }, (error, response, body) => {
        if (!error) { resolve(JSON.parse(body)); }
        reject();
      });
    });
  }


  public sendAccept(message: string = 'hi'): Promise<{ bothAccept: boolean }> {
    return new Promise<{ bothAccept: boolean }>((resolve, reject) => {
      request.post({
        url: acceptApi,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Cookie': this.cookie,
          'x-csrf-token': xCsrfToken,
        },
        json: {
          firstMessage: message
        }
        // headers: response.headers
      }, (error, response, body) => {
        // if (!error) {
        //   console.log(response.request.headers);
        //   console.log(body);
        // }
        if (!error) { resolve(JSON.parse(JSON.stringify(body))); }
        reject();
      });
    });
  }
}
