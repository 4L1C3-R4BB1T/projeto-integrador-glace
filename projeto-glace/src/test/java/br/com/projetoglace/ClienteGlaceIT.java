package br.com.projetoglace;

import org.hamcrest.Matchers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class ClienteGlaceIT {
	@LocalServerPort
	private int port;
	
	private String token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGluZUBhbGluZS5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXSwiZXhwIjoxNjA2NzQ1NDU0LCJhdXRob3JpdGllcyI6WyJVRyJdLCJqdGkiOiJiMmEzYjIxZC1hMzUyLTRhMDYtYjhjNS1jZDc5OTZmNWY3NjYiLCJub21lX2NvbXBsZXRvIjoiQWxpbmUgRmVycmVpcmEiLCJjbGllbnRfaWQiOiJmcm9udGVuZEdsYWNlLWNsaWVudCJ9.0N96wiGCnA0LVYwol0fzrXpZseWj0HuvkAF79pmOUrM";
	
	@Before
	public void setUp() {
		RestAssured.enableLoggingOfRequestAndResponseIfValidationFails();
		RestAssured.port = port;
		RestAssured.basePath = "/cliente";	
	}
	
	@Test
	public void deveRetornarStatus200_QuandoConsultarClientes() {
				
		RestAssured.given()			
			.accept(ContentType.JSON)	
			.header("Authorization", token)
		.when()
			.get("/usuarioAdm")
		.then()
			.statusCode(200);
	}
	@Test
	public void deveConter5Clientes_QuandoConsultarClientes() {
				
		RestAssured.given()
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get()
		.then()
			.body("Amanda", Matchers.hasSize(5))
			.body("nome", Matchers.hasItems("Amanda"));
	}
	
	@Test
	public void deveRetornarRespostaEStatusCorretos_QuandoConsultarClienteExistente() {
				
		RestAssured.given()
			.pathParam("id", 1)
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get("/{id}")
		.then()
			.statusCode(HttpStatus.OK.value())
			.body("nome", Matchers.equalTo("Vanessa"));
	}
	
	@Test
	public void deveRetornarStatus201_QuandoCadastrarCliente() {
		RestAssured.given()
			.basePath("/cliente")
			.port(port)
			.body("{ \"nome\": \"Maria Clara\","
					+ "\"sobrenome\": \"Da Cruz\","
					+ "\"dataNasc\": \"2020-11-01\","
					+ "\"cpf\": \"12154644744\","
					+ "\"email\": \"aparecida@email.com\","
					+ "\"telefone\": \"87968767687\","
					+ "\"endereco\":{\"cep\": \"22222222\","
					+ "\"rua\": \"dfaas\","
					+ "\"numero\": \"112\","
					+ "\"bairro\": \"dffsa\","
					+ "\"cidade\":{\"id\": \"65\","
					+ "\"nome\": \"São Domingos do Norte\","
					+ "\"estado\": {\"id\": \"8\","
					+ "\"nome\": \"Espirito Santo\"}}},"
					+ "\"foto\": {\"id\": \"49\"},"
					+ "\"senha\": \"$2a$10$v0GWmMhHoW6XMO1d7JKaeOdiRLCt7.x9ti6WJBBKcxZMkd8rKjLZ6\"}")
			.contentType(ContentType.JSON)
			.accept(ContentType.JSON)
		.when()
			.post()
		.then()
			.statusCode(HttpStatus.CREATED.value());
	}
}