class Forca {
  

  
  constructor(palavraSecreta){ 
    this.palavraSecreta = palavraSecreta;
    this.palavra = new Array(palavraSecreta.length).fill('_'); //atribui o valor do tipo de dados especificado a cada elemento do intervalo
    this.vidas = 6; // 1. O jogo deve iniciar com 6 vidas
    this.estado = 'aguardando chute'; // 2. O jogo deve iniciar com o estado `aguardando chute`.
    this.letrasChutadas = [];
  }

  chutar(letra) {
    console.log(this); // para ver o processo
    

    /* 3. Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser 
    ignorada, ou seja, não deve alterar nenhum estado. */
    
    if (letra.length !== 1){ 
      return; // para não alterar nenhum estado
    }

    /* 4. Caso a letra chutada esteja errada mas já foi chutada anteriormente a 
    jogada deve ser ignorada, ou seja, não deve alterar nenhum estado. */    
    if (this.letrasChutadas.includes(letra)){
      return;  // para não alterar nenhum estado
    }

    // 5. Toda chamada ao método chutar deve registrar a letra em letrasChutadas
    this.letrasChutadas.push(letra);

    // O método split() divide uma String em uma lista ordenada
    let letrasSeparadas = this.palavraSecreta.split("");

    //6. Se a letra chutada não estiver contida na palavra, deve subtrair uma vida
    if (!letrasSeparadas.includes(letra)){
      this.vidas = this.vidas - 1;
    }  

    /* 7. Se a letra chutada estiver contida na palavra, deve ser substituida 
    na "palavra" em sua respectiva posição. Ex.: A palavra secreta é "bala" e 
    o jogador chutou a letra "b", então a palavra que é retornada no método 
    buscarDadosDoJogo, deve ser ["b", "_", "_", "_" ].*/

    
    // para usar uma variável de escopo locoal no método for
    let resultadoAlteraLetra = this.palavra;
    /* O método splice() altera o conteúdo de uma lista, adicionando novos 
    elementos enquanto remove elementos antigos*/
        
    if(letrasSeparadas.includes(letra)){
      for (let index = 0; index < letrasSeparadas.length; index++) {
        const element = letrasSeparadas[index];
        if(element == letra){ 
          resultadoAlteraLetra.splice(index, 1, element)
        }          
      }
      
      // devolve resultado para variável global
      this.palavra = resultadoAlteraLetra;
    }
    
    

    //8. Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para `perdeu`.
    if(this.vidas == 0){
      this.estado = "perdeu";
      console.log(this); // para ver a derrota.
      return;
    }

    /* 9. Caso a quantidade de vidas seja maior que zero e o jogador acerte 
    a última letra, o estado do jogo deve mudar para `ganhou`.*/

    //O método every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida.
    let teste = letrasSeparadas.every(letra => this.letrasChutadas.includes(letra));



    if(this.vidas >= 1 && teste ){
      this.estado = "ganhou"
      console.log(this); // para ver a vitória.
      return;
    }

    
  }

  buscarEstado() { 
      
    return this.estado; } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;
