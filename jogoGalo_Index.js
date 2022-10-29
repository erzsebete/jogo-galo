//*************************  Variáveis ***********************************************************

// Todas as secções:

let section_g_inicio = document.querySelector("#galo_humanmachine"),
    section_escolhajogadores = document.querySelector("#g_escolhajogadores"),
    toggle = document.querySelector("#g_toggleinput"),
    ishuman = true,
    next = document.querySelector("#galo_botaonext"),
    start = document.querySelector("#g_botaostart"),
    restart = document.querySelector("#g_jogoRestart"),
    inicioFim = document.querySelector("#g_inicioFim"),
    section_galojogo = document.querySelector("#g_sectionJogo"),
    jogadoresh2 = document.querySelector("#g_jogadoresh2"),
    jogador1 = document.querySelector("#galojogador1"),
    divVencedor = document.querySelector("#vencedor"),
    fraseVencedor = document.querySelector("#g_fraseVencedor"),
    fraseWinJ1 = document.querySelector("#fraseWinJ1"),
    fraseWinJ2 = document.querySelector("#fraseWinJ2"),
    fraseEmpates = document.querySelector("#fraseEmpates"),
    jogador2 = document.querySelector("#galojogador2"),
    jogador1Pontos = document.querySelector("#jogador1Pontos"),
    jogador2Pontos = document.querySelector("#jogador2Pontos"),
    tempojogo,
    tempoDecorrido = document.querySelector("#g_timer"),
    tempoDecorridoTotal = document.querySelector("#g_timer_total"),
    tempojogototal,
    rondaFrase = document.querySelector("#rondaFrase"),
    ronda = 1 ,
    pontosJogador1 = 0,
    pontosJogador2 = 0,
    empateN = 0,
    x = '<img src="./img/x.gif" class="gifs"  alt="Imagem do X">',
    o = '<img src="./img/o.gif" class="gifs"  alt="Imagem do X">';



//Do Jogo:

let arrayIfree = [],
    continua = true,
    ganhou = false,
    letraOn = "X",
    jogadorStart ="X",
    jogoOn = true,
    index = 0,
    celula,
    celulaIndex,
    jogadorOn = jogador1,
    arrayJogo = ["", "", "", "", "", "", "", "", ""],
    array3Win = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    fraseJogadorOn = document.querySelector('#g_fraseJogadorOn'),
    nomeJogador1 = document.querySelector("#g_nomeJogador1"),
    nomeJogador2 = document.querySelector("#g_nomeJogador2");




//a 1ª vez que se abre a app/pg

irParaInicio()




//**************************** EVENTOS *****************************

//Secção I - Toggle:

toggle.addEventListener("change", function (){ishuman = !ishuman})


//Secção I - Botão Next:

next.addEventListener("click", function (){

    ishuman ? irParaEscolhaJogadores() : irParaEscolhaJogadoresAI() })


//Secção I - Botão Menu:

next.addEventListener("click", function (){})


//Secção II - Botão Jogar:

start.addEventListener("click",function () {
        let A = startTimer()

        tempojogototal = setInterval(() => {tempoDecorridoTotal.innerHTML = `${getElapsedTimeAsString(A)}`, 1000})
        tempojogo = setInterval(() => {tempoDecorrido.innerHTML = `${getElapsedTimeAsString(A)}`, 1000})

        jogador1 = document.querySelector("#galojogador1")
        jogador2 = document.querySelector("#galojogador2")
        document.querySelector('#boxjog1').style.borderBottom = '2px solid #3d6164',
        document.querySelector('#boxjog2').style.borderBottom = 'transparent';

        nomeJogador1.innerHTML = jogador1.value

        ishuman ? nomeJogador2.innerHTML = jogador2.value : nomeJogador2.innerHTML = "Quantum AI"

        jogador1Pontos.innerHTML = pontosJogador1.toString()
        jogador2Pontos.innerHTML = pontosJogador2.toString()

        rondaFrase.innerHTML = `${ronda} / 5`

        fraseJogadorOn.innerHTML = `${jogador1.value}, é a tua vez de jogar!`

        if (!ishuman)
        {
            jogador2.classList.add("hide")
            jogador1Pontos.classList.add("hide")
            jogador2Pontos.classList.add("hide")
        }

         restart.classList.add("hidden")

        irParaJogo()
        })



//Secção II e III - Botão Voltar ao Início:

document.querySelectorAll(".g_jogoInicio")
        .forEach(b => b
            .addEventListener("click", function ()
                {
                    limpar()
                    irParaInicio()
                }
                ))



//___________________________________   JOGO  _______________________________________


//Secção III - Click nas Células:


document.querySelectorAll('.cell')
        .forEach(c => c
        .addEventListener('click', jogo));



function jogo (evento)
{
if (ishuman === true || (ishuman === false && letraOn === "X"))
{

        inicioFim.classList.add("hidden")
        celula = evento.target;                                            //local do click
        celulaIndex = parseInt(celula.getAttribute('id'));     //valor do id da cell


        if (arrayJogo[celulaIndex] !== "" || !jogoOn)                       //array cheio ou jogo parado?
        {
            return;
        }

        arrayJogo[celulaIndex] = letraOn;

        //guardar no array do jogo



        letraOn === "X" ? celula.innerHTML = x : celula.innerHTML = o;      //imprimir na cell a letra


        // Jogo acabou? Será que alguém ganhou?

        validar()

        if (continua) {
            ishuman === true ? humanoTrue() : humanoFalse()
        }
    }
}

function humanoTrue ()
{
    letraOn === "X" ? jogadorOn = jogador1.value : jogadorOn = jogador2.value

    fraseJogadorOn.innerHTML = jogadorOn + ", é a tua vez de jogar!"
}



//Secção III - Botão Nova Ronda / RESTART :

document.querySelector('#g_jogoRestart').addEventListener('click', jogoRestart);
