package br.com.projetoglace.request;

import java.time.LocalDate;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.EstabelecimentoGlace;
import lombok.Data;

@Data
public class ReservaRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	private LocalDate dataReserva;
	
	@NotNull
	private EstabelecimentoGlace estabelecimento;
	
	@NotNull
	private ClienteGlace cliente;
	
}
