import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../core/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent implements OnInit {
  @Input() fields: any[] = [];
  @Input() API: string = '';
  @Input() Cancel: string = '';

  form: FormGroup = new FormGroup({}); 

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const formGroup: { [key: string]: any } = {};  // Allow dynamic keys
    this.fields.forEach(field => {
      formGroup[field.name] = ['', this.getValidators(field.validations)];
    });
    this.form = this.fb.group(formGroup);
  }  

  getValidators(validations: any): any[] {
    const validatorsArray = [];
    if (validations.required) validatorsArray.push(Validators.required);
    if (validations.minlength) validatorsArray.push(Validators.minLength(validations.minlength));
    if (validations.email) validatorsArray.push(Validators.email);
    if (validations.min) validatorsArray.push(Validators.min(validations.min));
    return validatorsArray;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.http.post(this.API, this.form.value).subscribe((response) => { 
        console.log('Form submitted successfully');
      }); 
    } else {
      console.log('Form is invalid');
    }
  }

  onReset(): void {
    this.form.reset();
  }

  onCancel(): void {
    // Navigate to the previous page 
    this.router.navigate([this.Cancel]); 
  }

  onDelete(): void {
    console.log('Delete action triggered'); 
    this.http.delete(this.API).subscribe((response) => { 
      console.log('Form deleted successfully'); 
    }); 
  }

  onUpdate(): void {
    console.log('Update action triggered'); 
    this.http.put(this.API, this.form.value).subscribe((response) => { 
      console.log('Form updated successfully'); 
    }); 
  }
}
