import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { EditRouteComponent } from './edit-route/edit-route.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'register-route', component: RegisterRouteComponent },
  { path: 'edit-route', component: EditRouteComponent },
  { path: 'register-route/:idRota', component: RegisterRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
