import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RotaService } from '../routes/route.service';
import { Rota } from '../routes/routes.model';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {
  rotas: any;
  private rotasSubscription?: Subscription;

  constructor(public routeService: RotaService) { }

  ngOnInit(): void {
    this.rotas = this.routeService.getRotas();
    this.routeService
      .getListaDeRotasAtualizadaObservable()
      .subscribe((rotas: Rota[]) => {
        this.rotas = rotas;
      });
  }

  ngOnDestroy(): void {
    this.rotasSubscription?.unsubscribe();
  }

  onDelete(id: string): void {
    this.routeService.removerRota(id);
  }
}
