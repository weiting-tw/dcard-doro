import * as dotenv from 'dotenv-safe';
import { Gender, LineMsg } from './models';
import { DcardService, LineNotifyService } from './services';
import { MailService } from './services/mailService';
import { DcardHelper } from './utils/dcardHelper';
dotenv.load({ allowEmptyValues: true });

const username: string = process.env.DCARD_USERNAME;
const password: string = process.env.DCARD_PASSWORD;

const acceptGender: number = Number.parseInt(process.env.DCARD_ACCEPT_GENDER, 10);
const dcardService: DcardService = new DcardService();
const mailService: MailService = new MailService();
const dcardHelper: DcardHelper = new DcardHelper();
const lineNotify: LineNotifyService = new LineNotifyService(process.env.LINE_NOTIFY_TOKEN);

dcardService.login(username, password).then(
  (success) => {
    if (!success) { return; }
    dcardService.getDcardInfo().then(
      async (dcardInfo) => {
        console.log(JSON.stringify(dcardInfo));
        if (acceptGender > 1 || Gender[acceptGender] === dcardInfo.dcard.gender) {
          await mailService.sendDcardInfo(dcardInfo);

          // line notify
          const msg: LineMsg = new LineMsg(dcardHelper.toLineMsg(dcardInfo.dcard));
          msg.imageFullsize = dcardInfo.dcard.avatar;
          msg.imageThumbnail = dcardInfo.dcard.avatar;

          lineNotify.sendMsg(msg);
          const result: { bothAccept: boolean } = await dcardService.sendAccept();
          console.log('sent an invitation card');
          console.log(`bothAccept: ${result.bothAccept}`);
          return;
        }
      }
    );
  }
);
