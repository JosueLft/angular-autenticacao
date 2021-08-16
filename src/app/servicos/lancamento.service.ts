import { HttpClient, HttpHeaderResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment as env } from "src/environments/environment";
import { HttpService } from "./http.service";

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
}