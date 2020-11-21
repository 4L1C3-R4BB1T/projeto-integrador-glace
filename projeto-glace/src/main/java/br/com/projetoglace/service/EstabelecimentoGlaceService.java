package br.com.projetoglace.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.email.EnvioEmailService;
import br.com.projetoglace.filtro.EstabelecimentoFiltro;
import br.com.projetoglace.mapper.EstabelecimentoGlaceMapper;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstabelecimentoRepository;
import br.com.projetoglace.repository.EstadoRepository;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;

@Service
public class EstabelecimentoGlaceService {

	@Autowired
	private EstabelecimentoRepository repository;
	
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
//		Acessibilidade acessibilidade = repository.findById(id).get();
//		Set<Acessibilidade> acessibilidades = new HashSet<>();
//	    acessibilidades.add(acessibilidade);
//	    estabelecimentoGlace.setAcessibilidades(acessibilidades);
//	    repository.save(estabelecimentoGlace);
		
	    return mapper.modelToDTO(repository.save(estabelecimentoGlace));		
	}
	
	public List<EstabelecimentoGlace> listar(EstabelecimentoFiltro filtro) {
		
		System.out.println(filtro.getTiposEstabelecimento());
		
		if(filtro.getTiposEstabelecimento() == null) {
			Set<String> tipos = new HashSet<String>();
			tipos.add("Hotel");
			tipos.add("Pousada");
			tipos.add("Hotel Fazenda");
			tipos.add("Restaurantes");
			tipos.add("Cafés");
			filtro.setTiposEstabelecimento(tipos);
		}
		
		return repository.findAll(filtro.getCidade(), filtro.getEstado(), filtro.getTiposEstabelecimento());
	}
	
	public Optional<EstabelecimentoGlace> buscarEstabelecimento(Long id) {
		return repository.findById(id);
	}
	
}