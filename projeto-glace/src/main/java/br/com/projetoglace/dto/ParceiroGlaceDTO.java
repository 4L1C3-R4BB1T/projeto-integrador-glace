package br.com.projetoglace.dto;

import java.util.List;

import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ParceiroGlaceDTO {

	private Long id;
	private String razao;
	private String cnpj;
	private String email;
	private String telefone;
	private String endereco;
	private String senha;
	private List<EstabelecimentoGlace> estabelecimentos;
	private ImagemDTO fotosParceiro;
	
}
