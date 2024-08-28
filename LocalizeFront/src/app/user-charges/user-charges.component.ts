import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientInterface } from '../helper/client-interface';

@Component({
  selector: 'app-user-charges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-charges.component.html',
  styleUrls: ['./user-charges.component.css'],
})
export class UserChargesComponent implements OnInit {
  clients: ClientInterface = {} as ClientInterface;
  today: Date = new Date();

  constructor(
    private http: HttpClient,
    private router: Router,
    private actiRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    const myId = this.actiRouter.snapshot.paramMap.get('id');
    this.http
      .get<ClientInterface>(`http://localhost:5048/api/Cliente/${myId}`)
      .subscribe({
        next: (data: ClientInterface) => {
          this.clients = data;
        },
        error: (error: any) => {
          console.log('error', error);
        },
      });
  }

  isExpired(dataVencimento: string, paid: boolean): boolean {
    const vencimentoDate = new Date(dataVencimento);
    return vencimentoDate < this.today && !paid;
  }

  editClient(id: number) {
    console.log('editClient', id);
  }
  deleteClient(id: number) {}

  addCharge() {
    this.router.navigate(['/add-charge']);
  }

  cancelPage() {
    this.router.navigate(['/main']);
  }
}
