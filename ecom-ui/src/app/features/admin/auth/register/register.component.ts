import { Component } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from "@angular/forms";
import { HttpService } from "../../../../core/services/http.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-admin-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})

export class AdminRegisterComponent {
    form!: UntypedFormGroup;
    loginObj: any = {};

    constructor(private router: Router, private fb: UntypedFormBuilder, private http: HttpService) { }

    ngOnInit() {
        this.formSetup()
    }

    formSetup() {
        this.form = this.fb.group({
            firstName: new UntypedFormControl('', [Validators.required]),
            lastName: new UntypedFormControl('', [Validators.required]),
            username: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required, Validators.email]),
            password: new UntypedFormControl('', [Validators.required]),
            password_confirm: new UntypedFormControl('', [Validators.required]),
        });
    }

    validateForm(): boolean {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                this.form.controls[key].markAsTouched(); // markAsTouched instead of markAsUntouched
                this.form.controls[key].updateValueAndValidity(); // Update validity state
            }

            return false;
        }
        return true;
    }

    register() {
        if(this.validateForm()) {
            this.http.post('auth/register', this.form.value).subscribe(res => {
                
            })
        }
    }
}