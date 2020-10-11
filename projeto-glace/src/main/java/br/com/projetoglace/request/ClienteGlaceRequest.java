package br.com.projetoglace.request;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.Imagem;
import lombok.Data;

@Data
public class ClienteGlaceRequest {

private Long id;
	
	@NotNull
	@NotBlank
	private String nome;
	
	@NotNull
	@NotBlank
	private String sobrenome;
	
	@NotNull
	private String telefone;
	
	
	private LocalDate dataNasc;
	
	@NotNull
	@NotBlank
	private String cpf;		
	
	@NotNull
	@NotBlank
	private String senha;	
	
	@Email
	@NotNull
	@NotBlank
	private String email;
	
	@NotNull
	private Endereco endereco;
	
	private Imagem foto;
	
}
