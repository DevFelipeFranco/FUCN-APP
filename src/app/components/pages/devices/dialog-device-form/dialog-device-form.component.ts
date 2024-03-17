import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceModel } from '../../../models/device.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-device-form',
  templateUrl: './dialog-device-form.component.html',
  styleUrl: './dialog-device-form.component.css'
})
export class DialogDeviceFormComponent {

  registerForm: any = FormGroup;

  constructor(private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<DialogDeviceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceModel) { }

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
      model: ['', [Validators.required]],
      reference: ['', [Validators.required]],
    });
  }
}
