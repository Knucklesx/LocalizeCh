import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddChargeComponent } from './add-charge/add-charge.component';
import { CadastroUserComponent } from './cadastro-user/cadastro-user.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { UserChargesComponent } from './user-charges/user-charges.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro', component: CadastroUserComponent },
  { path: 'main', component: MainComponent },
  { path: 'add-charge', component: AddChargeComponent },
  { path: 'user-charges/:id', component: UserChargesComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
