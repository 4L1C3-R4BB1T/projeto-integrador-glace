package br.com.projetoglace.dto;

import br.com.projetoglace.model.Endereco;
import lombok.Data;

@Data
public class ClienteGlaceResumoDTO {

	private long id;
	private String nome;
	private String sobrenome;
	private String email;
	private Endereco endereco;
	
}
