import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './common/intro/intro.component';


const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', component: IntroComponent },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  { 
    path: 'back-office',
    loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule)
  },
  // TODO: CHANGE TO 404 or add a SnackBar informing about error
  { path: '**', redirectTo: '/intro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
