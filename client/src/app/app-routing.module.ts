import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { AuthGuard } from './guard/auth.guard';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostSaleComponent } from './components/post-sale/post-sale.component';
import { RegisterComponent } from './components/register/register.component';
import { UserSalesComponent } from './components/user-sales/user-sales.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'all-sales', component: AllSalesComponent, canActivate: [AuthGuard] },
  { path: 'create-sale', component: PostSaleComponent, canActivate: [AuthGuard] },
  { path: 'user-sales', component: UserSalesComponent, canActivate: [AuthGuard] },
  { path: 'edit-profil', component: EditProfilComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
