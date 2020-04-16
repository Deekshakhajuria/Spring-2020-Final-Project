import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { MatDialogModule} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthService } from "./services/auth.service";
import { ValidateService } from "./services/validate.service";
import { AuthGuard } from "./guards/auth.guard";
import { ExpenseItemComponent } from './Components/expense-item/expense-item.component';
import { BarchartComponent } from "./Components/barchart/barchart.component";
import { PiechartComponent } from './Components/piechart/piechart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsComponent } from './Components/charts/charts.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    ExpenseItemComponent,
    BarchartComponent,
    PiechartComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatCardModule,
    FlashMessagesModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'register', component:RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
      {path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]},
      {path: 'barchart', component:BarchartComponent},
      {path: 'piechart', component:PiechartComponent},
      {path: 'charts', component:ChartsComponent},
    ]),
    FontAwesomeModule
  ],
  providers: [AuthService, ValidateService,AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [ExpenseItemComponent]
})
export class AppModule { }
