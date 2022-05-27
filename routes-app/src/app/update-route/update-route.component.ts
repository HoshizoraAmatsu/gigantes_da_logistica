import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { RotaService } from '../routes/route.service';
import { Rota } from '../routes/routes.model';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrls: ['./update-route.component.css']
})
export class UpdateRouteComponent implements OnInit {
  rotas: any;
  private rotasSubscription?: Subscription;

  constructor(public routeService: RotaService) { }

  ngOnInit(): void {
    this.rotas = this.routeService.getRotas();
    this.routeService
      .getListaDeRotasAtualizadaObservable()
      .subscribe((rotas: Rota[]) => {
        this.rotas = rotas;
      })
  }

  ngOnDestroy(): void {
    this.rotasSubscription?.unsubscribe();
  }
}
