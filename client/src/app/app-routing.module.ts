import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { PostSaleComponent } from './post-sale/post-sale.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'all-sales', component: AllSalesComponent },
  { path: 'create-sale', component: PostSaleComponent },
  { path: 'user-sales', component: PostSaleComponent },
  { path: 'edit-profil', component: EditProfilComponent },
  //create-sale
  //profil
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
