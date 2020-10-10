	package br.com.projetoglace.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.dto.ImagemDTO;
import br.com.projetoglace.request.ImagemRequest;
import br.com.projetoglace.service.ImagemService;

@CrossOrigin
@RestController
@RequestMapping("/imagem")
public class ImagemController {
	@Autowired
	private ImagemService service;
	
	@GetMapping
	public List<ImagemDTO> listar(){
		return service.listar();
	}
	
	@PostMapping
	public ImagemDTO salvarFoto(@Valid ImagemRequest imagem) {
		
		return service.salvar(imagem);
	}
	@DeleteMapping ("/{id}")
	public ResponseEntity<ImagemDTO> excluir (@PathVariable Long id){
		try {
			service.excluir(id);
			return ResponseEntity.noContent().build();
		}catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
}