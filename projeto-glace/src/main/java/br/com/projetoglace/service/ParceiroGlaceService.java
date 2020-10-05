package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.ClienteGlaceMapper;
import br.com.projetoglace.mapper.ParceiroGlaceMapper;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.ClienteGlaceRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.repository.ParceiroGlaceRepository;
import br.com.projetoglace.request.ClienteGlaceRequest;
import br.com.projetoglace.request.ParceiroGlaceRequest;

@Service
public class ParceiroGlaceService {

	@Autowired
	private ParceiroGlaceRepository repository;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private ParceiroGlaceMapper mapper;
	
	@Transactional
	public ParceiroGlaceDTO salvar(ParceiroGlaceRequest parceiroRequest) {
		ParceiroGlace parceiro = mapper.requestToModel(parceiroRequest);
		
		if(parceiro.getEndereco().getCidade().getId() == null) {
			estadoRepository.save(parceiro.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(parceiro.getEndereco().getCidade());
		}
	    return mapper.modelToDTO(repository.save(parceiro));		
	}
	
	@Transactional
	public void atualizar(ParceiroGlace parceiro) {
		repository.save(parceiro);		
	}
	
	public Optional<ParceiroGlace> buscar(Long id) {
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
	
	public List<ParceiroGlaceDTO> listar() {	
		return repository.findAll()
				.stream()
				.map(cli -> mapper.modelToDTO(cli))
				.collect(Collectors.toList());	
	}
	
}
