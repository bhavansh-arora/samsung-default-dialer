/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PhoneContact } from './phone-contact.model';
import { PhoneCallStatusModel } from './phone-call-status.model';
import {Platform} from "@ionic/angular";

declare let LyluDialler: any;
declare let LyluDiallerCallStatus: any;

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  private selectedContactBehaviourSubject = new BehaviorSubject<PhoneContact>(null);
  private currentCallStatusSubject = new Subject<PhoneCallStatusModel>();

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      if (!LyluDialler) {
        // @ts-ignore
        LyluDialler = window.cordova.plugings.LyluDialler;
      }
      this.initialize();
    });
  }

  get currentCallStatus() {
    return this.currentCallStatusSubject.asObservable();
  }

  get selectedContact() {
    return this.selectedContactBehaviourSubject.asObservable();
  }

  setSelectedContact(phoneContact: PhoneContact) {
    this.selectedContactBehaviourSubject.next(phoneContact);
  }

  isMicrophoneMuted() {
    return new Promise<boolean>((resolve, reject) => {
      LyluDialler.isMicrophoneMuted(
        (result) => {
          console.log('(LyluDialler) isMicrophoneMuted');
          console.log(result);
          resolve(result.isMuted as boolean);
        },
        (error) => {
          console.log('(LyluDialler) isMicrophoneMuted error', error);
          reject(error);
        }
      );
    });
  }

  setMicrophone(mode: 'on' | 'off') {
    return new Promise<void>((resolve, reject) => {
      LyluDialler.setMicrophoneMute(mode === 'on',
        (result) => {
          console.log('(LyluDialler) setMicrophoneMute');
          console.log(result);
          resolve();
        },
        (error) => {
          console.log('(LyluDialler) setMicrophoneMute error', error);
          reject(error);
        }
      );
    });
  }

  call(numberToCall: string) {
    // TODO: do some validation to the number
    return new Promise<void>((resolve, reject) => {
      LyluDialler.callNumber(numberToCall,
        () => {
          console.log('(LyluDialler) callNumber');
          resolve();
        },
        (error) => {
          console.log('LyluDialler callNumber error', error);
          reject(error);
        }
      );
    });
  }

  endCall() {
    return new Promise<void>((resolve, reject) => {
      LyluDialler.hangup(
        () => {
          console.log('(LyluDialler) call ended');
          resolve();
        },
        (error) => {
          console.log('LyluDialler call end error', error);
          reject(error);
        }
      );
    });
  }

  private initialize() {
    LyluDialler.attachCallingStatusCallback(
      (result) => {
        console.log('(LyluDialler) status changed');
        console.log(result);
        let status = PhoneCallStatusModel.UNKNOWN;
        switch (result.statusCode) {
          case LyluDiallerCallStatus.CONNECTING:
            status = PhoneCallStatusModel.CONNECTING;
            break;
          case LyluDiallerCallStatus.DIALING:
            status = PhoneCallStatusModel.DIALING;
            break;
          case LyluDiallerCallStatus.RINGING:
            status = PhoneCallStatusModel.RINGING;
            break;
          case LyluDiallerCallStatus.ACTIVE:
            status = PhoneCallStatusModel.ACTIVE;
            break;
          case LyluDiallerCallStatus.DISCONNECTED:
            status = PhoneCallStatusModel.DISCONNECTED;
            break;
        }
        this.currentCallStatusSubject.next(status);
      },
      (error) => {
        console.log('LyluDialler status error', error);
      }
    );
  }
}
