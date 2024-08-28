import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientInterface } from '../helper/client-interface';
import { ModalService } from '../helper/modal-service.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class MainComponent implements OnInit {
  clients: ClientInterface[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: ModalService
  ) {}

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.http
      .get<ClientInterface[]>('http://localhost:5048/api/Cliente')
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.clients = response.map((client) => {
            let pagos = 0;
            let abertos = 0;
            let atrasados = 0;
            client.charges.forEach((cobrança) => {
              if (cobrança.pago) {
                pagos++;
              } else {
                const dataVencimento = new Date(cobrança.data_Vencimento);
                const hoje = new Date();
                if (dataVencimento < hoje) {
                  atrasados++;
                } else {
                  abertos++;
                }
              }
            });

            return {
              ...client,
              pagos,
              abertos,
              atrasados,
            };
          });
        },
        error: (error) => {
          console.error('Erro ao buscar clientes', error);
        },
      });
  }

  addCharge() {
    this.router.navigate(['/add-charge']);
  }

  verifyCharges(clientId: number) {
    this.router.navigate(['/client-charges', clientId]);
  }

  editClient(clientId: number) {
    console.log(`oi ${clientId}`);
  }
  deleteClient(clientId: number) {
    console.log(`oi ${clientId}`);
  }
  someAction(clientId: number) {
    this.router.navigate(['/user-charges', clientId]);
  }
}
