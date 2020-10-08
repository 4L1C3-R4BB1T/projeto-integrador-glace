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

import br.com.projetoglace.model.EstabelecimentoGlace;

import br.com.projetoglace.service.EstabelecimentoGlaceService;

@CrossOrigin
@RestController
@RequestMapping ("/estabelecimento")
public class EstabelecimentoController {
	
	@Autowired
	private EstabelecimentoGlaceService service;
	
	@PostMapping("/{id}/parceiro")
	public void salvar(@PathVariable Long id,  @RequestBody EstabelecimentoGlace estabelecimento) {
		service.salvar(id, estabelecimento);
	}
	
	@GetMapping("/listar")
	public List<EstabelecimentoGlace> listarEstabelecimentos(){
		return service.listar();
	}
	
}
