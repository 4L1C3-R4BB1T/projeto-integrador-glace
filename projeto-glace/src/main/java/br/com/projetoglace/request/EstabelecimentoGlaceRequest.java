package br.com.projetoglace.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.model.ParceiroGlace;
import lombok.Data;

@Data
public class EstabelecimentoGlaceRequest {
	
	private Long id;
	
	@NotNull
	@NotBlank
	private String cnpj;
	
	@NotNull
	@NotBlank
	private String tipoEstabelecimento;
	
	@NotNull
	@NotBlank
	private String nome;
	
	@NotNull
	@NotBlank
	private String telefone;
	
	@NotNull
	@NotBlank
	private String descricao;
	
	@NotNull
	private Endereco endereco;
	
	private Imagem foto;
	
	@NotNull
	private ParceiroGlace parceiroGlace;
		
}
