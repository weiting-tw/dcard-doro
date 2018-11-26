import { Dcard } from './../models/cardInfo';
export class DcardHelper {
  public toLineMsg(dcard: Dcard): string {
    return `\r
      學校: ${dcard.school} \r
      科系: ${dcard.department} \r
      興趣: ${dcard.talent} \r
      `;
  }
}
