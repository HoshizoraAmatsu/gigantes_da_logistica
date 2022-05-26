import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { FooterComponent } from './footer/footer.component';
import { UpdateRouteComponent } from './update-route/update-route.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DeleteRouteComponent } from './delete-route/delete-route.component';
import { FindRouteComponent } from './find-route/find-route.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterRouteComponent,
    FooterComponent,
    UpdateRouteComponent,
    HomePageComponent,
    NavigationComponent,
    DeleteRouteComponent,
    FindRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
