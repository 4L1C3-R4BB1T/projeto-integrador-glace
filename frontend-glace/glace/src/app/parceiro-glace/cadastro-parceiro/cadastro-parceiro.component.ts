import { Title } from '@angular/platform-browser';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ParceiroModel } from './../model/parceiro-model';
import { ParceiroRepository } from './../repository/parceiro-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css']
})
export class CadastroParceiroComponent implements OnInit {

  @ViewChild('upload') upload: ElementRef;
  
  public formulario: FormGroup;
  estados: any[] = [];
  cidades: any[] = [];
  imagem: number;

  public submitted: boolean = false;
  uploadedFiles: any[] = [];
  mensagem: Message[] = [];
  operacao: boolean = true;
  usuario: string = '';
  uploadFiles: any[]=[];
 

  constructor(
    public service: AuthService,
    private repository: ParceiroRepository,
    private fb: FormBuilder, 
    private messageService: MessageService,
    private route: ActivatedRoute,
    private title: Title
  ) { this.usuario = service.jwtPayload ? service.jwtPayload.nome_completo : '';}

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
    const codigoParceiro = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo cliente');
    console.log(codigoParceiro)
    if (codigoParceiro) {
      this.operacao = false;
      console.log("teste")
      this.carregarParceiro(codigoParceiro);
    }
  }
  carregarParceiro(codigoParceiro: number ){
    this.repository.getParceiroById(codigoParceiro).subscribe(resposta => {
      this.formulario.controls.id.setValue(resposta.id);
      this.formulario.controls.razao.setValue(resposta.razao);
      this.formulario.controls.cnpj.setValue(resposta.cnpj);
      this.formulario.controls.telefone.setValue(resposta.telefone);
      this.formulario.controls.email.setValue(resposta.email);
      this.formulario.controls.cep.setValue(resposta.endereco.cep);
      this.formulario.controls.rua.setValue(resposta.endereco.rua);
      this.formulario.controls.numero.setValue(resposta.endereco.numero);
      this.formulario.controls.bairro.setValue(resposta.endereco.bairro);
      this.formulario.controls.cidade.setValue(resposta.endereco.cidade.estado.id);
      this.listarCidadeSelecionada(resposta.endereco.cidade.id);
      this.imagem = resposta.foto.id;
     
  });
  }
  logout() {
    this.service.logout();      
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
              id: [null],
              razao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
              cnpj: ['', Validators.required],
              telefone: ['', Validators.required],
              email: ['', Validators.required],
              senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
              cep: ['', Validators.required],
              rua: ['', Validators.required],
              numero: ['', Validators.required],
              bairro: ['', Validators.required],
              cidade: ['', Validators.required],
              estado: ['', Validators.required],
    });
  }

  cadastrar() {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }
    this.salvar();
  };
  salvar() {
    if (this.imagem && !this.uploadedFiles[0]){
      this.salvarOuAtualizar();
    } else{
      const foto: any = this.uploadedFiles[0];
      const formData: any = new FormData(); 
      formData.append('imagem', foto);
      this.repository.postImagem(formData).subscribe(resposta => {
        this.imagem = resposta.id;
        this.salvarOuAtualizar();
    })
  }
}

  salvarOuAtualizar(){
    console.log(this.formulario.value.id);
    const dados = {
      id: this.formulario.value.id,
            razao: this.formulario.value.razao,
            cnpj: this.formulario.value.cnpj,
            telefone: this.formulario.value.telefone,
            email: this.formulario.value.email,
            senha: this.formulario.value.senha,
            confirmarsenha: this.formulario.value.confirmarsenha,
            endereco: {
              cep: this.formulario.value.cep,
              rua: this.formulario.value.rua,
              numero: this.formulario.value.numero,
              bairro: this.formulario.value.bairro,
              cidade: {
                id: this.formulario.value.cidade
        }
      },
      foto: {
        id: this.imagem
      }
  }as ParceiroModel;
  if (dados.id) {
    this.repository.putParceiro(dados).subscribe(resposta => {
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'PARCEIRO',
          detail: 'atualizado com sucesso!'
        });        
      this.limparFormulario();
    },
    (e) => {
        var msg: any[] = [];
        //Erro Principal
        msg.push({
          key: 'toast',
          severity: 'error',
          summary: 'ERRO',
          detail: e.error.userMessage
        });
        //Erro de cada atributo
        var erros = e.error.objects;
        erros.forEach(function (elemento) {
          msg.push(
            {
              key: 'toast',
              severity: 'error',
              summary: 'ERRO',
              detail: elemento.userMessage
            });
        });
        this.messageService.addAll(msg);
  });   
  } else {
    this.repository.postParceiro(dados).subscribe(resposta => {
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'PARCEIRO',
          detail: 'cadastrado com sucesso!'
        });
      //window.scrollTo(0, 0);
      this.limparFormulario();
    },
    (e) => {
        var msg: any[] = [];
        //Erro Principal
        msg.push({
          key: 'toast',
          severity: 'error',
          summary: 'ERRO',
          detail: e.error.userMessage
        });
        //Erro de cada atributo
        var erros = e.error.objects;
        erros.forEach(function (elemento) {
          msg.push(
            {
              key: 'toast',
              severity: 'error',
              summary: 'ERRO',
              detail: elemento.userMessage
            });
        });
        this.messageService.addAll(msg);
      }
    );
  }
  }
  limparFormulario() {
    this.submitted = false;
    this.formulario.reset();
    this.cidades = [];
    this.estados = [];
    this.listarEstados();
    (this.upload as any).clear();
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
  listarCidadeSelecionada(idCidade: number) {
    this.cidades = [];
    let id: number = this.formulario.value.estado;
    this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
      this.cidades.push({ label: resposta.nome, value: resposta.id });
      this.formulario.controls.cidade.setValue(idCidade);
    });
  }

  enviarImagem(evento){
    this.uploadedFiles = [];

    for(let file of evento.files) {
      this.uploadedFiles.push(file);
    }

  }

}


