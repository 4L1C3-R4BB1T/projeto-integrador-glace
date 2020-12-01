package br.com.projetoglace.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
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
	@GetMapping("/{id}")
	public ResponseEntity<Reserva> listarReserva(@PathVariable Long id) {
		Optional<Reserva> reserva = service.listarResera(id);
		if (reserva.isPresent()) {
			return ResponseEntity.ok(reserva.get());
		}
		return ResponseEntity.notFound().build();
	}

	
	@Override
	@GetMapping("/{id}/cliente")
	public List<Reserva> listarReservaPorCliente(@PathVariable Long id) {
		return service.listarReservaPorCliente(id);
	}
	
	@Override
	@GetMapping("/{id}/estabelecimento")
	public List<Reserva> listarReservaPorEstabelecimento(@PathVariable Long id) {
		return service.listarReservaPorEstabelecimento(id);
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
	
	@Override
	@PutMapping("/{id}")
	public ResponseEntity<?> atualizarRezerva(@RequestBody Reserva reserva, @PathVariable Long id) {
		Reserva reservaAtual = service.buscarReserva(id).orElse(null);
		if (reserva != null) {
			BeanUtils.copyProperties(reserva, reservaAtual, "id");
			service.atualizarRezerva(reservaAtual);
			return ResponseEntity.ok(reservaAtual);
		}	
		return ResponseEntity.notFound().build();
	}
	
}
