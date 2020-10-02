import { Cidade } from './../pesquisa/cidade';
import { Estado } from './../pesquisa/estado';
import { EstabelecimentoService } from './../estabelecimento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-local',
  templateUrl: './cadastro-local.component.html',
  styleUrls: ['./cadastro-local.component.css']
})
export class CadastroLocalComponent implements OnInit {

  estados: Estado[];
  cidades: Cidade[];

  estadoSelecionado: Estado;
  cidadeSelecionada: Cidade;

  constructor(private router: Router, private estabelecimentoService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.estabelecimentoService.listarEstados().subscribe(resposta =>
      this.estados = resposta as any);
  }

  listarCidades(idEstado: number) {
    this.estabelecimentoService.listarCidades(idEstado).subscribe(resposta =>
      this.cidades = resposta as any);
  }

}
