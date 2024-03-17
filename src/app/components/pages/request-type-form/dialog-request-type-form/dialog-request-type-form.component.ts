import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RequestTypeModel } from '../../../models/request-type.model';

@Component({
  selector: 'app-dialog-request-type-form',
  templateUrl: './dialog-request-type-form.component.html',
  styleUrl: './dialog-request-type-form.component.css'
})
export class DialogRequestTypeFormComponent implements OnInit {
  registerForm: any = FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<DialogRequestTypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RequestTypeModel) { }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    this.data = this.registerForm.value;
    this.dialogRef.close(this.data);
  }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
}
