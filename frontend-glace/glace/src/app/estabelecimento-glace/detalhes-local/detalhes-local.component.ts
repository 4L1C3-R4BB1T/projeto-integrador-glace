import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaModel } from '../model/reserva-model';
import { ReservaRepository } from '../repository/reserva-repository';
import { Message, MessageService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detalhes-local',
  templateUrl: './detalhes-local.component.html',
  styleUrls: ['./detalhes-local.component.css']
})
export class DetalhesLocalComponent implements OnInit {

  public formulario: FormGroup;
  mensagem: Message[] = [];

  public codigo = this.route.snapshot.params['codigo'];

  constructor(
    public service: AuthService,
    private repository: ReservaRepository,
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      data_reserva: ['']
    });
  }

  fazerReserva() {
    const dados = {
      dataReserva: this.formulario.value.data_reserva,
      cliente: { 
        id: this.service.jwtPayload.usuario_id
      },
      estabelecimento: {
        id: this.codigo
      }
    } as ReservaModel;
    this.repository.postReserva(dados).subscribe(resposta => {
      this.messageService.add(
        {
          key: 'toast',
          severity: 'success',
          summary: 'RESERVA',
          detail: 'feita com sucesso!'
        });
      this.limparFormulario();
    }, (e) => {
        var msg: any[] = [];
        msg.push({
          key: 'toast',
          severity: 'error',
          summary: 'ERRO',
          detail: e.error.userMessage
        });
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

  limparFormulario() {
    this.formulario.reset();
  }

}
