package br.com.projetoglace.dto;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.model.ParceiroGlace;
import lombok.Data;

@Data
public class EstabelecimentoDTO {
	
	private Long id;
	private String cnpj;
	private String nome;
	private String telefone;
	private String tipoEstabelecimento;
	private String descricao;
	private Endereco endereco;
	private Imagem foto;
	private ParceiroGlace parceiroGlace;
	
}

