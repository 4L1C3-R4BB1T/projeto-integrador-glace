package br.com.projetoglace.security.config;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.model.UsuarioADMGlace;
import lombok.Getter;

@Getter
public class AuthUser extends User {

private static final long serialVersionUID = 1L;
	
	private Long userId;
	private String nomeCompleto;

	
	public AuthUser(UsuarioADMGlace usuario, Collection<? extends GrantedAuthority> permissoes) {
		super(usuario.getEmail(), usuario.getSenha(), permissoes);
		
		this.userId = usuario.getId();
		this.nomeCompleto = usuario.getNome();
	}
	public AuthUser(ClienteGlace cliente, Collection<? extends GrantedAuthority> permissoes) {
		super(cliente.getEmail(), cliente.getSenha(), permissoes);
		
		this.userId = cliente.getId();
		this.nomeCompleto = cliente.getNome();
	}
	public AuthUser(ParceiroGlace parceiro, Collection<? extends GrantedAuthority> permissoes) {
		super(parceiro.getEmail(), parceiro.getSenha(), permissoes);
		
		this.userId = parceiro.getId();
		this.nomeCompleto = parceiro.getRazao();
	}
	
}
