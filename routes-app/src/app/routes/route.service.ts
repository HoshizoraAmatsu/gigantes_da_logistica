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

  getRota(idRota: string) {
    return this.httpClient
      .get<{_id: string, pontoOrigem: string, pontoDestino: string, dist: number}>
      (`http://localhost:4000/api/rotas/${idRota}`);
  }

  getRotas(): void {
    this.httpClient.get <{message: string, rotas: any}>('http://localhost:4000/api/rotas')
      .pipe(map((data) => {
        return data.rotas.map((rota: any) => {
          return {
            id: rota._id,
            pontoOrigem: rota.pontoOrigem,
            pontoDestino: rota.pontoDestino,
            dist: rota.dist
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
      dist: dist
    };
    this.httpClient.post<{message: string, id: string}>('http://localhost:4000/api/rotas', rota)
      .subscribe(
        (data) => {
          rota.id = data.id;
          this.rotas.push(rota);
          this.listaRotasAtualizada.next([...this.rotas]);
        }
      )

    console.log(this.rotas);
  }

  atualizarRota(id: string, pontoOrigem: string, pontoDestino: string, dist: number) {
    const rota: Rota = {id, pontoOrigem, pontoDestino, dist};
    console.log(rota)
    this.httpClient.put<Rota>(`http://localhost:4000/api/rotas/${id}`, rota)
      .subscribe((res => {
        const copy = [...this.rotas];
        const index = copy.findIndex(cli => cli.id === rota.id);
        copy[index] = rota;
        this.rotas = copy;
        this.listaRotasAtualizada.next([...this.rotas]);
      }));
  }

  removerRota(id:string): void {
    this.httpClient.delete(`http://localhost:4000/api/rotas/${id}`).subscribe(() => {
      this.rotas = this.rotas.filter((cli) => {
        return cli.id !== id
      });
      this.listaRotasAtualizada.next([...this.rotas]);
    })
  }
}
