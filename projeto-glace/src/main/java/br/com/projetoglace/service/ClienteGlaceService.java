package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.ClienteGlaceMapper;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.ClienteGlaceRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.request.ClienteGlaceRequest;

@Service
public class ClienteGlaceService {

	@Autowired
	private ClienteGlaceRepository repository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private ClienteGlaceMapper mapper;
	
	@Transactional
	public ClienteGlaceDTO salvar(ClienteGlaceRequest clienteRequest) {
		ClienteGlace cliente = mapper.requestToModel(clienteRequest);
		
		if(cliente.getEndereco().getCidade().getId() == null) {
			estadoRepository.save(cliente.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(cliente.getEndereco().getCidade());
		}
	    return mapper.modelToDTO(repository.save(cliente));		
	}
	
	@Transactional
	public void atualizar(ClienteGlace cliente) {
		repository.save(cliente);		
	}
	
	public Optional<ClienteGlace> buscar(Long id) {
		return repository.findById(id);
	}
	
	@Transactional
	public void excluir(Long id) {
		try {
			repository.deleteById(id);
			repository.flush();
		} catch (EmptyResultDataAccessException e) {
			throw new ClienteNaoEncontradoException(id);
		};			
	}
	
	public List<ClienteGlaceDTO> listar() {	
		return repository.findAll()
				.stream()
				.map(cli -> mapper.modelToDTO(cli))
				.collect(Collectors.toList());	
	}
	
}