//   @ViewChild('upload') upload: ElementRef;
//   public formulario: FormGroup;
//   estados: any[] = [];
//   cidades: any[] = [];
//   imagem: number;
    
//   public submitted: boolean = false;

//   uploadedFiles: any[] = [];

//   mensagem: Message[] = [];

//   operacao: boolean = true;

//   constructor(
//     private repository: ParceiroRepository,
//     private fb: FormBuilder) { }


//   ngOnInit(): void {
//     this.iniciarFormulario();
//     this.listarEstados();
//   }

//   public iniciarFormulario() {
//     this.formulario = this.fb.group({
//       id: [null],
//       razao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
//       cnpj: ['', Validators.required],
//       telefone: ['', Validators.required],
//       email: ['', Validators.required],
//       senha: ['', Validators.required],
//       confirmarsenha: ['', Validators.required],
//       cep: ['', Validators.required],
//       rua: ['', Validators.required],
//       numero: ['', Validators.required],
//       bairro: ['', Validators.required],
//       cidade: ['', Validators.required],
//       estado: ['', Validators.required],

//     });
//   }

//   cadastrar() {
//     this.submitted = true;
//     if (this.formulario.invalid) {
//       return;
//     }
//     this.salvar();
//   };

//   salvar() {

//     const formData: any = new FormData();
//     formData.append('imagem', this.uploadedFiles[0]);
     
//     this.repository.postImagem(formData).subscribe(resposta => {      
//       this.imagem = resposta.id;

//     const dados = {
//       id: this.formulario.value.id,
//       razao: this.formulario.value.razao,
//       cnpj: this.formulario.value.cnpj,
//       telefone: this.formulario.value.telefone,
//       email: this.formulario.value.email,
//       senha: this.formulario.value.senha,
//       confirmarsenha: this.formulario.value.confirmarsenha,
//       endereco: {
//         cep: this.formulario.value.cep,
//         rua: this.formulario.value.rua,
//         numero: this.formulario.value.numero,
//         bairro: this.formulario.value.bairro,
//         cidade: {
//           id: this.formulario.value.cidade
//         }
//       },
//       foto: {
//         id: this.imagem
//       }

//         } as ParceiroModel;

//         if (dados.id) {
//           this.repository.putParceiro(dados).subscribe(resposta => {
//             this.limparFormulario();
//           });
//         } else {
//           this.repository.postParceiro(dados).subscribe(resposta => {
//             this.mensagem = [
//               {
//                 severity: 'success',
//                 summary: 'Parceiro',
//                 detail: 'cadastrado com sucesso!'
//               }];
//             this.limparFormulario();
//           },
//           (e) => {
//               var msg: any[] = [];
//               //Erro Principal
//               msg.push({
//                 severity: 'error',
//                 summary: 'ERRO',
//                 detail: e.error.userMessage
//               });
//               //Erro de cada atributo
//               var erros = e.error.objects;
//               erros.forEach(function (elemento) {
//                 msg.push(
//                   {
//                     severity: 'error',
//                     summary: 'ERRO',
//                     detail: elemento.userMessage
//                   });
//               });
//               this.mensagem = msg;
//             }
//           );
//         }
        
//       });     
//     }

//     listarEstados() {
//       this.repository.getAllEstados().subscribe(resposta => {
//         this.estados.push({ label: resposta.nome, value: resposta.id });
//       });
//     }
//     listarCidades() {
//       this.cidades = [];
//       let id: number = this.formulario.value.estado;
//       this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
//         this.cidades.push({ label: resposta.nome, value: resposta.id });
//       });
//     }

//     limparFormulario() {
//       this.submitted = false;
//       this.formulario.reset();
//       this.cidades = [];
//       this.estados = [];
//       this.listarEstados();
//       (this.upload as any).clear();
//     }

//     enviarImagem(evento){
//       this.uploadedFiles = [];
      
//       for(let file of evento.files) {
//         this.uploadedFiles.push(file);
//       }    
      
//     }

//  }
