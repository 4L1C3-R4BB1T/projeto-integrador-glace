package br.com.projetoglace.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.email.EnvioEmailService;
import br.com.projetoglace.exception.EstabelecimentoNaoEncontradoException;
import br.com.projetoglace.filtro.EstabelecimentoFiltro;
import br.com.projetoglace.mapper.EstabelecimentoGlaceMapper;
import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.repository.AcessibilidadeGlaceRepository;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstabelecimentoRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;

@Service
public class EstabelecimentoGlaceService {

	@Autowired
	private EstabelecimentoRepository repository;
	
	@Autowired
	private AcessibilidadeGlaceRepository repositoryAcessibilidade;
	
	@Autowired
	private CidadeRepository cidadeRepository;
	
	@Autowired
	private EstadoRepository estadoRepository;
	
	@Autowired
	private EstabelecimentoGlaceMapper mapper;
	
	@Autowired
	EnvioEmailService envioMensagem;
	
	@Transactional
	public EstabelecimentoDTO salvar(EstabelecimentoGlaceRequest estabelecimentoRequest) {
		
		EstabelecimentoGlace estabelecimentoGlace = new EstabelecimentoGlace();
		
		estabelecimentoGlace = mapper.requestToModel(estabelecimentoRequest);
	
		if(estabelecimentoGlace.getEndereco().getCidade().getId() == null) {
			estadoRepository.save(estabelecimentoGlace.getEndereco().getCidade().getEstado());
		    cidadeRepository.save(estabelecimentoGlace.getEndereco().getCidade());
		}
	
		List<Acessibilidade> acessibilidades = new ArrayList<>();
		for(Acessibilidade acessibilidade: estabelecimentoRequest.getAcessibilidades()) {
			
			acessibilidades.add(repositoryAcessibilidade.bucarAAcessibilidade(acessibilidade.getId()));
		}
			
	    estabelecimentoGlace.setAcessibilidades(acessibilidades);
	    repository.save(estabelecimentoGlace);


		
	    return mapper.modelToDTO(repository.save(estabelecimentoGlace));		
	}
	
	public List<EstabelecimentoGlace> listar(EstabelecimentoFiltro filtro) {
		
		System.out.println(filtro.getTiposEstabelecimento());
		
		if(filtro.getTiposEstabelecimento() == null ) {
			Set<String> tipos = new HashSet<String>();
			tipos.add("Hotel");
			tipos.add("Pousada");
			tipos.add("Hotel Fazenda");
			tipos.add("Restaurante");
			tipos.add("Café");
			
			filtro.setTiposEstabelecimento(tipos);
		}
		if(filtro.getTiposAcessibilidades() == null) {
			Set<Long> tipos = new HashSet<Long>();
			tipos.add(1L);
			tipos.add(2L);
			tipos.add(3L);
			tipos.add(4L);
			filtro.setTiposAcessibilidades(tipos);
		}
			
		return repository.findAll(filtro.getCidade(), filtro.getEstado(), filtro.getTiposEstabelecimento(), filtro.getTiposAcessibilidades());
		
	}
	
	public Optional<EstabelecimentoGlace> buscarEstabelecimento(Long id) {
		return repository.findById(id);
	}

	@Transactional
	public void excluirEstabelecimento(Long id) {
		try {
			repository.deleteById(id);
			repository.flush();
		} catch (EmptyResultDataAccessException e) {
			throw new EstabelecimentoNaoEncontradoException(id);
		};			
	}

	@Transactional
	public void atualizarEstabelecimento(EstabelecimentoGlace estabelecimento) {
		repository.save(estabelecimento);		
		}
		
	}
	
