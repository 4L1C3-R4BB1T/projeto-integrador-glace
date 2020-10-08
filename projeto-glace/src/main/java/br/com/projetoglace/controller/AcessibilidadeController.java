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

import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.repository.AcessibilidadeGlaceRepository;

@CrossOrigin
@RestController
@RequestMapping ("/acessibilidade")
public class AcessibilidadeController {

	@Autowired
	private AcessibilidadeGlaceRepository acessibilidadeGlaceRepository;
	
	//POST - insert
	//PUT - Update
	//GET - select
	//Delete - Delete
	@PostMapping
	public void salvar(@RequestBody Acessibilidade acessibilidade) {
		acessibilidadeGlaceRepository.save(acessibilidade);
	}
	
	@GetMapping("/listar")
	public List<Acessibilidade> listarAcessibilidade(){
		return acessibilidadeGlaceRepository.findAll();
	}
	
	@GetMapping("/buscarAcessibilidade/{id}")
	public List<Acessibilidade> buscarAcessibilidade(@PathVariable Long id){
		return acessibilidadeGlaceRepository.bucarAAcessibilidade(id);
	}
	
}
