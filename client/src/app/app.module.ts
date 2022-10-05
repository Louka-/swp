import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConnexionComponent } from './connexion/connexion.component';
import { HttpClientModule } from '@angular/common/http';
import { AllSalesComponent } from './all-sales/all-sales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { PostSaleComponent } from './post-sale/post-sale.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CarouselComponent } from './carousel/carousel.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { UserSalesComponent } from './user-sales/user-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    AllSalesComponent,
    EditProfilComponent,
    PostSaleComponent,
    CarouselComponent,
    CardDetailComponent,
    HomepageComponent,
    RegisterComponent,
    UserSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    NgxMatFileInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
