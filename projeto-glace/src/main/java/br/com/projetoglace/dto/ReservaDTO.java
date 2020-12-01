package br.com.projetoglace.dto;

import java.time.LocalDate;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ReservaDTO {

	private Long id;
	private LocalDate dataReserva;
	private EstabelecimentoGlace estabelecimento;
	private ClienteGlace cliente;
	private Long confirmarReserva;
	
}
