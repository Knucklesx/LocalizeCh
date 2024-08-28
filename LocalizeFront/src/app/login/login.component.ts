import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../helper/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    const { email, senha } = this.loginForm.value;
    this.http
      .post<UserInterface>('http://localhost:5048/api/Login/login', {
        email,
        senha,
      })
      .subscribe(
        (response) => {
          if (response) {
            console.log('response', response);

            this.router.navigate(['/main']);
          }
        },
        (error) => {
          console.error('E-mail ou Senha incorreto', error);
        }
      );
  }

  CadastrarUser() {
    this.router.navigate(['/cadastro']);
  }
}
