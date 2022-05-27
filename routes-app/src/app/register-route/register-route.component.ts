import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RotaService } from '../routes/route.service';

@Component({
  selector: 'app-register-route',
  templateUrl: './register-route.component.html',
  styleUrls: ['./register-route.component.css']
})
export class RegisterRouteComponent{
  constructor(public routeService: RotaService) {}

  onRegistrarRota(f: NgForm) {
    if (f.invalid) {
      return;
    }

    this.routeService.registrarRota(
      f.value.pontoOrigem,
      f.value.pontoDestino,
      f.value.dist
    );

    f.resetForm();
  }
}
