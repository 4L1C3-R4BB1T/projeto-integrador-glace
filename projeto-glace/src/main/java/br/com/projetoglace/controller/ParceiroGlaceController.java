package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.request.ParceiroGlaceRequest;
import br.com.projetoglace.service.ParceiroGlaceService;


@CrossOrigin
@RestController
@RequestMapping ("/parceiro")
public class ParceiroGlaceController {

	@Autowired
	private ParceiroGlaceService service;
	
	//POST - insert
	//PUT - Update
	//GET - select
	//Delete - Delete
	@PostMapping
	public ResponseEntity<?> salvar(@RequestBody @Valid ParceiroGlaceRequest request) {
		try {
			ParceiroGlaceDTO parceiro = service.salvar(request);
			return ResponseEntity.status(HttpStatus.CREATED).body(parceiro);
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}	
	}
	
	@GetMapping("/{id}")
	public Optional<ParceiroGlace> buscar(@PathVariable Long id) {
		return service.buscar(id);
	}
	
	@GetMapping
	public List<ParceiroGlace> listar(){
		return service.listar();
	}
//	
//	@GetMapping("/{id}/email")
//	public List<ClienteGlace> buscarEmail(@PathVariable Long id) {
//		return service.buscarEmail(id);
//	}
//	
	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
	
	@PutMapping("/{id}")
	public void atualizar(@PathVariable Long id, @RequestBody ParceiroGlace parceiro) {
	service.atualizar(id, parceiro);
		
}
	}
