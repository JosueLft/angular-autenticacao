import { Component, OnInit, OnDestroy } from '@angular/core';
import { LancamentoService } from 'src/app/servicos/lancamento.service';
import { Lancamento } from 'src/app/models/lancamentos.models';
import { DataHoraService } from 'src/app/servicos/data-hora.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css']
})
export class LancamentosComponent implements OnInit, OnDestroy {

  lancamentos: Lancamento[] = [];
  dataHoraAtual = "";
  dataTempoReal = "";
  dataHoraAtualSub: Subscription | undefined;
  dataTempoRealSub: Subscription | undefined;

  constructor(private lancamentoService: LancamentoService,
              private dataHoraService: DataHoraService) { }

  ngOnDestroy(): void {
    this.dataHoraAtualSub?.unsubscribe();
    this.dataTempoRealSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.lancamentoService.listarTodos().subscribe(
      dados => this.lancamentos = dados.data.content,
      () => alert('Erro obtendo lançamentos.')
    );
    this.dataHoraAtualSub = this.dataHoraService.dataHora.subscribe(
      dataHora => this.dataHoraAtual = dataHora
    );
    this.dataHoraService.dataHoraTempoReal.subscribe(
      dataHora => this.dataTempoReal = dataHora
    );
  }

  urlLocalizacao(localizacao: string) {
    return "https://www.google.com/maps/search/?api=1&query=" + localizacao;
  }

  atualizarDataHora() {
    this.dataHoraService.atualizarDataHora();
  }

  downloadCSV() {
    this.lancamentoService.downloadCSV(this.lancamentos);
  }

  downloadPDF() {
    this.lancamentoService.downloadPDF(this.lancamentos);
  }

}