import{ ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersEditComponent } from './components/usersEdit.component';
import { HomeComponent } from './components/home.component';
import { HomeAdminComponent } from './components/homeAdmin.component';
import { SpeedOfServiceComponent } from './components/speedOfService.component';


const appRoutes: Routes = [ 
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usersEdit', component: UsersEditComponent},
    {path: 'homeAdmin', component: HomeAdminComponent},
    {path: 'speedOfService', component: SpeedOfServiceComponent},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);