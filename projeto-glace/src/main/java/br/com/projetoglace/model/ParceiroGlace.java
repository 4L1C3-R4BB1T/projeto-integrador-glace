package br.com.projetoglace.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "parceiro")
public class ParceiroGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long id;
	
	@Column
	private String nome;
	
	@Column
	private String sobrenome;
	
	@DateTimeFormat(pattern="yyyy-mm-dd")
	@Column(name= "data_nasc")
	private String dataNasc;
	
	@NotNull
	@NotBlank
	@Column
	private String cpf;
	
	@NotNull
	@NotBlank
	@Column
	private String email;
	
	@Column
	private String telefone;
	
	@Column
	private String endereco;
	
	@Column
	private String senha;
		
	@OneToMany(mappedBy = "parceiroGlace", cascade = CascadeType.ALL)
	private List<EstabelecimentoGlace> estabelecimentos;
}
