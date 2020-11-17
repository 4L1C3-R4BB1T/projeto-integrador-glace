package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.ReservaDTO;
import br.com.projetoglace.model.Reserva;
import br.com.projetoglace.request.ReservaRequest;

@Component
public class ReservaMapper {
	
	@Autowired
    private ModelMapper modelMapper;

    public Reserva requestToModel(ReservaRequest reservaRequest) {
        return modelMapper.map(reservaRequest, Reserva.class);
    }
    
    public ReservaDTO modelToDTO(Reserva reserva) {
        return modelMapper.map(reserva, ReservaDTO.class);
    }
    
}