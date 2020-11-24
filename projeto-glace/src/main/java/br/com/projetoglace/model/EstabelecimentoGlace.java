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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@Entity
@Table(name="estabelecimento")
public class EstabelecimentoGlace {

	@EqualsAndHashCode.Include
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private String cnpj;
	
	@Column(nullable = false)
	private String telefone;
	
	@Column(nullable = false)
	private String descricao;
	
	@Column(nullable = false)
	private String tipoEstabelecimento;
	
	@ManyToOne
	@JoinColumn(name="parceiro_id", nullable=false)
	private ParceiroGlace parceiroGlace;
	
	@ManyToMany
	@JoinTable(name = "estabelecimento_acessibilidade", joinColumns = @JoinColumn(name = "estabelecimento_id"))
	@Column(name = "acessibilidade_id")
	private List<Acessibilidade> acessibilidades;
	
	@Embedded
	private Endereco endereco;
	
	@ManyToOne	
	private Imagem foto;
	
	@JsonIgnore	
	@OneToMany(mappedBy="estabelecimento")
	private List<Reserva> reservas;
	
}
