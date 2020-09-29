import { Cidade } from './../pesquisa/cidade';
import { Estado } from './../pesquisa/estado';
import { EstabelecimentoService } from './../estabelecimento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estados: Estado[];
  cidades: Cidade[];

  estadoSelecionado: Estado;
  cidadeSelecionada: Cidade;

  constructor(private router: Router,private clienteService: EstabelecimentoService) { }

  ngOnInit(): void {
    this.clienteService.listarEstados().subscribe(resposta =>
      this.estados = resposta as any);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  listarCidades(idEstado: number) {
    this.clienteService.listarCidades(idEstado).subscribe(resposta =>
      this.cidades = resposta as any);
  }
}
