import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.models';
import { HttpService } from 'src/app/servicos/http.service';
import { LoginService } from 'src/app/servicos/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(5)]],
    senha: ["", [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private httpService: HttpService) { }

  ngOnInit(): void {
    if(this.httpService.autenticado()) {
      this.router.navigate(["/"]);
    }
  }

  logar() {
    if(this.form.invalid) {
      return;
    }
    const login: Login = this.form.value;
    this.loginService.logar(login).subscribe(
      dados => {
        localStorage["token"] = dados.data.token;
        this.router.navigate(['/']);
      },
      erro => {
        if (erro.status === 401) {
          alert('Email ou senha inválido(s).');
        } else if (erro.status === 400) {
          alert(erro.error.errors.join());
        } else {
          alert('Erro relizando login. Tente novamente.')
        }
      }
    );
    this.form.reset();
  }

}