import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public formulario: FormGroup;
  public submitted: boolean = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }


  public iniciarFormulario(){
    this.formulario= this.fb.group({
      login: ['', Validators.required],
      senha: ['', [Validators.required]]
    });
  }
  logar(){
    this.submitted= true;
    if (this.formulario.invalid){
      return;
    }
    //fazer a chamada
    const login = this.formulario.value.login;
    const senha = this.formulario.value.senha;

    this.service.console.login(login,senha);
    
  }
}
