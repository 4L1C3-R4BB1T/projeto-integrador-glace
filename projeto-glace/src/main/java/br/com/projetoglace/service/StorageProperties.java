package br.com.projetoglace.service;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import com.amazonaws.regions.Regions;

import lombok.Getter;
import lombok.Setter;

@Getter
	@Setter
	@Component
	@ConfigurationProperties("digitalhouse.storage.s3")
	public class StorageProperties {
		private String idChaveAcesso;
		private String chaveAcessoSecreta;
		private String bucket;
		private Regions regiao;
		private String fotos;
	}

