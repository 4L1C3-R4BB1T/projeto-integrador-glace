import { Url } from 'url';
import { EstabelecimentoRepository } from 'src/app/estabelecimento-glace/repository/estabelecimento-repository';
import { EstabelecimentoEntity } from './../../estabelecimento-glace/entity/estabelecimento-entity';
import { ClienteRepository } from '../../cliente-glace/repository/cliente-repository';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {

  estados: any[] = [];
  cidades: any[] = [];
  public submitted: boolean = false;
  public formulario: FormGroup;
  meusCards: any[]=[];
  acessibilidadesSelecionadas: any[]=[];
  estabelecimentosSelecionados: any[]=[];
  arrayEstabelecimentos: any[] = [
    { id: 1, tipo: 'Hotel' },
    { id: 2, tipo: 'Hotel Fazenda' },
    { id: 3, tipo: 'Pousada' },
    { id: 4, tipo: 'Café' },
    { id: 5, tipo: 'Restaurante' }
  ];
  arrayDeAcessibilidades: any[] = [
    { id: 1, tipo: 'Deficiência Motora', url:'./assets/images/mobilidade.png'},
    { id: 2, tipo: 'Deficiência Visual', url:'./assets/images/mobilidade.png' },
    { id: 3, tipo: 'Deficiência Auditiva', url:'./assets/images/mobilidade.png' },
    { id: 4, tipo: 'Deficiência Intelectual', url:'./assets/images/mobilidade.png' }
  ];
  constructor(private router: Router,private repository: EstabelecimentoRepository,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  get listaEstabelecimentos() {
    return this.formulario.controls.estabelecimentos as FormArray;
  }
  get listaAcessibilidades() {
    return this.formulario.controls.acessibilidades as FormArray;
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      cidade: [''],
      estado: [''],
      estabelecimentos: new FormArray([]),
      acessibilidades: new FormArray([]),
    });
    this.adicionarCheckboxEstabelecimentos();
    this.adicionarCheckboxAcessibilidades();
  } 
  private adicionarCheckboxEstabelecimentos() {
    this.arrayEstabelecimentos.forEach(() => this.listaEstabelecimentos.push(new FormControl(false)));
  }
  private adicionarCheckboxAcessibilidades() {
    this.arrayDeAcessibilidades.forEach(() => this.listaAcessibilidades.push(new FormControl(false)));
  }
  
  buscar(){
    let param: string = '';
    this.meusCards = [];
    this.estabelecimentosSelecionados= this.formulario.value.estabelecimentos
    .map((checked, i) => checked ? this.arrayEstabelecimentos[i].tipo : null)
    .filter(v => v !== null);
    this.acessibilidadesSelecionadas= this.formulario.value.acessibilidades
    .map((checked, i) => checked ? this.arrayDeAcessibilidades[i].tipo : null)
    .filter(v => v !== null);

    if(this.formulario.value.estado != '' && this.formulario.value.estado != null){
      if (param == ''){
        param += "?estado="+this.formulario.value.estado;
      }else{
        param += "&estado="+this.formulario.value.estado;
      }
    }
    if(this.formulario.value.cidade != '' && this.formulario.value.cidade != null){     
      if (param == ''){    
        param += "?cidade="+this.formulario.value.cidade;       
      }else{
        param += "&cidade="+this.formulario.value.cidade;
      }
    }
    this.estabelecimentosSelecionados.forEach(element => {
      if(element != '' && element != null){     
        if (param == ''){    
          param += "?tiposEstabelecimento="+element;       
        }else{
          param += "&tiposEstabelecimento="+element;
        }
      }
      
    });
    this.acessibilidadesSelecionadas.forEach(element => {
      if(element != '' && element != null){     
        if (param == ''){    
          param += "?tiposAcessibilidades="+element;       
        }else{
          param += "&tiposAcessibilidades="+element;
        }
      }
      
    });
    console.log(this.formulario.value.estado)
    console.log(param)
    console.log(this.formulario.value.cidade)
    console.log(this.estabelecimentosSelecionados);
    console.log(this.acessibilidadesSelecionadas);

    this.repository.getAllEstabelecimentos(param).subscribe(resposta => {
    this.meusCards.push({
      id: resposta.id,
      nome: resposta.nome,
      descricao: resposta.descricao,
      cnpj: resposta.cnpj,
      //acessibilidades: resposta.acessibilidades,
      endereco: resposta.endereco,
      tipoEstabelecimento: resposta.tipoEstabelecimento,
      foto: resposta.foto,
    });
  });
    this.limparFormulario();
    console.log(this.meusCards);
}
  limparFormulario() {
    this.submitted = false;
    this.formulario.reset();
    this.cidades = [];
    this.estados = [];
    this.listarEstados();
  }
  
  listarCidades() {
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
    });
  }

  listarEstados() {
    this.repository.getAllEstados().subscribe(resposta => {
      this.estados.push({ label: resposta.nome, value: resposta.id });
    });
  }
}
