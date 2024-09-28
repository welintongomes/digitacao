const textos = [
    "Aprender a digitar é essencial. Comece com práticas diárias.",
    "As crianças correm descalças na areia da praia, enquanto o sol se põe lentamente no horizonte dourado ao longe.",
    "Na tranquila tarde de verão, o vento suave balança as árvores, enquanto as flores exalam um doce perfume que enche o ar ao redor do jardim perfumado.",
    "Sob o céu estrelado da noite, os animais da floresta começam a se recolher em suas tocas, enquanto os grilos cantam sua sinfonia noturna, acompanhados pelo suave murmúrio do riacho que serpenteia entre as pedras.",
    "No coração da cidade agitada, o trânsito flui incessantemente, enquanto as luzes dos prédios brilham intensamente, refletindo-se nas águas calmas do rio que corta a metrópole, criando um cenário urbano de beleza única, onde o caos e a serenidade se encontram harmoniosamente."
];

let contadorCerto = 0;
let contadorErrado = 0;
let intervaloTempo;
let tempoRestante = 60;

function iniciarContadorTempo() {
    if(intervaloTempo) clearInterval(intervaloTempo);
    tempoRestante = 60;
    document.getElementById('contadorTempo').textContent = tempoRestante;

    intervaloTempo = setInterval(() => {
        tempoRestante --;
        document.getElementById('contadorTempo').textContent = tempoRestante;
        if(tempoRestante <= 0){
            clearInterval(intervaloTempo);
            verificarResultado();
        }
    }, 1000);
}

function verificarResultado(){
    const porcentagemCerta = contadorCerto / textoAtual.length;
    if (porcentagemCerta >= 0.8) {
        alert(`Parabéns você foi aprovado(a).`);
    }else{
        alert(`A não, não foi desta vês, tente novamente.`);
    }
    resetar()
}
function resetar() {

    const elementoEntrada = document.getElementById('entrada');

    elementoEntrada.value = '';

    elementoEntrada.disabled = true;

    clearInterval(intervaloTempo);

    document.getElementById('contadorCerto').textContent = '0';

   
    document.getElementById('contadorErrado').textContent = '0';

    document.getElementById('contadorTempo').textContent = '60';

    tempoRestante = 60;

 
    contadorCerto = 0;

    contadorErrado = 0;

    [...document.getElementById('texto').children].forEach(span => {
        span.classList.remove('certo', 'errado');
    });

}

function mudarNivel(nivel) {

 
    resetar();

   
    textoAtual = textos[nivel - 1];

   
    const elementoTexto = document.getElementById('texto');

   
    elementoTexto.innerHTML = textoAtual.split('').map(char => `<span>${char}</span>`).join('');

    
    document.getElementById('entrada').disabled = false;

}

document.getElementById('entrada').addEventListener('input', function() {

    if (tempoRestante === 60) iniciarContadorTempo();

    const entradaTexto = this.value;

    if (entradaTexto.length > textoAtual.length) {

        this.value = entradaTexto.substring(0, textoAtual.length);

        return;

    }

    contadorCerto = 0;

    contadorErrado = 0;

    [...document.getElementById('texto').children].forEach((span, index) => {
        
        if (index < entradaTexto.length) {

            if (entradaTexto[index] === span.textContent) {

                span.classList.add('certo');

                span.classList.remove('errado');

                contadorCerto++;

            } else {

                span.classList.add('errado');

                span.classList.remove('certo');

                contadorErrado++;

            }
        } else {

           
            span.classList.remove('certo', 'errado');
            
        }
    });

    document.getElementById('contadorCerto').textContent = contadorCerto;

    document.getElementById('contadorErrado').textContent = contadorErrado;

    if (entradaTexto.length === textoAtual.length) {

        verificarResultado();

        

    }

});