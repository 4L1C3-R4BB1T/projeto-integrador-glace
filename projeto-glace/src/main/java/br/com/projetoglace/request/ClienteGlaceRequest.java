package br.com.projetoglace.request;

import java.time.LocalDate;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import lombok.Data;

@Data
public class ClienteGlaceRequest {

	private Long id;
	private String nome;	
	private String sobrenome;		
	private String telefone;
	private LocalDate dataNasc;
	@NotNull
	private String cpf;		
	@NotBlank
	private String senha;	
	@Email
	private String email;
	private Endereco endereco;
	
}
