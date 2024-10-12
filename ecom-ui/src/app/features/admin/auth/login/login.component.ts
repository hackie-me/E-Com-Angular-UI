import { HttpService } from './../../../../core/services/http.service';
import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class AdminLoginComponent {
    form!: UntypedFormGroup;
    loginObj: any = {};

    constructor(
        private router: Router,
        private fb: UntypedFormBuilder,
        private http: HttpService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        if(this.auth.isAuthenticated()){ 
            this.router.navigate(['/admin/dashboard']); 
        }
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
        this.http.post('auth/login', this.form.value).subscribe((res: any) => {
            if(res.status == "success"){
                this.auth.login(res.data.user, res.data.token.token);
                this.router.navigate(['/admin/dashboard']); 
            }else {
                console.log('Error:', res.message); 
            }
        });
    }
}