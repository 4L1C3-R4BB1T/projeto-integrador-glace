package br.com.projetoglace.request;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UsuarioADMGlaceRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
		
	@NotNull
	@NotBlank
	private String nome;
	
	@Email
	@NotNull
	@NotBlank
	private String email;
	
	@NotNull
	@NotBlank
	private String senha;
	
}
