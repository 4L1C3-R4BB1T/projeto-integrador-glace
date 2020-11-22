package br.com.projetoglace.request;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.model.Imagem;
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
	
	private Imagem foto;
	
	private List<EstabelecimentoGlace> estabelecimentos;
	
}
