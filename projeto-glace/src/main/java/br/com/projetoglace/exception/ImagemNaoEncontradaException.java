package br.com.projetoglace.exception;

public class ImagemNaoEncontradaException extends EntidadeNaoEncontradaException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ImagemNaoEncontradaException(String mensagem) {
		super(mensagem);		
	}
	public ImagemNaoEncontradaException(Long id) {
		this(String.format("Não existe uma imagem com código %d", id));
	}
}
