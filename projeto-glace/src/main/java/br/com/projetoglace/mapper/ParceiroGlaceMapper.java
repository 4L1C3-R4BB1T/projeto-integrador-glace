package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.ParceiroGlaceDTO;
import br.com.projetoglace.model.ParceiroGlace;
import br.com.projetoglace.request.ParceiroGlaceRequest;

@Component
public class ParceiroGlaceMapper {
	
	@Autowired
    private ModelMapper modelMapper;
	
	public ParceiroGlaceDTO modelToDto(ParceiroGlace parceiroGlace) {
		return modelMapper.map(parceiroGlace, ParceiroGlaceDTO.class);
	}
	
	public ParceiroGlace dtoRequestToModel(ParceiroGlaceRequest request ) {
		return modelMapper.map(request, ParceiroGlace.class);
	}
	
}
