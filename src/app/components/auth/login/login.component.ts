import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserLoged } from '../../models/auth.model';
import { HeaderType } from '../../pages/person/enum/header-type.enum';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //Form Validables 
  registerForm: any = FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private _authService: AuthService) {

  }

  toggleSignUpMode() {
    const container = document.querySelector(".container");
    container ? container.classList.add("sign-up-mode") : console.log("Vacio");
  }

  toggleSignInMode() {
    const container = document.querySelector(".container");
    container ? container.classList.remove("sign-up-mode") : console.log("Vacio");
    //this.onLogin();
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
      this._authService.addBook(this.registerForm.value).subscribe(
        (response: HttpResponse<UserLoged>) => {
          console.log(response);
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          token ? this._authService.saveToken(token) : null;
          response.body ? this._authService.addUserToLocalCache(response.body) : null;
          this.router.navigateByUrl('/dashboard')
        },
        (errorResponse: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: "Usuario o contraseña incorrecta",
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
      password: ['', [Validators.required]]
    });
  }
}
