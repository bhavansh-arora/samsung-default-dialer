import { Component } from '@angular/core';
import {PhoneService} from "../services/phone.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  phoneNumberInputValue = '';

  constructor(private phoneService: PhoneService, private router: Router) {}

  async placeCall() {
    if (this.phoneNumberInputValue === '') {
      return;
    }
    await this.phoneService.call(this.phoneNumberInputValue);
    await this.router.navigate(['/phone/incall']);
  }
}
