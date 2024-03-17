import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserLoged } from '../../models/auth.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //Form Validables 
  registerForm: any = FormGroup;
  submitted = false;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private _authService: AuthService) {

  }

  onLogin(): void {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      this._authService.signup(this.registerForm.value).subscribe(
        (response: HttpResponse<UserLoged>) => {
          console.log(response);
          this.router.navigateByUrl('/')
        },
        (errorResponse: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El usuario ya existe por favor ingresa un nuevo nombre de usuario',
            footer: ''
          });
          console.error('Errooooooooooor');
        });
    }
  }
  get f() { return this.registerForm.controls; }

  ngOnInit() {
    //Add User form validations
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
