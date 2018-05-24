import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv-safe';
import { Dcard } from './../models/';
dotenv.config({ allowEmptyValues: true });
// var dotenv = require('dotenv');
// dotenv.load();
// const sendgridUsername: string = process.env.SENDGRID_USERNAME || '';
// const sendgridPasswor: string = process.env.SENDGRID_PASSWORD || '';
// const to: string = process.env.TO || '';

function myTemplate(dcard: Dcard): string {
  const template: string = `
  <style type="text/css" data-hse-inline-css="true">
  body {
  }
  /* DivTable.com */
  .divTable{
    display: table;
    width: 275px;
  }
  .divTableRow {
    height: 70px;
    display: table-row;
  }
  .divTableHeading {
    background-color: #EEE;
    display: table-header-group;
  }
  .divTableCell, .divTableHead {
    border: 1px solid #999999;
    display: table-cell;
    padding: 5px 10px;
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
  <div class="divTable" style="width: 250px; border: 1px solid #000;">
    <div class="divTableBody">
      <div class="divTableRow">
        <div class="divTableCell">專長 興趣</div>
      </div>
      <div class="divTableRow">
        <div class="divTableCell">參加過的社團</div>
      </div>
      <div class="divTableRow">
        <div class="divTableCell">喜歡的課程</div>
      </div>
      <div class="divTableRow">
        <div class="divTableCell">喜歡的國家</div>
      </div>
      <div class="divTableRow">
        <div class="divTableCell">自己最近的困擾</div>
      </div>
      <div class="divTableRow">
        <div class="divTableCell">可以交換學習的才藝</div>
      </div>
      <div class="divTableRow">
      <div class="divTableCell">想嘗試的事情</div>
      </div>
    </div>
  </div>`;
  return template.replace(/\n/, '<br>');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
sgMail.send({
  to: 'a26007565@gmail.com',
  from: 'a26007565@gmail.com',
  subject: 'Hello world',
  html: myTemplate(new Dcard()),
});
