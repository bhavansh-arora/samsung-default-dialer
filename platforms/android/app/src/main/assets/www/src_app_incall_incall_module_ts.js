(self["webpackChunksamsung_default_dialer"] = self["webpackChunksamsung_default_dialer"] || []).push([["src_app_incall_incall_module_ts"],{

/***/ 2805:
/*!*************************************************!*\
  !*** ./src/app/incall/incall-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncallPageRoutingModule": () => (/* binding */ IncallPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _incall_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incall.page */ 1234);




const routes = [
    {
        path: '',
        component: _incall_page__WEBPACK_IMPORTED_MODULE_0__.IncallPage
    }
];
let IncallPageRoutingModule = class IncallPageRoutingModule {
};
IncallPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], IncallPageRoutingModule);



/***/ }),

/***/ 7614:
/*!*****************************************!*\
  !*** ./src/app/incall/incall.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncallPageModule": () => (/* binding */ IncallPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _incall_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incall-routing.module */ 2805);
/* harmony import */ var _incall_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incall.page */ 1234);







let IncallPageModule = class IncallPageModule {
};
IncallPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _incall_routing_module__WEBPACK_IMPORTED_MODULE_0__.IncallPageRoutingModule
        ],
        declarations: [_incall_page__WEBPACK_IMPORTED_MODULE_1__.IncallPage]
    })
], IncallPageModule);



/***/ }),

/***/ 1234:
/*!***************************************!*\
  !*** ./src/app/incall/incall.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncallPage": () => (/* binding */ IncallPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_incall_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./incall.page.html */ 952);
/* harmony import */ var _incall_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incall.page.scss */ 7059);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _services_phone_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/phone.service */ 8289);





let IncallPage = class IncallPage {
    constructor(phoneService, ngZone) {
        this.phoneService = phoneService;
        this.ngZone = ngZone;
        this.isMicrophoneMuted = true;
        this.callStatusText = '';
        this.callDurationInterval = 0;
        this.callDurationCounter = 0;
    }
    get canEndCall() {
        return this.currentCallStatus === 5 /* ACTIVE */ ||
            this.currentCallStatus === 1 /* DIALING */;
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
        var _a;
        if (this.callDurationInterval !== 0) {
            window.clearInterval(this.callDurationInterval);
        }
        (_a = this.callStatusSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    handleToggleMicrophone() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            try {
                yield this.phoneService.setMicrophone(this.isMicrophoneMuted ? 'on' : 'off');
                this.isMicrophoneMuted = !this.isMicrophoneMuted;
            }
            catch (e) {
                console.error('Error when setting microphone mute:\n', e);
            }
        });
    }
    handleTouchConfirmEndCall() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.canEndCall) {
                console.log('Cannot end call!');
            }
            else {
                console.log('Try to end call...');
                yield this.phoneService.endCall();
            }
        });
    }
    updateCallStatus(status) {
        this.currentCallStatus = status;
        switch (status) {
            case 0 /* UNKNOWN */:
                // TODO: Unknown error or status raised :|
                break;
            case 4 /* CONNECTING */:
                console.log('New call status: Connecting!');
                break;
            case 1 /* DIALING */:
                console.log('New call status: Dialing!');
                break;
            case 5 /* ACTIVE */:
                console.log('New call status: Active!');
                const startTime = Date.now() - (this.callDurationCounter);
                if (this.callDurationInterval !== 0) {
                    break;
                }
                this.callDurationInterval = window.setInterval(() => {
                    this.callStatusText = `Call Duration: ${(Date.now() - startTime) / 1000}`;
                }, 1000);
                break;
            case 3 /* DISCONNECTED */:
                console.log('New call status: Disconnected!');
                this.callStatusText = '';
                break;
        }
    }
};
IncallPage.ctorParameters = () => [
    { type: _services_phone_service__WEBPACK_IMPORTED_MODULE_2__.PhoneService },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone }
];
IncallPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-incall',
        template: _raw_loader_incall_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_incall_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], IncallPage);



/***/ }),

/***/ 7059:
/*!*****************************************!*\
  !*** ./src/app/incall/incall.page.scss ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJpbmNhbGwucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ 952:
/*!*******************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/incall/incall.page.html ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header>\n  <ion-toolbar>\n    <ion-title>incall</ion-title>\n\n    <ion-button (click)=\"handleTouchConfirmEndCall()\">End call</ion-button>\n    <ion-button (click)=\"handleToggleMicrophone()\">{{isMicrophoneMuted ? 'Mute' : 'Unmute'}} microphone</ion-button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <a>{{callStatusText}}</a>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_incall_incall_module_ts.js.map