package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ClienteGlaceResumoDTO;
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
			    
	    return mapper.modelToDTO( repository.save(cliente) );		
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

	public List<ClienteGlaceResumoDTO> listarResumo() {
		
		List<ClienteGlace> clientes = repository.findAll();
			
		return clientes
				.stream()
				.map(cli -> mapper.modelToDtoResumo(cli))
				.collect(Collectors.toList());

	}


	
//	public List<ClienteGlace> listar() {
//			
//			return repository.findAll();
//		}
//	public Optional<ClienteGlace> listar(Long id) {
//			
//			return repository.findById(id);
//		}
//
//	public Optional<ClienteGlace> buscar(Long id) {
//		return repository.findById(id);
//	}
//	
//	@Transactional
//	public void excluir(Long id) {
//		repository.deleteById(id);
//	}
	
	@Transactional
	public void atualizar (ClienteGlace clienteAtual, Long id) {
		ClienteGlace cl = repository.findById(id).get();
		
		cl.setNome(clienteAtual.getNome());
		cl.setSobrenome(clienteAtual.getSobrenome());
		cl.setDataNasc(clienteAtual.getDataNasc());
		cl.setCpf(clienteAtual.getCpf());
		cl.setEmail(clienteAtual.getEmail());
		cl.setTelefone(clienteAtual.getTelefone());
		cl.setEndereco(clienteAtual.getEndereco());
		cl.setSenha(clienteAtual.getSenha());
		
		repository.save(cl);
}

	
}
