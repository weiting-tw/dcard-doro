export class LineMsg {
  // 	Required	String	1000 characters max
  public message: string;

  // 	Optional	HTTP/HTTPS URL	Maximum size of 240×240px JPEG
  public imageThumbnail?: string;

  // 	Optional	HTTP/HTTPS URL	Maximum size of 1024×1024px JPEG
  public imageFullsize?: string;

  // 	Optional	File
  // Upload a image file to the LINE server.
  // Supported image format is png and jpeg.
  // If you specified imageThumbnail ,imageFullsize and imageFile, imageFile takes precedence.
  // There is a limit that you can upload to within one hour.
  // For more information, please see the section of the API Rate Limit.
  public imageFile?: string;

  // 	Optional	Number	Package ID.
  public stickerPackageId?: string;

  //  List. [sticker_list]<https://devdocs.line.me/files/sticker_list.pdf>
  public sticker?: string;

  // 	Optional	Number	Sticker ID.
  public stickerId?: string;

  constructor(message: string) {
    this.message = message;
  }
}
