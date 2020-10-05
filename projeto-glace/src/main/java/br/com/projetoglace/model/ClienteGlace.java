package br.com.projetoglace.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name="cliente")
public class ClienteGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String nome;
	
	@Column
	private String sobrenome;
	
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name="data_nasc")
	private LocalDate dataNasc;
	
	@Column
	private String cpf;
	
	@Column
	private String email;
	
	@Column
	private String telefone;
	
	@Column
	private String senha;
	
	@Embedded
	private Endereco endereco;

}
