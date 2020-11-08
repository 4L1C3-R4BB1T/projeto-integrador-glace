package br.com.projetoglace.security.config;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.repository.ClienteGlaceRepository;
import br.com.projetoglace.repository.ParceiroGlaceRepository;
import br.com.projetoglace.repository.UsuarioADMGlaceRepository;

@Service
public class JpaUserDetailsService implements UserDetailsService {

	private static final boolean UsuarioADMGlace = false;
	private static final boolean ParceiroGlace = false;
	@Autowired
	private UsuarioADMGlaceRepository usuarioRepository;
	@Autowired
	private ParceiroGlaceRepository parceiroRepository;
	@Autowired
	private ClienteGlaceRepository clienteRepository;
	
	
	@Transactional(readOnly = true)
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		if(UsuarioADMGlace) {
		UsuarioADMGlace usuario = usuarioRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com e-mail informado"));
		
		return new AuthUser(usuario, getAuthorities(usuario));
		}
		else if(ParceiroGlace) {
			ParceiroGlace parceiro = parceiroRepository.findByEmail(username)
					.orElseThrow(() -> new UsernameNotFoundException("Parceiro não encontrado com e-mail informado"));
			
			return new AuthUser(parceiro, getAuthorities(parceiro));
		}else {
			ClienteGlace cliente = clienteRepository.findByEmail(username)
					.orElseThrow(() -> new UsernameNotFoundException("Cliente não encontrado com e-mail informado"));
			
			return new AuthUser(cliente, getAuthorities(cliente));
		}
	}
	
	private Collection<GrantedAuthority> getAuthorities(UsuarioADMGlace usuario) {
		
		return usuario.getGrupos().stream()
				.flatMap(grupo -> grupo.getPermissoes().stream())
				.map(permissao -> new SimpleGrantedAuthority(permissao.getNome().toUpperCase()))
				.collect(Collectors.toSet());
	}
	
	//parceiro	
	private Collection<GrantedAuthority> getAuthorities(ParceiroGlace parceiro) {
		
		return parceiro.getGrupos().stream()
				.flatMap(grupo -> grupo.getPermissoes().stream())
				.map(permissao -> new SimpleGrantedAuthority(permissao.getNome().toUpperCase()))
				.collect(Collectors.toSet());
	}
	//cliente
	private Collection<GrantedAuthority> getAuthorities(ClienteGlace cliente) {
		
		return cliente.getGrupos().stream()
				.flatMap(grupo -> grupo.getPermissoes().stream())
				.map(permissao -> new SimpleGrantedAuthority(permissao.getNome().toUpperCase()))
				.collect(Collectors.toSet());
	}

}
