import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { UserLoged } from '../../models/auth.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PersonService } from '../services/person.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent implements OnInit {
  //Form Validables 
  registerForm: any = FormGroup;
  submitted = false;
  public user!: UserLoged;

  constructor(private formBuilder: FormBuilder, private _personService: PersonService, private _authService: AuthService) { }

  onLogin(): void {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this._personService.addPerson(this.registerForm.value).subscribe(
        (response: HttpResponse<UserLoged>) => {
          console.log(response);
        },
        (errorResponse: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorResponse.error.reason,
            footer: ''
          });
          console.error('Errooooooooooor' + errorResponse);
        });
    }
  }
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dateBirth: ['', [Validators.required]],
      address: ['', [Validators.required]],
      residence: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });

    this.loadPerson();
  }

  loadPerson() {
    this.user = this._authService.getUserFromLocalCache();
    if (this.user?.idUser) {
      this._personService.findPersonByIdUser(this.user.idUser).subscribe(
        (response: any) => {
          const person = response.data.person as PersonModel;
          this.registerForm.patchValue(person)
          console.log(response);
        });    
    }
  }
}
