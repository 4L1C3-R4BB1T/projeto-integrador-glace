package br.com.projetoglace.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.projetoglace.controller.openapi.ReservaControllerOpenApi;
import br.com.projetoglace.dto.ReservaDTO;
import br.com.projetoglace.model.Reserva;
import br.com.projetoglace.request.ReservaRequest;
import br.com.projetoglace.service.ReservaService;

@CrossOrigin
@RestController
@RequestMapping ("/reserva")
public class ReservaController implements ReservaControllerOpenApi {

	@Autowired
	private ReservaService service;
	
	@Override
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> salvarReserva(@RequestBody ReservaRequest reservaRequest) {	
		try {
			ReservaDTO reservaDto = service.salvarReserva(reservaRequest);			
			return ResponseEntity.status(HttpStatus.CREATED).body(reservaDto);
		
		}catch(Exception ex) {
			return ResponseEntity.badRequest().body(ex.getMessage());
		}		
	}
		
	@Override
	@GetMapping
	public List<Reserva> listarReserva(){
		return service.listarReserva();
	}
	
	@Override
	@GetMapping("/{id}/cliente")
	public List<Reserva> listarReservaPorCliente(@PathVariable Long id) {
		return service.listarReservaPorCliente(id);
	}

	@Override
	@DeleteMapping("/{id}")
	public ResponseEntity<Reserva> excluirReserva(@PathVariable Long id) {
		try {
			service.excluirReserva(id);	
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}
	
}
