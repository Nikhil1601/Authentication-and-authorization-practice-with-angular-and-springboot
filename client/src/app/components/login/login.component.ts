import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecaptchaModule, ReCaptchaV3Service } from 'ng-recaptcha';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,ButtonModule,InputTextModule,ReactiveFormsModule,CommonModule,RecaptchaModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password:string=''
  email:string=''
  submitted:boolean=false
  loginForm:FormGroup
  recaptchaSubmitted:boolean=false
  // recaptchaService=Inject(ReCaptchaV3Service)

  ngonInit(){
    
  }


  constructor(private fb: FormBuilder, private recaptchaService: ReCaptchaV3Service){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
    });
  }

  get f():{[key: string]:AbstractControl}{
    return this.loginForm.controls
  }
  
  captcha(){
    //for using through button only V3
    this.recaptchaService.execute('login')
      .subscribe({
        next: (token: string) => {
          console.log('ReCAPTCHA token:', token);
          this.recaptchaSubmitted=true
        },
        error: (err: any) => {
          console.error('ReCAPTCHA error:', err);
        }
      });

    // for using through captcha given by google V2
    //pass token as param in function
    // console.log(token)
  }


  loginUser(){
    
    this.submitted = true;
    if (this.loginForm.invalid || this.recaptchaSubmitted === false) {
      return;
    }
    
    
  }
}