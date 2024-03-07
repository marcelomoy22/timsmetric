import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {DataTableModule} from "angular2-datatable";

import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UsersEditComponent } from './components/usersEdit.component';
import { HomeComponent } from './components/home.component';
import { HomeAdminComponent } from './components/homeAdmin.component';
import { SpeedOfServiceComponent } from './components/speedOfService.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersEditComponent,
    HomeComponent,
    HomeAdminComponent,
    SpeedOfServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
