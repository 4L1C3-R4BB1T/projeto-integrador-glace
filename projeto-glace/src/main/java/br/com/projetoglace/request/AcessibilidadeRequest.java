package br.com.projetoglace.request;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class AcessibilidadeRequest {

	private Long id;
	
	@NotNull
	private String tipoAcessibilidade;
}
