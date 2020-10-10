package br.com.projetoglace.request;

import org.springframework.web.multipart.MultipartFile;

import com.sun.istack.NotNull;

import lombok.Data;

@Data
public class ImagemRequest {
	
	@NotNull
	//@FileSize(max="1000KB")
	private MultipartFile imagem;
}
