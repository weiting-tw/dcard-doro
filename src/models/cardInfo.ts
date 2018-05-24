export class DcardInfo {
  public dcard: Dcard = new Dcard();
  public accept: boolean = false;
  public bothAccept: boolean = false;
  public wishCountdown: number = 0;
}

export class Dcard {
  public gender: string;
  public department: string = '';
  public school: string = '';
  public grade: string = '';
  public talent: string = '';
  public club: string = '';
  public lecture: string = '';
  public lovedCountry: string = '';
  public trouble: string = '';
  public wantToTry: string = '';
  public exchange: string = '';
  public workExperience: string = '';
  public bloodType: string = '';
  public avatar: string = '';
}
