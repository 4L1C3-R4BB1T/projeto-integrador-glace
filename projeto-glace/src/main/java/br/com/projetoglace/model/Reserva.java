package br.com.projetoglace.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@Entity
@Table(name="reserva")
public class Reserva {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name="data_reserva")
	private LocalDate dataReserva;
	
	@ManyToOne
	@JoinColumn(name="cliente_id", nullable=false)
	private ClienteGlace cliente;
	
	
	@ManyToOne
	@JoinColumn(name="estabelecimento_id", nullable=false)
	private EstabelecimentoGlace estabelecimento;
	
	
}
