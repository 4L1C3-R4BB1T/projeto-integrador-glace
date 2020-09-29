package br.com.projetoglace.exception;

public class ClienteNaoEncontradoException extends EntidadeNaoEncontradaException{
	public ClienteNaoEncontradoException(String mensagem) {
		super(mensagem);		
	}
	public ClienteNaoEncontradoException(Long id) {
		this(String.format("Não existe um cadastro de cliente com código %d", id));
	}
}
