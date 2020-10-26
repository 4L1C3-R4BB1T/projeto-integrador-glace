package br.com.projetoglace.exception;

public class UsuarioNaoEncontradoException extends EntidadeNaoEncontradaException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public UsuarioNaoEncontradoException(String mensagem) {
		super(mensagem);		
	}
	public UsuarioNaoEncontradoException(Long id) {
		this(String.format("Não existe um cadastro de usuario com código %d", id));
	}
}
