// import * as dotenv from 'dotenv-safe';
import * as request from 'request';
import { DcardInfo } from './../models/';

const hostName: string = 'https://www.dcard.tw';
const dacrdApi: string = `${hostName}/_api/dcard`;
const acceptApi: string = `${hostName}/_api/dcard/accept`;
const sessionUrl: string = `${hostName}/_api/sessions`;

export class DcardService {
  public static $inject: string[] = ['request'];

  public getDcardInfo(): Promise<DcardInfo> {
    return new Promise<DcardInfo>((resolve, reject) => {
      request.get({
        url: dacrdApi,
        headers: {
          Cookie: process.env.cookie
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
          'Cookie': process.env.cookie,
          'x-csrf-token': process.env.xCsrfToken,
        },
        json: {
          firstMessage: message
        }
      }, (error, response, body) => {
        if (!error) { resolve(JSON.parse(JSON.stringify(body))); }
        reject();
      });
    });
  }

  public login(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      request.post({
        url: sessionUrl,
        headers: {
          // tslint:disable-next-line:max-line-length
          'Cookie': '__cfduid=dee5a35874981592fa33ffa366c47925e1540358599; dcard=eyJjc3JmU2VjcmV0IjoiQ0p6UjA2dFRtM3hXLUtQaE1Tc1F0NzVMIn0=; dcard.sig=G95BMTHNwq0XYrhKuuKOHb1ssCI',
          'x-csrf-token': 'yGLNKTin-ZzdVnBhgW1mZ1Bhl_8BcF-G-rcg'
        },
        json: {
          email: username,
          password
        }
      }, (error, response, body) => {
        if (response.statusCode === 204) {
          process.env.xCsrfToken = response.headers['x-csrf-token'].toString();
          process.env.cookie = response.headers['set-cookie'].map(x => x.split(';')[0]).join('; ');
          resolve(true);
        } else {
          resolve(false);
        }
        reject();
      });
    });
  }
}
