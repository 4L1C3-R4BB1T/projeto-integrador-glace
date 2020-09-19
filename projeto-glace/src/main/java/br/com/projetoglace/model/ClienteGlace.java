package br.com.projetoglace.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.format.annotation.DateTimeFormat;

public class ClienteGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long id;
	
	@Column
	private String nome;
	
	@Column
	private String sobrenome;
	
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name= "data_nasc")
	private String dataNasc;
	
	@Column
	private String cpf;
	
	@Column
	private String email;
	
	@Column
	private String rg;
	
	@Column
	private String telefone;
	
	public ClienteGlace() {
		
	}  
	
	

	public ClienteGlace(Long id, String nome, String sobrenome, String dataNasc, String cpf, String email, String rg,
			String telefone) {
	
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.dataNasc = dataNasc;
		this.cpf = cpf;
		this.email = email;
		this.rg = rg;
		this.telefone = telefone;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSobrenome() {
		return sobrenome;
	}

	public void setSobrenome(String sobrenome) {
		this.sobrenome = sobrenome;
	}

	
	public String getDataNasc() {
		return dataNasc;
	}



	public void setDataNasc(String dataNasc) {
		this.dataNasc = dataNasc;
	}
	
	public String getCpf() {
		return cpf;
	}



	public void setCpf(String cpf) {
		this.cpf = cpf;
	}



	public String getRg() {
		return rg;
	}



	public void setRg(String rg) {
		this.rg = rg;
	}



	public String getTelefone() {
		return telefone;
	}



	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}



	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}



	@Override
	public String toString() {
		return "Cliente [id=" + id + ", nome=" + nome + ", sobrenome=" + sobrenome + ", dataNasc=" + dataNasc + ", cpf="
				+ cpf + ", email=" + email + ", rg=" + rg + ", telefone=" + telefone + "]";
	}

	

}
