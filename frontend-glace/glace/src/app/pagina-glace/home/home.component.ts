import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteRepository } from '../../cliente-glace/repository/cliente-repository';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  estados: any[] = [];
  cidades: any[] = [];
  public submitted: boolean = false;
  public formulario: FormGroup;

  constructor(private router: Router,private repository: ClienteRepository,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.listarEstados();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  public iniciarFormulario() {
    this.formulario = this.fb.group({
      cidade: [''],
      estado: [''],
    });
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
