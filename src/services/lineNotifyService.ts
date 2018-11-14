import * as request from 'request';
import { LineMsg } from './../models/lineMsg';

export class LineNotifyService {
  public static $inject: string[] = ['request'];
  private statusUrl: string = 'https://notify-api.line.me/api/status';
  private notifyUrl: string = 'https://notify-api.line.me/api/notify';
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async status(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      request.get({
        url: this.statusUrl,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }, (error, response, body) => {
        if (!error) { resolve(JSON.parse(body)); }
        reject();
      });
    });
  }

  public sendMsg(msg: LineMsg): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      request.post({
        url: this.notifyUrl,
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        form: msg
      }, (error, response, body) => {
        if (!error) { resolve(JSON.parse(body)); }
        reject();
      });
    });
  }
}
