package br.com.projetoglace.dto;

import java.util.List;

import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.security.permissões.CheckSecurity.Parceiro;
import lombok.Data;

@Data
public class EstabelecimentoDTO {
	
	private Long id;
	private String razao;
	private String cnpj;
	private String email;
	private String telefone;
	private Endereco endereco;	
	private String senha;
	private List<Acessibilidade> acessibilidades;
	private ImagemDTO fotosParceiro;
	private ParceiroGlace parceiroGlace;
}

