import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from '../helper/modal-service.service';

@Component({
  selector: 'app-cadastro-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro-user.component.html',
  styleUrl: './cadastro-user.component.css',
})
export class CadastroUserComponent {
  formCadastro: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService
  ) {
    this.formCadastro = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    const { nome, email, senha } = this.formCadastro.value;
    this.http
      .post('http://localhost:5048/api/Users', { nome, email, senha })
      .subscribe({
        next: (response) => {
          if (response) console.log(response);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log('err', err.error.message);
          this.modalService.openErrorModal(err.error.message, 'cadastro');
        },
      });
  }

  BackToMain() {
    this.router.navigate(['/']);
  }
}
