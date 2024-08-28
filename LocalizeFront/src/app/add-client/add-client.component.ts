import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GetUsers } from '../helper/user.interface';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  users: GetUsers[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      nome: ['', Validators.required],
      documento: ['', Validators.required],
      telefone: ['', Validators.required],
      endereço: ['', Validators.required],
      usuário: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.http.get<GetUsers[]>('http://localhost:5048/api/Users').subscribe({
      next: (response) => {
        this.users = response;
        return this.users;
      },
      error: (error) => {
        console.error('Erro ao buscar clientes', error);
      },
    });
  }

  onSubmit() {
    const formValue = this.clientForm.value;
    const payload = {
      documento: formValue.documento,
      endereço: formValue.endereço,
      nome: formValue.nome,
      telefone: formValue.telefone,
      usuárioId: parseInt(formValue.usuário),
    };
    // this.http.get('')
    this.http.post('http://localhost:5048/api/Cliente', payload).subscribe({
      next: () => {
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error('err', error);
      },
    });
  }
  BackToMain() {
    this.router.navigate(['/main']);
  }
}
