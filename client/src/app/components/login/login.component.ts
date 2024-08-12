import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,ButtonModule,InputTextModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password:string=''
  email:string=''
  submitted:boolean=false
  loginForm:FormGroup
  ngonInit(){
    
  }
  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
    });
  }

  get f():{[key: string]:AbstractControl}{
    return this.loginForm.controls
  }
  
  loginUser(){
    
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
  }
}