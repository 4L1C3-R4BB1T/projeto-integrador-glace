package br.com.projetoglace;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import br.com.projetoglace.dto.AcessibilidadeDTO;
import br.com.projetoglace.mapper.AcessibilidadeMapper;
import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.repository.AcessibilidadeGlaceRepository;
import br.com.projetoglace.request.AcessibilidadeRequest;

public class AcessibilidadeIT {

	@Autowired
	private AcessibilidadeGlaceRepository acessibilidadeRepository;
	
	@Autowired AcessibilidadeMapper mapper;
	
	@Test
	@PostMapping
	@Transactional
	public void salvar(@RequestBody Acessibilidade acessibilidade) {
		acessibilidadeRepository.save(acessibilidade);
	}
	
	@Test
	@Transactional
	public AcessibilidadeDTO salvarAcessibilidade(AcessibilidadeRequest acessibilidadeRequest) {
		
		Acessibilidade acessibilidade = new Acessibilidade();
		
	    acessibilidade = mapper.requestToModel(acessibilidadeRequest);
		
		if(acessibilidade.getTipoAcessibilidade() == null) {

		    acessibilidadeRepository.save(acessibilidade.getId());
		}
		acessibilidadeRepository.save(acessibilidade);

	    return mapper.modelToDTO(acessibilidadeRepository.save(acessibilidade));		
	}
	
	@Test
	@GetMapping("/listar")
	public List<Acessibilidade> listarAcessibilidade(){
		return acessibilidadeRepository.findAll();
	}
	
	@Test
	@GetMapping("/buscarAcessibilidade/{id}")
	public Acessibilidade buscarAcessibilidade(@PathVariable Long id){
		return acessibilidadeRepository.bucarAAcessibilidade(id);
	}
	
	@Test
	public Optional<Acessibilidade> findProductByTipoAcessibilidade(@PathVariable Long id){
		return acessibilidadeRepository.findById(id);
	}
	
}
