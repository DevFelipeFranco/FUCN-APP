import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { DeviceService } from '../services/device.service';
import { DeviceModel } from '../../models/device.model';
import { RequestTypeService } from '../services/request-type.service';
import { RequestTypeModel } from '../../models/request-type.model';
import { AuthService } from '../../auth/auth.service';
import { UserLoged } from '../../models/auth.model';
import { Subscription, map, share, timer } from 'rxjs';
import { PersonService } from '../services/person.service';
import { PersonModel } from '../../models/person.model';
import { LoanModel } from '../../models/loan.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit, OnDestroy {
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  //Form Validables 
  registerForm: any = FormGroup;
  submitted = false;
  devices!: DeviceModel[];
  requestTypes!: RequestTypeModel[];
  person!: PersonModel;
  loanModel!: LoanModel;

  public user!: UserLoged;

  rxTime = new Date();
  subscription!: Subscription;

  constructor(private _formBuilder: FormBuilder, private _deviceService: DeviceService, private _requestTypeService: RequestTypeService, private _personService: PersonService, private _authService: AuthService, private _loanService: LoanService) { }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  ngOnInit() {
    this.registerForm = this._formBuilder.group({
      firstName: new FormControl({ value: '', disabled: true }),
      lastName: new FormControl({ value: '', disabled: true }),
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      devices: ['', [Validators.required]],
      requestType: ['', [Validators.required]],
    });

    this.user = this._authService.getUserFromLocalCache();

    this._deviceService.findAllDevices().subscribe(
      (response: any) => {
        const devices = response.data.devices as DeviceModel[];
        this.devices = devices;

        console.log(response);
      });

    this._requestTypeService.findAllRequestType().subscribe(
      (response: any) => {
        const requestTypes = response.data.requestType as RequestTypeModel[];
        this.requestTypes = requestTypes;

        console.log(response);
      });

    this.getTimeNow();
    this.loadPerson();
  }

  onFormSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.loanModel = {
        description: this.registerForm.get('description').value,
        address: this.registerForm.get('address').value,
        idRequestType: this.registerForm.get('requestType').value?.idRequestType,
        idDevice: this.registerForm.get('devices').value?.idDevice,
        idPerson: this.person?.idPerson ? this.person?.idPerson : 0, // TODO: Validar si la persona no viene entonces generar un error
      };

    if (!this.person.idPerson) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se debe crear la persona antes de realizar la solicitud',
        footer: ''
      });
    } else {
      this._loanService.addLoan(this.loanModel).subscribe(
        (response: any) => {
          console.info(response);
        },
        (errorResponse: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorResponse.error.reason,
            footer: ''
          });
          console.error('Errooooooooooor '+  JSON.stringify(errorResponse.error.reason));
        }
      );
    }

    console.info(this.loanModel);
  } else {
  return;
}
  }

getTimeNow() {
  // Using RxJS Timer
  this.subscription = timer(0, 1000)
    .pipe(
      map(() => new Date()),
      share()
    )
    .subscribe(time => {
      let hour = this.rxTime.getHours();
      let minuts = this.rxTime.getMinutes();
      let seconds = this.rxTime.getSeconds();
      //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
      let NewTime = hour + ":" + minuts + ":" + seconds
      console.log(NewTime);
      this.rxTime = time;
    });
}

loadPerson() {
  this.user = this._authService.getUserFromLocalCache();
  if (this.user?.idUser) {
    this._personService.findPersonByIdUser(this.user.idUser).subscribe(
      (response: any) => {
        this.person = response.data.person as PersonModel;
        this.registerForm.patchValue({
          firstName: this.person.firstName,
          lastName: this.person.lastName
        })
        console.log(response);

      },
      (err: any) => {
        console.error(err);
      });
  }
}

  get f() { return this.registerForm.controls; }

ngOnDestroy() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}
}
