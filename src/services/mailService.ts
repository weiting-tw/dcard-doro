import * as sgMail from '@sendgrid/mail';
import { Dcard } from './../models/';
import { DcardInfo } from './../models/cardInfo';

export class MailService {
  private mailTo: string;
  private mailForm: string;
  private mailSubject: string;
  constructor() {
    this.mailTo = process.env.MAIL_TO || '';
    this.mailForm = process.env.MAIL_FROM || '';
    this.mailSubject = process.env.MAIL_SUBJECT || 'Dcard doro';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  /**
   * sendDcardInfo
   */
  public sendDcardInfo(dcardInfo: DcardInfo): void {
    sgMail.send({
      to: this.mailTo,
      from: this.mailForm,
      subject: this.mailSubject,
      html: this.myTemplate(dcardInfo.dcard)
    }).catch((error) => {
      console.log('error', error);
    });
  }

  private myTemplate(dcard: Dcard): string {
    const template: string = `
    <style type="text/css" data-hse-inline-css="true">
    body {
    }
    img {
      overflow: hidden;
      position: relative;
      max-width: 200px;
      padding: 0 30px;
    }
    .divTable{
      display: table;
      width: 300px;
    }
    .divTableRow {
      height: 70px;
      display: table-row;
      font-size: 20px;
      margin: 0 32px;
    }
    .divTableTitle{
      border-top: 1px solid #f0f0f0;
      padding: 0 2px;
      color: #006aa6;
      font-weight: 500;
    }
    .divTableHeading {
      background-color: #EEE;
      display: table-header-group;
    }
    .divTableCell, .divTableHead {
      padding: 0px 10px;
    }
    .divTableHeading {
      background-color: #EEE;
      display: table-header-group;
      font-weight: bold;
    }
    .divTableFoot {
      background-color: #EEE;
      display: table-footer-group;
      font-weight: bold;
    }
    .divTableBody {
      display: table-row-group;
    }
    </style>
    <div class="divTable" style="border: 1px solid #000;">
      <div class="divTableBody">
        <div>
          <img src='${dcard.avatar}'>
          <p style='font-size: 25px; margin: 0;'>${dcard.school}</p>
          <p style='font-size: 25px; margin: 0 0 0 100px;'>${dcard.department}</p>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">專長與興趣</div>
          <div class="divTableCell">${dcard.talent}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">參加過的社團</div>
          <div class="divTableCell">${dcard.club}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">喜歡的課程</div>
          <div class="divTableCell">${dcard.lecture}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">喜歡的國家</div>
          <div class="divTableCell">${dcard.lovedCountry}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">自己最近的困擾</div>
          <div class="divTableCell">${dcard.trouble}</div>
        </div>
        <div class="divTableRow">
          <div class="divTableTitle">可以交換學習的才藝</div>
          <div class="divTableCell">${dcard.exchange}</div>
        </div>
        <div class="divTableRow">
        <div class="divTableTitle">想嘗試的事情</div>
        <div class="divTableCell">${dcard.wantToTry}</div>
        </div>
      </div>
    </div>`;
    return template.replace(/\n/, '<br>');
  }

}
