package br.com.projetoglace.filtro;
import java.util.Set;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(description = "Informações básicas sobre o Estabelecimento", value = "Estabalecimento")
public class EstabelecimentoFiltro {
    @ApiModelProperty(value = "O código da Cidade a ser buscada", required = false, position = 1, dataType = "Long", example = "1")
    private Long cidade;
    @ApiModelProperty(value = "O código do Estado a ser buscado", required = false, position = 1, dataType = "Long", example = "1")
    private Long estado;
    @ApiModelProperty(value = "O tipo de estabelecimento a ser buscado", required = false, position = 1, dataType = "String", example = "Hotel")
    private Set<String> tiposEstabelecimento;
    @ApiModelProperty(value = "O tipo de acessibilidade a ser buscado", required = false, position = 1, dataType = "Long", example = "1")
    private Set<Long> tiposAcessibilidades;
    
}