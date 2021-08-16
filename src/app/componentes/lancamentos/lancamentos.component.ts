import { Component, OnInit } from '@angular/core';
import { LancamentoService } from 'src/app/servicos/lancamento.service';
import { Lancamento } from 'src/app/models/lancamentos.models';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit {

  lancamentos: Lancamento[] = []

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    this.lancamentoService.listarTodos().subscribe(
      dados => this.lancamentos = dados.data.content,
      () => alert('Erro obtendo lançamentos.')
    );
  }

  urlLocalizacao(localizacao: string) {
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }

}