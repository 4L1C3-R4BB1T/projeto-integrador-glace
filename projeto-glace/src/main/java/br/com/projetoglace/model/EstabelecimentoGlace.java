package br.com.projetoglace.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "estabelecimento")
public class EstabelecimentoGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String nome;
	
	@Column
	private String cnpj;
	
	@Column
	private String telefone;
	
	@Column
	private String descricao;
	
	@Column 
	String tipoEstabelecimento;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="parceiro_id", nullable = false) 
	private ParceiroGlace parceiroGlace;
	
	@ManyToMany
	@JoinTable(name = "estabelecimento_acessibilidade", joinColumns = @JoinColumn(name = "estabelecimento_id"))
	@Column(name = "acessibilidade_id")
	private List<Acessibilidade> acessibilidades;
	
	@Embedded
	private Endereco endereco;
	
	@ManyToOne
	private Imagem foto;
}
