package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.AcessibilidadeDTO;
import br.com.projetoglace.model.Acessibilidade;
import br.com.projetoglace.request.AcessibilidadeRequest;

@Component
public class AcessibilidadeMapper {

	@Autowired
    private ModelMapper modelMapper;

    public Acessibilidade requestToModel(AcessibilidadeRequest acessibilidadeRequest) {
        return modelMapper.map(acessibilidadeRequest, Acessibilidade.class);
    }
    
    public AcessibilidadeDTO modelToDTO(Acessibilidade acessibilidade) {
        return modelMapper.map(acessibilidade, AcessibilidadeDTO.class);
    }
}
