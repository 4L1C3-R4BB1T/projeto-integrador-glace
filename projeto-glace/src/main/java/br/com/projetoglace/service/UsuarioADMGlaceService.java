
package br.com.projetoglace.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.UsuarioADMGlaceDTO;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.UsuarioADMGlaceMapper;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.repository.UsuarioADMGlaceRepository;
import br.com.projetoglace.request.UsuarioADMGlaceRequest;

@Service
public class UsuarioADMGlaceService {

	@Autowired
	private UsuarioADMGlaceRepository repository;
	
	@Autowired
	private UsuarioADMGlaceMapper mapper;
	
	@Transactional
	public UsuarioADMGlaceDTO salvarUsuario(UsuarioADMGlaceRequest usuarioAdmRequest) {
		UsuarioADMGlace usuario = mapper.requestToModel(usuarioAdmRequest);

	    return mapper.modelToDTO(repository.save(usuario));		
	}
	
	@Transactional
	public void atualizarUsuario(UsuarioADMGlace usuario) {
		repository.save(usuario);		
	}
	
	public Optional<UsuarioADMGlace> buscarUsuario(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public void excluirUsuario(Long id) {
		try {
			repository.deleteById(id);
			repository.flush();
		} catch (EmptyResultDataAccessException e) {
			throw new ClienteNaoEncontradoException(id);
		};			
	}
	
	
}
