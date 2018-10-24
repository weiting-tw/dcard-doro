import * as dotenv from 'dotenv-safe';
import { Gender } from './models';
import { DcardService } from './services';
import { MailService } from './services/mailService';
dotenv.config({ allowEmptyValues: true });
dotenv.load();

const username: string = process.env.DCARD_USERNAME || '';
const password: string = process.env.DCARD_PASSWORD || '';

const acceptGender: number = Number.parseInt(process.env.DCARD_ACCEPT_GENDER, 10);
const dcardService: DcardService = new DcardService();
const mailService: MailService = new MailService();

dcardService.login(username, password).then(
  (success) => {
    if (!success) { return; }
    dcardService.getDcardInfo().then(
      async (dcardInfo) => {
        console.log(JSON.stringify(dcardInfo));
        if (acceptGender > 1 || Gender[acceptGender] === dcardInfo.dcard.gender) {
          await mailService.sendDcardInfo(dcardInfo);
          const result: { bothAccept: boolean } = await dcardService.sendAccept();
          console.log('sent an invitation card');
          console.log(`bothAccept: ${result.bothAccept}`);
          return;
        }
      }
    );
  }
);
