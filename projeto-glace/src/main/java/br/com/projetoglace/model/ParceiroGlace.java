package br.com.projetoglace.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name="parceiro")
public class ParceiroGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String razao;
	
	@Column
	private String cnpj;

	@Column
	private String email;
	
	@Column
	private String telefone;
	
	@Embedded
	private Endereco endereco;
	
	@Column
	private String senha;
		
	@OneToMany(mappedBy = "parceiroGlace", cascade = CascadeType.ALL)
	private List<EstabelecimentoGlace> estabelecimentos;
	
	@OneToOne
	private Imagem foto;
}
