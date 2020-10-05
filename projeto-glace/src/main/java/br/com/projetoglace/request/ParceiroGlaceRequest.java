package br.com.projetoglace.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import lombok.Data;

@Data
public class ParceiroGlaceRequest {
	
	private Long id;
	private String razao;
	@NotNull
	@NotBlank
	private String cnpj;
	@NotNull
	@NotBlank
	private String email;
	private String telefone;
	private Endereco endereco;
	private String senha;
	
}
