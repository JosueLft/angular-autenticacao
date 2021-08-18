import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { Lancamento } from "../models/lancamentos.models";
import { HttpService } from "./http.service";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: "root"
})
export class LancamentoService {

  constructor(private http: HttpClient,
              private httpService: HttpService) {}

  listarTodos(): Observable<any> {
    this.http.post('url', {}, this.httpService.headers());
    this.http.put('url', {}, this.httpService.headers());
    this.http.delete('url', this.httpService.headers());
    
    const id = this.httpService.obterIdUsuario();
    return this.http.get(
      env.apiUrlBase + "api/lancamentos/funcionario/" + id,
      this.httpService.headers()
    );
  }

  downloadCSV(lancamentos: Lancamento[]) {
    const colunas = "ID,DATA,HORA,TIPO,LOCALIZACAO\n";
    const linhas: string[] = [];
    lancamentos.forEach(lanc => {
      const dataHora = lanc.data.split(" ");
      let linha = `${lanc.id},${dataHora[0]},${dataHora[1]},${lanc.tipo},"${lanc.localizacao}"`;
      linhas.push(linha);
    });
    // console.log(colunas + linhas.join("\n"));
    const dados = colunas + linhas.join("\n");
    const blob = new Blob([dados], { type: "text/csv" });
    saveAs(blob, "lancamentos.csv");
  }
}