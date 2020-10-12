package br.com.projetoglace.exception;

public class StorageException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;
	
	public StorageException(String message, Throwable cause) {
		super(message, cause);
	}
	public StorageException(String message) {
		super(message);
	}
}