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
import { ClientInterface } from '../helper/client-interface';

@Component({
  selector: 'app-add-charge',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-charge.component.html',
  styleUrl: './add-charge.component.css',
})
export class AddChargeComponent implements OnInit {
  clients: ClientInterface[] = [];
  formCadastro: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.formCadastro = this.fb.group({
      description: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      clientID: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients() {
    this.http
      .get<ClientInterface[]>('http://localhost:5048/api/Cliente')
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.clients = response;
          return this.clients;
        },
        error: (error) => {
          console.error('Erro ao buscar clientes', error);
        },
      });
  }

  onSubmit() {
    if (this.formCadastro.valid) {
      const formValue = this.formCadastro.value;
      formValue.date = new Date(formValue.date).toISOString();
      console.log('submit', formValue);
    }
  }

  BackToMain() {
    this.router.navigate(['/main']);
  }

  formatCurrency(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    event.target.value = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
