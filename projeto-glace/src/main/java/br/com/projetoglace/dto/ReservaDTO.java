package br.com.projetoglace.dto;

import java.time.LocalDate;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ReservaDTO {

	private Long id;
	private LocalDate data;
	private EstabelecimentoGlace estabelecimento_id;
	private ClienteGlace cliente_id;
}
