	package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.ImagemControllerOpenApi;
import br.com.projetoglace.dto.ImagemDTO;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.request.ImagemRequest;
import br.com.projetoglace.service.ImagemService;

@CrossOrigin
@RestController
@RequestMapping("/imagem")
public class ImagemController implements ImagemControllerOpenApi {
	@Autowired
	private ImagemService service;
	
	@Override
	@GetMapping
	public List<ImagemDTO> listar(){
		return service.listar();
	}
	
	@Override
	@PostMapping
	public ImagemDTO salvarFoto(ImagemRequest imagem) {
		
		return service.salvar(imagem);
	}
	
	@Override
	@GetMapping("/{id}")
	public ResponseEntity<Imagem> buscar(@PathVariable Long id) {
		Optional<Imagem> imagem = Optional.empty();
		if (imagem.isPresent()) {
			return ResponseEntity.ok(imagem.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@Override
	@DeleteMapping ("/{id}")
	public ResponseEntity<Imagem> excluir (@PathVariable Long id){
		try {
			service.excluir(id);
			return ResponseEntity.noContent().build();
		}catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
}