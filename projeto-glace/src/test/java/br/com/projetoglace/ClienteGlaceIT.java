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
	
	private String token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvX2lkIjoxLCJ1c2VyX25hbWUiOiJhbGluZUBhbGluZS5jb20iLCJzY29wZSI6WyJ3cml0ZSIsInJlYWQiXSwiZXhwIjoxNjAzNTcxMjk1LCJhdXRob3JpdGllcyI6WyJWRVItVFVETyJdLCJqdGkiOiJiMDcwZjc2MS1iZjljLTQ4NDUtYmViMC1mMDhkZmRmYTQxZjgiLCJub21lX2NvbXBsZXRvIjoiQWxpbmUgRmVycmVpcmEiLCJjbGllbnRfaWQiOiJmcm9udGVuZEdsYWNlLWNsaWVudCJ9.rNo8OjYnUnIhy6H0FH_Ca-ockObx0VwHYwFME_BrM-I";
	
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
	public void deveConter3Clientes_QuandoConsultarClientes() {
				
		RestAssured.given()
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get()
		.then()
			.body("", Matchers.hasSize(0))
			.body("nome", Matchers.hasItems(""));
	}
	
	@Test
	public void deveRetornarRespostaEStatusCorretos_QuandoConsultarClienteExistente() {
				
		RestAssured.given()
			.pathParam("id", 2)
			.accept(ContentType.JSON)
			.header("Authorization", token)
		.when()
			.get("/{id}")
		.then()
			.statusCode(HttpStatus.OK.value())
			.body("nome", Matchers.equalTo(""));
	}
	
	@Test
	public void deveRetornarStatus201_QuandoCadastrarCliente() {
		RestAssured.given()
			.basePath("/estado")
			.port(port)
			.body("{ \"nome\": \"São Paulo\" }")
			.contentType(ContentType.JSON)
			.accept(ContentType.JSON)
		.when()
			.post()
		.then()
			.statusCode(HttpStatus.CREATED.value());
	}
}