package br.com.projetoglace.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;


@Entity
@Table(name = "cliente")
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
	private String telefone;
	
	@Column
	private String endereco;
	
	@Column
	private String senha;
	
	@Column
	private String confirmarSenha;
	
	public ClienteGlace() {
		
	}  
	
	


	public ClienteGlace(Long id, String nome, String sobrenome, String dataNasc, String cpf, String email,
			String telefone, String endereco, String confirmarSenha, String senha) {
		this.id = id;
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.dataNasc = dataNasc;
		this.cpf = cpf;
		this.email = email;
		this.telefone = telefone;
		this.endereco = endereco;
		this.senha = senha;
		this.confirmarSenha = confirmarSenha;
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
	
	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
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

	
	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}




	public String getConfirmarSenha() {
		return confirmarSenha;
	}




	public void setConfirmarSenha(String confirmarSenha) {
		this.confirmarSenha = confirmarSenha;
	}




	@Override
	public String toString() {
		return "ClienteGlace [id=" + id + ", nome=" + nome + ", sobrenome=" + sobrenome + ", dataNasc=" + dataNasc
				+ ", cpf=" + cpf + ", email=" + email + ", telefone=" + telefone + ", endereco=" + endereco + ", senha="
				+ senha + ", confirmarSenha=" + confirmarSenha + "]";
	}



	

	}
