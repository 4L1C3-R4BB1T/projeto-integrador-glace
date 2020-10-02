package br.com.projetoglace.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ParceiroGlaceRequest {
	
	private Long id;
	private String nome;
	private String sobrenome;
	private String dataNasc;
	@NotNull
	@NotBlank
	private String cpf;
	@NotNull
	@NotBlank
	private String email;
	private String telefone;
	private String endereco;
	private String senha;
	private List<EstabelecimentoGlace> estabelecimentos;
}
