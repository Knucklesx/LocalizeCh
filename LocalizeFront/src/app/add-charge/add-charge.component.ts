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
      const valor = parseFloat(formValue.price.replace(/\D/g, '')) / 100;

      const payload = {
        descrição: formValue.description,
        valor: valor,
        data_Vencimento: new Date(formValue.date).toISOString(),
        pago: false,
        clienteId: formValue.clientID,
      };
      this.http.post('http://localhost:5048/api/Charge', payload).subscribe({
        next: () => {
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.error('Erro ao criar cobrança', error);
        },
      });
    }
  }

  BackToMain() {
    this.router.navigate(['/main']);
  }

  formatCurrency(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    value = (parseFloat(value) / 100).toFixed(2);
    event.target.value = parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
