package br.com.projetoglace.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.sun.istack.NotNull;

import br.com.projetoglace.model.Endereco;
import lombok.Data;

@Data
public class ClienteGlaceRequest {

	private Long id;
	@NotNull
	private String nome;
	@NotNull
	private String sobrenome;
	@NotNull
	private String telefones;
	@NotNull
	private String cpf;		
	@NotBlank
	private String senha;	
	@Email
	private String email;
	@NotNull
	private Endereco endereco;
}
