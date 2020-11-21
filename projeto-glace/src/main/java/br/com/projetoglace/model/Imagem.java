package br.com.projetoglace.model;

import java.net.URL;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
@Table(name = "fotos")
public class Imagem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String nomeArquivo;
	
	@Column
	private String nomeArquivoCompleto;
	@Column
	private String contentType;
	@Column
	private Long tamanho;
	
	@Column
	private URL url;
	
	@JsonIgnore
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="estabelecimento_id") 
	private EstabelecimentoGlace estabelecimento;
	
}
