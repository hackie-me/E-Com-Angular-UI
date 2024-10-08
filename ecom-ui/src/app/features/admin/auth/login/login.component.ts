import { HttpService } from './../../../../core/services/http.service';
import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class AdminLoginComponent {
    form!: UntypedFormGroup;
    loginObj:any = {}; 

    constructor(private router: Router, private fb: UntypedFormBuilder, private http: HttpService) { }

    ngOnInit() {
        this.formSetup()
    }

    formSetup() {
        this.form = this.fb.group({
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            password: new UntypedFormControl('', [Validators.required]),
        });
    }

    validateForm() {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                this.form.controls[key].markAsTouched(); // markAsTouched instead of markAsUntouched
                this.form.controls[key].updateValueAndValidity(); // Update validity state
            }
        } else {
            console.log('Form Data:', this.form.value);
        }
    }

    login() {
        this.http.post('auth/login', this.form.value).subscribe(res => {
            console.log(res);
        })
    }
}