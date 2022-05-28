import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RotaService } from '../routes/route.service';
import { Rota } from '../routes/routes.model';

@Component({
  selector: 'app-register-route',
  templateUrl: './register-route.component.html',
  styleUrls: ['./register-route.component.css']
})
export class RegisterRouteComponent implements OnInit {
  private modo: string = "criar";
  private idRota: any;
  public rota?: Rota;

  ngOnInit() {
    this.actRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idRota")) {
        this.modo = "editar";
        this.idRota = paramMap.get("idRota");
        this.routeService.getRota(this.idRota).subscribe(dataCLI => {
          this.rota = {
            id: dataCLI._id,
            pontoOrigem: dataCLI.pontoOrigem,
            pontoDestino: dataCLI.pontoDestino,
            dist: dataCLI.dist
          };
        });
      } else {
        this.modo = "criar";
        this.idRota = null
      }
    });
  }

  constructor(public routeService: RotaService, public actRoute: ActivatedRoute) {}

  onSalvarRota(f: NgForm) {
    if (f.invalid) {
      return;
    }

    if(this.modo === "criar") {
      this.routeService.registrarRota(
        f.value.pontoOrigem,
        f.value.pontoDestino,
        f.value.dist
      );
    } else {
      this.routeService.atualizarRota(
        this.idRota,
        f.value.pontoOrigem,
        f.value.pontoDestino,
        f.value.dist
      )
    }

    f.resetForm();
  }
}
