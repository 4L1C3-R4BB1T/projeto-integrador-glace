import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ParceiroModel } from './../model/parceiro-model';
import { ParceiroRepository } from './../repository/parceiro-repository';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro-parceiro',
  templateUrl: './cadastro-parceiro.component.html',
  styleUrls: ['./cadastro-parceiro.component.css'],
  providers: [MessageService]
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

  constructor(
    private repository: ParceiroRepository,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      id: [null],
      razao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      cnpj: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      confirmarsenha: ['', Validators.required],
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

    const formData: any = new FormData();
    formData.append('imagem', this.uploadedFiles[0]);
     
    this.repository.postImagem(formData).subscribe(resposta => {      
      this.imagem = resposta.id;

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

        } as ParceiroModel;

        if (dados.id) {
          this.repository.putParceiro(dados).subscribe(resposta => {
            this.limparFormulario();
          });
        } else {
          this.repository.postParceiro(dados).subscribe(resposta => {
            this.mensagem = [
              {
                severity: 'success',
                summary: 'Parceiro',
                detail: 'cadastrado com sucesso!'
              }];
            this.limparFormulario();
          },
          (e) => {
              var msg: any[] = [];
              //Erro Principal
              msg.push({
                severity: 'error',
                summary: 'ERRO',
                detail: e.error.userMessage
              });
              //Erro de cada atributo
              var erros = e.error.objects;
              erros.forEach(function (elemento) {
                msg.push(
                  {
                    severity: 'error',
                    summary: 'ERRO',
                    detail: elemento.userMessage
                  });
              });
              this.mensagem = msg;
            }
          );
        }
        
      });     
    }

    listarEstados() {
      this.repository.getAllEstados().subscribe(resposta => {
        this.estados.push({ label: resposta.nome, value: resposta.id });
      });
    }
    listarCidades() {
      this.cidades = [];
      let id: number = this.formulario.value.estado;
      this.repository.getAllCidadesByEstado(id).subscribe(resposta => {
        this.cidades.push({ label: resposta.nome, value: resposta.id });
      });
    }

    limparFormulario() {
      this.submitted = false;
      this.formulario.reset();
      this.cidades = [];
      this.estados = [];
      this.listarEstados();
      (this.upload as any).clear();
    }

    enviarImagem(evento){
      this.uploadedFiles = [];
      
      for(let file of evento.files) {
        this.uploadedFiles.push(file);
      }    
      
    }

 }
