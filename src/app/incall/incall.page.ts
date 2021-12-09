import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {PhoneService} from '../services/phone.service';
import {PhoneCallStatusModel} from '../services/phone-call-status.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-incall',
  templateUrl: './incall.page.html',
  styleUrls: ['./incall.page.scss'],
})
export class IncallPage implements OnInit, OnDestroy {
  public isMicrophoneMuted = true;
  public callStatusText = '';

  private callStatusSubscription: Subscription;
  private currentCallStatus: PhoneCallStatusModel;
  private callDurationInterval = 0;
  private callDurationCounter = 0;

  constructor(private phoneService: PhoneService, private ngZone: NgZone) { }

  get canEndCall() {
    return this.currentCallStatus === PhoneCallStatusModel.ACTIVE ||
      this.currentCallStatus === PhoneCallStatusModel.DIALING;
  }

  ngOnInit() {
    this.callStatusSubscription = this.phoneService.currentCallStatus.subscribe(status => {
      this.ngZone.run(args => {
        this.updateCallStatus(status);
      });
    });
    this.phoneService.isMicrophoneMuted().then(value => {
      this.isMicrophoneMuted = value;
    }).catch(reason => {
      console.error('error when getting isMicrophoneMuted:\n', reason);
    });
  }

  ngOnDestroy() {
    if (this.callDurationInterval !== 0) {
      window.clearInterval(this.callDurationInterval);
    }
    this.callStatusSubscription?.unsubscribe();
  }

  async handleToggleMicrophone() {
    try {
      await this.phoneService.setMicrophone(this.isMicrophoneMuted ? 'on' : 'off');
      this.isMicrophoneMuted = !this.isMicrophoneMuted;
    } catch (e) {
      console.error('Error when setting microphone mute:\n', e);
    }
  }

  async handleTouchConfirmEndCall() {
    if (!this.canEndCall) {
      console.log('Cannot end call!');
    }
    else {
      console.log('Try to end call...');
      await this.phoneService.endCall();
    }
  }

  private updateCallStatus(status: PhoneCallStatusModel) {
    this.currentCallStatus = status;
    switch (status) {
      case PhoneCallStatusModel.UNKNOWN:
        // TODO: Unknown error or status raised :|
        break;
      case PhoneCallStatusModel.CONNECTING:
        console.log('New call status: Connecting!');
        break;
      case PhoneCallStatusModel.DIALING:
        console.log('New call status: Dialing!');
        break;
      case PhoneCallStatusModel.ACTIVE:
        console.log('New call status: Active!');
        const startTime = Date.now() - (this.callDurationCounter);
        if (this.callDurationInterval !== 0)
          {break;}
        this.callDurationInterval = window.setInterval(() => {
          this.callStatusText = `Call Duration: ${(Date.now() - startTime) / 1000}`;
        }, 1000);

        break;
      case PhoneCallStatusModel.DISCONNECTED:
        console.log('New call status: Disconnected!');
        this.callStatusText = '';
        break;
    }
  }

}
