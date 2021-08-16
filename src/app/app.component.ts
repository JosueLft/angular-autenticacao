import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './servicos/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  login: string = "login";

  constructor(private httpService: HttpService,
              private router: Router) {}

  ngOnInit(): void {}

  sair() {
    delete localStorage["token"];
    this.router.navigate(["/login"]);
  }

  autenticado() {
    return this.httpService.autenticado();
  }
}