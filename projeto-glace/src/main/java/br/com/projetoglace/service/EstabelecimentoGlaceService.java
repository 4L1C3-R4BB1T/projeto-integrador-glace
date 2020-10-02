package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.repository.CidadeRepository;
import br.com.projetoglace.repository.EstabelecimentoRepository;
import br.com.projetoglace.repository.EstadoRepository;

@Service
public class EstabelecimentoGlaceService {

	@Autowired
	private EstabelecimentoRepository repository;
	
	@Autowired
	private EstadoRepository estadoReposity;
	
	@Autowired
	private CidadeRepository cidadeReposity;
	
	@Autowired
	private ParceiroGlaceService parceiroGlaceService; 
	//@Autowired
	//private ParceiroGlaceMapper mapper;
	
	@Transactional
	public void salvar(Long id, EstabelecimentoGlace estabelecimento) {
		
		Optional<ParceiroGlace> glace = parceiroGlaceService.buscar(id);
		ParceiroGlace parceiroGlace = glace.get();
			
		estabelecimento.setParceiroGlace(parceiroGlace);
		
		estadoReposity.save(estabelecimento.getEndereco().getCidade().getEstado());
		cidadeReposity.save(estabelecimento.getEndereco().getCidade());
		
		repository.save(estabelecimento);
	}
	
	public List<EstabelecimentoGlace> listar() {
		return repository.findAll();
	}
	
}
