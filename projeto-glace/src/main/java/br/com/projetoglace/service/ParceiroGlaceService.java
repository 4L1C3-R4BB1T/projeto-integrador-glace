package br.com.projetoglace.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.ParceiroGlaceMapper;
import br.com.projetoglace.model.Grupo;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.model.UsuarioADMGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.repository.GrupoRepository;
import br.com.projetoglace.repository.ParceiroGlaceRepository;
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
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private GrupoRepository grupoRepository;
	
	@Transactional
	public ParceiroGlaceDTO salvar(ParceiroGlaceRequest parceiroRequest) {
		

		UsuarioADMGlace usuario = new UsuarioADMGlace();
		Grupo grupo = grupoRepository.findById(1L).get();
		Set<Grupo> grupos = new HashSet<>();
	    grupos.add(grupo);
	    usuario.setGrupos(grupos);
	    
		ParceiroGlace parceiro = mapper.requestToModel(parceiroRequest);
		parceiro.setSenha(passwordEncoder.encode(parceiroRequest.getSenha()));
		
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
