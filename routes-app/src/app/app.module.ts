import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterRouteComponent } from './register-route/register-route.component';
import { FooterComponent } from './footer/footer.component';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationComponent } from './navigation/navigation.component';

import { RotaService } from './routes/route.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterRouteComponent,
    FooterComponent,
    EditRouteComponent,
    HomePageComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [RotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
