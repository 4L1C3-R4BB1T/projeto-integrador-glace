package br.com.projetoglace.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import br.com.projetoglace.dto.ImagemDTO;
import br.com.projetoglace.model.Imagem;
import br.com.projetoglace.request.ImagemRequest;

@Component
public class ImagemMapper {
	@Autowired
	private ModelMapper modelMapper;
	
	public Imagem requestToModel(ImagemRequest imagemRequest) {
		return modelMapper.map(imagemRequest, Imagem.class);
	}
	public ImagemDTO modelToDTO(Imagem imagem) {
		return modelMapper.map(imagem, ImagemDTO.class);
	}
}
