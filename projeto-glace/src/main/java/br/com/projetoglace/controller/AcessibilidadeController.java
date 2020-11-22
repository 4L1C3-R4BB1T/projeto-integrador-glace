package br.com.projetoglace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.AcessibilidadeControllerOpenApi;
import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.repository.AcessibilidadeGlaceRepository;

@CrossOrigin
@RestController
@RequestMapping ("/acessibilidade")
public class AcessibilidadeController implements AcessibilidadeControllerOpenApi{

	@Autowired
	private AcessibilidadeGlaceRepository acessibilidadeRepository;
	
	@Override
	@PostMapping
	public void salvar(@RequestBody Acessibilidade acessibilidade) {
		acessibilidadeRepository.save(acessibilidade);
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
	
	@GetMapping("findProductByTipoAcessibilidade")
	public List<Acessibilidade> findProductByTipoAcessibilidade(@PathVariable String tipoAcessibilidade){
	return acessibilidadeRepository.findProductByTipoAcessibilidade(tipoAcessibilidade);
}
}