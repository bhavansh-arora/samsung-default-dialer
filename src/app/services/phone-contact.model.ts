export class PhoneContact {
  private readonly _phoneNumber: string;

  constructor(phoneNumber: string) {
    this._phoneNumber = phoneNumber;
    this._title = phoneNumber;
  }

  private _title: string;

  get title() {
    return this._title;
  }

  private _firstName: string = null;

  get firstName(): string {
    return this._firstName;
  }

  private _lastName: string = null;

  get lastName(): string {
    return this._lastName;
  }

  private _imageUrl = '';

  get imageUrl(): string {
    return this._imageUrl;
  }


  get phoneNumber(): string {
    return this._phoneNumber;
  }

  fillContactData(firstName: string, lastName: string, imageUrl: string) {
    lastName = (lastName) ? lastName : '';
    this._firstName = firstName;
    this._lastName = lastName;
    if (imageUrl) {
      this._imageUrl = imageUrl;
    }
    this._title = ''.concat(firstName, ' ', lastName);
  }
}
