import { EstabelecimentoModel } from './../model/estabelecimento-model';
import { EstabelecimentoRepository } from './../repository/estabelecimento-repository';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ReservaRepository } from '../repository/reserva-repository';
import { ReservaModel } from '../model/reserva-model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estabelecimento-list',
  templateUrl: './estabelecimento-list.component.html',
  styleUrls: ['./estabelecimento-list.component.css']
})
export class EstabelecimentoListComponent implements OnInit {

  clientes: EstabelecimentoModel[] = [];
  loading: boolean;
  usuario: string = '';
  @ViewChild('dt') table: Table;
  reservas: ReservaModel[] = [];
  public formulario: FormGroup;

  constructor(
    public service: AuthService,
    private repository: EstabelecimentoRepository,
    private confirmarService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private repositoryReserva: ReservaRepository,
    private title: Title) { this.usuario = this.service.jwtPayload.usuario_id; }

  ngOnInit() {
    this.loading = true;
    this.carregarEstabelecimento();
    this.iniciarFormulario();
  }


  iniciarReserva(d: number, idCliente: number, idEsrabelecimento: number, num: number) {
    this.repositoryReserva.getReservaById(d).subscribe(resposta => {
      this.formulario.controls.data.setValue(resposta.dataReserva);
      console.log(this.formulario.value.data);
    });
    if (num == 1) {
      setTimeout(() => {
        this.confirmarReserva(d, idCliente, idEsrabelecimento);
        this.limparFormulario();
      },
        1000);

    } else if (num == 2) {
      setTimeout(() => {
        this.desconfirmarReserva(d, idCliente, idEsrabelecimento);
        this.limparFormulario();
      },
        1000);
    }

  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      data: ['']
    });
  }

  carregarEstabelecimento() {
    //Pegado id do parceiro por meio do token
    const codigo = this.service.jwtPayload.usuario_id;
    this.title.setTitle('Lista de clientes');
    this.clientes = [];
    this.repository.getAllEstabelecimentosParceiros(codigo).then(resposta => {
      this.clientes = resposta;
      this.loading = false;
    });
  }

  carregarReservas(id: number) {
    this.reservas = [];
    this.repositoryReserva.getAllReservasByEstabelecimento(id).then(resposta => {
      this.reservas = resposta;
      this.loading = false;
    });
  }
  limparFormulario() {
    this.formulario.reset();
  }

  confirmarReserva(id: number, idCliente: number, idEsrabelecimento: number) {
    console.log(id);
    console.log(this.formulario.value.data);
    if (this.formulario.value.data) {
      const dados = {
        dataReserva: this.formulario.value.data,
        id: id,
        confirmarReserva: 1,
        cliente: {
          id: idCliente
        },
        estabelecimento: {
          id: idEsrabelecimento
        },
      } as ReservaModel;
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'RESERVA',
          detail: 'Reserva confirmada com sucesso!'
        });
      this.repositoryReserva.putReserva(dados).subscribe(resposta => {
        this.limparFormulario();
        this.carregarReservas(idEsrabelecimento);
      });
    }
  }

  desconfirmarReserva(id: number, idCliente: number, idEsrabelecimento: number) {
    if (this.formulario.value.data) {
      const dados = {
        dataReserva: this.formulario.value.data,
        id: id,
        confirmarReserva: 0,
        cliente: {
          id: idCliente
        },
        estabelecimento: {
          id: idEsrabelecimento
        },
      } as ReservaModel;
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'RESERVA',
          detail: 'Reserva cancelada com sucesso!'
        });
      this.repositoryReserva.putReserva(dados).subscribe(resposta => {
        this.limparFormulario();
        this.carregarReservas(idEsrabelecimento);
      });
    }

  }

  excluir(id: number) {
    this.confirmarService.confirm({
      message: 'Tem certeza que deseja excluir este Estabelecimento?',
      accept: () => {
        this.repository.deleteEstabelecimento(id).subscribe(resposta => {
          this.messageService.add(

            {
              key: 'toast',
              severity: 'success',
              summary: 'ESTABELECIMENTO',
              detail: 'excluído com sucesso!'
            });

          this.carregarEstabelecimento();
        });
      }
    });
  }

  excluirReserve(id: number, idEsrabelecimento: number) {
    this.repositoryReserva.deleteReserva(id).subscribe(resposta => {
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'RESERVA',
          detail: 'cancelada com sucesso!'
        });
      this.carregarReservas(idEsrabelecimento);
    });
  }

}

