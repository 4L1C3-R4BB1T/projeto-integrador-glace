package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.AcessibilidadeControllerOpenApi;
import br.com.projetoglace.dto.AcessibilidadeDTO;
import br.com.projetoglace.mapper.AcessibilidadeMapper;
import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.repository.AcessibilidadeGlaceRepository;
import br.com.projetoglace.request.AcessibilidadeRequest;

@CrossOrigin
@RestController
@RequestMapping ("/acessibilidade")
public class AcessibilidadeController implements AcessibilidadeControllerOpenApi{

	@Autowired
	private AcessibilidadeGlaceRepository acessibilidadeRepository;
	
	@Autowired AcessibilidadeMapper mapper;
	
	@Override
	@PostMapping
	@Transactional
	public void salvar(@RequestBody Acessibilidade acessibilidade) {
		acessibilidadeRepository.save(acessibilidade);
	}
	
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
	
	@Override
	@GetMapping("/listar")
	public List<Acessibilidade> listarAcessibilidade(){
		return acessibilidadeRepository.findAll();
	}
	
	@Override
	@GetMapping("/buscarAcessibilidade/{id}")
	public List<Acessibilidade> buscarAcessibilidade(@PathVariable Long id){
		return acessibilidadeRepository.bucarAAcessibilidade(id);
	}
	
	@GetMapping
	public Optional<Acessibilidade> findProductByTipoAcessibilidade(@PathVariable Long id){
		return acessibilidadeRepository.findById(id);
	}
	
}