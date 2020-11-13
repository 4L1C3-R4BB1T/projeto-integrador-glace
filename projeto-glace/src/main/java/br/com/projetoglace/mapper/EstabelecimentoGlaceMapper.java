package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.EstabelecimentoDTO;
import br.com.projetoglace.model.EstabelecimentoGlace;
import br.com.projetoglace.request.EstabelecimentoGlaceRequest;

@Component
public class EstabelecimentoGlaceMapper {

	@Autowired
    private ModelMapper modelMapper;
	
	public EstabelecimentoGlace requestToModel(EstabelecimentoGlaceRequest estabelecimentoRequest) {
        return modelMapper.map(estabelecimentoRequest, EstabelecimentoGlace.class);
    }
    
    public EstabelecimentoDTO modelToDTO(EstabelecimentoGlace estabelecimentoGlace) {
        return modelMapper.map(estabelecimentoGlace, EstabelecimentoDTO.class);
    }
	
}
