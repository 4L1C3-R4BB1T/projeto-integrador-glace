package br.com.projetoglace.service;

import java.net.URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import br.com.projetoglace.exception.StorageException;

@Service
public class S3FotoStorageService {

	@Autowired
	private AmazonS3 amazonS3;
	
	@Autowired
	private StorageProperties storageProperties;
	
	public URL armazenar(MultipartFile arquivo, String nomeArquivo) {
		try {
			String caminhoArquivo = getCaminhoArquivo(nomeArquivo);
			
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(arquivo.getContentType());
			
			PutObjectRequest putObjectRequest = new PutObjectRequest(
					storageProperties.getBucket(),
					caminhoArquivo,
					arquivo.getInputStream(),
					objectMetadata)
				.withCannedAcl(CannedAccessControlList.PublicRead);
			
			amazonS3.putObject(putObjectRequest);
			
			return amazonS3.getUrl(storageProperties.getBucket(), caminhoArquivo);
			
		} catch (Exception e) {
			throw new StorageException("Não foi possível enviar arquivo para Amazon S3.", e);
		}				
	}
	private String getCaminhoArquivo(String nomeArquivo) {
		return String.format("%s/%s", storageProperties.getFotos(), nomeArquivo);
	}
	
	public void remover(String nomeArquivo) {
		try {
			String caminhoArquivo = getCaminhoArquivo(nomeArquivo);
			DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(
					storageProperties.getBucket(), caminhoArquivo);
			amazonS3.deleteObject(deleteObjectRequest);
		} catch (Exception e) {
			throw new StorageException("Não foi possível excluir arquivo na Amazon S3.", e);
		}
	}
}
