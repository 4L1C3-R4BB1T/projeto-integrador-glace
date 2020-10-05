package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.ClienteGlaceDTO;
import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.model.ClienteGlace;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.request.ClienteGlaceRequest;
import br.com.projetoglace.request.ParceiroGlaceRequest;

@Component
public class ParceiroGlaceMapper {
	
	@Autowired
    private ModelMapper modelMapper;
	
	public ParceiroGlace requestToModel(ParceiroGlaceRequest parceiroRequest) {
        return modelMapper.map(parceiroRequest, ParceiroGlace.class);
    }
    
    public ParceiroGlaceDTO modelToDTO(ParceiroGlace parceiro) {
        return modelMapper.map(parceiro, ParceiroGlaceDTO.class);
    }
	
}
