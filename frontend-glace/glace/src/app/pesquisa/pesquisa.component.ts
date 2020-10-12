import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from './estado';
import { Cidade } from './cidade';
import { EstabelecimentoService } from '../services/http/estabelecimento.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  estados: Estado[];
  cidades: Cidade[];

  estadoSelecionado: Estado;
  cidadeSelecionada: Cidade;

  constructor(private clienteService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.clienteService.listarEstados().subscribe(resposta =>
      this.estados = resposta as any);
  }

  listarCidades(idEstado: number) {
    this.clienteService.listarCidades(idEstado).subscribe(resposta =>
      this.cidades = resposta as any);
  }
}
