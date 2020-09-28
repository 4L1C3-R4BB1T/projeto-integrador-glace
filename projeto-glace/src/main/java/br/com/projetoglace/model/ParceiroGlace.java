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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Entity
@Table(name = "parceiro")
public class ParceiroGlace {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "razao_social")
	private String razaoSocial;
	
	@Column
	private String cnpj;
	
	@Column
	private String email;
	
	@Column
	private String telefone;
	
	@Column
	private String senha;
		
	@OneToMany(mappedBy = "parceiroGlace", cascade = CascadeType.ALL)
	private List<Estabelecimento> estabelecimentos;
}
