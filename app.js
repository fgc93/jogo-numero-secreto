let listaDeNumerosSorteado =[];
let maximoNumeroSorteado = 10;
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let numTentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + maximoNumeroSorteado);
}

exibirMensagemInicial()
function verificarChute() {
    let chute = document.getElementById('campo').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'ACERTOUUU !!!');
        let palavraTentativa = numTentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemAcerto = `Você descobriu o número secreto ${numeroSecreto} com ${numTentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemAcerto);
        document.getElementById('reiniciar').disabled = false;
        document.getElementById('botaoChute').disabled = true;
    } 
    else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', 'Tente de novo');
            exibirTextoNaTela('p',  chute + ' é maior que o número secreto :(');
        } 
        else {
            exibirTextoNaTela('h1', 'Tente de novo');
            exibirTextoNaTela('p', chute + ' é menor que o número secreto :(');
        }
        numTentativas++;
        limparCampo('campo');
    }
}

function gerarNumeroAleatorio() {
    let numerosEscolhido = parseInt(Math.random() * maximoNumeroSorteado + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteado.length;

    if (quantidadeDeElementosNaLista == maximoNumeroSorteado) {
        listaDeNumerosSorteado = [];
    }
    
    if (listaDeNumerosSorteado.includes(numerosEscolhido)){
        return gerarNumeroAleatorio();
    } 
    else {
        listaDeNumerosSorteado.push(numerosEscolhido);
        return numerosEscolhido;
    }
}

function limparCampo(id) {
    campoLimpar = document.getElementById(id);
    campoLimpar.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    limparCampo('campo');
    numTentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').disabled = true;
    document.getElementById('botaoChute').disabled = false;
}
