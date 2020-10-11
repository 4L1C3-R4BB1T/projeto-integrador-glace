package br.com.projetoglace.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import lombok.Data;

@Data
public class ParceiroGlaceRequest {
	
private Long id;
	
	@NotNull
	@NotBlank
	private String razao;
	
	@NotNull
	@NotBlank
	private String cnpj;
	
	@Email
	@NotNull
	@NotBlank
	private String email;
	
	@NotNull
	private String telefone;
	
	@NotNull
	@NotBlank
	private String senha;
	
	@NotNull
	private Endereco endereco;
	
}
