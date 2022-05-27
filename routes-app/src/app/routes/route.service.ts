import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Subject } from "rxjs";
import { Rota } from "./routes.model";

@Injectable({ providedIn: 'root' })
export class RotaService {
  private rotas: Rota[] = [];
  private listaRotasAtualizada = new Subject<Rota[]>();

  constructor(private httpClient: HttpClient) {

  }

  getRotas(): void {
    this.httpClient.get <{message: string, rotas: any}>('http://localhost:4000/api/rotas')
      .pipe(map((data) => {
        return data.rotas.map((rota: any) => {
          return {
            id: rota._id,
            pontoOrigem: rota.pontoOrigem,
            pontoDestino: rota.pontoDestino,
            dist: rota.dist,
            status: rota.status
          }
        })
      }))
      .subscribe(
        (rotas) => {
          this.rotas = rotas;
          this.listaRotasAtualizada.next([...this.rotas]);
        }
      )
  }

  getListaDeRotasAtualizadaObservable() {
    return this.listaRotasAtualizada.asObservable();
  }

  registrarRota(pontoOrigem: string, pontoDestino: string, dist: number) {
    const rota: Rota = {
      id: null,
      pontoOrigem: pontoOrigem,
      pontoDestino: pontoDestino,
      dist: dist,
      status: true
    };
    this.httpClient.post<{message: string}>('http://localhost:4000/api/rotas', rota)
      .subscribe(
        (data) => {
          console.log(data.message);
          this.rotas.push(rota);
          this.listaRotasAtualizada.next([...this.rotas]);
        }
      )

    console.log(this.rotas);
  }
}
