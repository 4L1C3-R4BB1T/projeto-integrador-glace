package br.com.projetoglace.dto;

import java.time.LocalDate;

import br.com.projetoglace.model.Endereco;
import br.com.projetoglace.model.ParceiroGlace;
import lombok.Data;

@Data
public class ClienteGlaceDTO {

	private Long id;
	private String nome;	
	private String sobrenome;		
	private String telefone;
	private LocalDate dataNasc;			
	private String cpf;		
	private String senha;	
	private String email;
	private Endereco endereco;	
	private ParceiroGlace parceiroGlace;
	private ImagemDTO foto;
}
