package br.com.projetoglace.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.model.ParceiroGlace;
import lombok.Data;

@Data
public class EstabelecimentoGlaceRequest {
	
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
	
	private Imagem foto;
	
	@NotNull
	private ParceiroGlace parceiroGlace;
		
}
