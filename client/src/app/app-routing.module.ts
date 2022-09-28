import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { ConnexionComponent } from './connexion/connexion.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'all-sales', component: AllSalesComponent },
  //create-sale
  //profil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
