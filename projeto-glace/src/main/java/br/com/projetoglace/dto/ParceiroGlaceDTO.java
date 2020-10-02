package br.com.projetoglace.dto;

import java.util.List;

import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ParceiroGlaceDTO {

	private Long id;
	private String nome;
	private String sobrenome;
	private String dataNasc;
	private String cpf;
	private String email;
	private String telefone;
	private String endereco;
	private String senha;
	private List<EstabelecimentoGlace> estabelecimentos;
	
}
