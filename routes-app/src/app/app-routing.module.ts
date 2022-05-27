import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindRouteComponent } from './find-route/find-route.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { UpdateRouteComponent } from './update-route/update-route.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'home-page', component: HomePageComponent},
  { path: 'register-route', component: RegisterRouteComponent },
  { path: 'update-route', component: UpdateRouteComponent },
  { path: 'find-route', component: FindRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
