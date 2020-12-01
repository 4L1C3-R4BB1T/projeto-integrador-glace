package br.com.projetoglace.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import br.com.projetoglace.dto.ReservaDTO;
import br.com.projetoglace.exception.ClienteNaoEncontradoException;
import br.com.projetoglace.mapper.ReservaMapper;
import br.com.projetoglace.model.Reserva;
import br.com.projetoglace.repository.ReservaRepository;
import br.com.projetoglace.request.ReservaRequest;

@Service
public class ReservaService {
	
	@Autowired 
	private ReservaRepository repository;
	
	@Autowired 
	private ReservaMapper mapper;

	public List<Reserva> listarReserva() {
		return repository.findAll();
	}
	
	public List<Reserva> listarReservaPorCliente(Long id) {
		return repository.listarReservaPorCliente(id);
	}
	
	public Optional<Reserva> listarResera(Long id) {
		return repository.findById(id);
	}
	
	public Optional<Reserva> buscarReserva(Long id) {
		return repository.findById(id);
	}
	
	public List<Reserva> listarReservaPorEstabelecimento(Long id) {
		return repository.listarReservaPorEstabelecimento(id);
	}
	
	@Transactional
	public void atualizarRezerva(Reserva reserva) {
		repository.save(reserva);		
	}

	@Transactional
	public void excluirReserva(Long id) {
		try {
			repository.deleteById(id);
			repository.flush();
		} catch (EmptyResultDataAccessException e) {
			throw new ClienteNaoEncontradoException(id);
		}		
	}

	@Transactional
	public ReservaDTO salvarReserva(ReservaRequest reservaRequest) {
		Reserva reserva = new Reserva();	
		reserva = mapper.requestToModel(reservaRequest);
		return mapper.modelToDTO(repository.save(reserva));		
	}

}
