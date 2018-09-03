import * as dotenv from 'dotenv-safe';
import { Gender } from './models';
import { DcardService } from './services';
import { MailService } from './services/mailService';
dotenv.config({ allowEmptyValues: true });
dotenv.load();

const cookie: string = process.env.DCARD_COOKIE || '';
const xCsrfToken: string = process.env.DCARD_XCSRF_TOKEN || '';

const acceptGender: number = Number.parseInt(process.env.DCARD_ACCEPT_GENDER);
const dcardService: DcardService = new DcardService(cookie, xCsrfToken);
const mailService: MailService = new MailService();

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

