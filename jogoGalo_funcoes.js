
//____________ Funções para Botões:

function limpar ()
{
    toggle.checked = false
    ishuman = true
    jogoOn = true;
    letraOn = "X";
    jogadorStart = "X"
    jogador1.value = ""
    jogador2.value = ""
    arrayJogo = ["", "", "", "", "", "", "", "", ""];
    index = 0
    arrayIfree.length = 0
    pontosJogador1 = 0
    pontosJogador2 = 0

    jogadorOn = ""
    nomeJogador1.innerHTML = ""
    nomeJogador2.innerHTML = ""

    jogador1Pontos.innerHTML = "0"
    jogador2Pontos.innerHTML = "0"
    ronda = 0

    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");                     //limpa as células

    document.querySelectorAll(".cellWin")                           //remove class vencedora(css)
        .forEach(cell => cell.classList
            .remove("cellWin"));

    divVencedor.classList.add("hide")

}

//Botão NovaRonda

function jogoRestart()
{
    jogoOn = true
    ronda ++
    rondaFrase.innerHTML = `${ronda} / 5`
    letraOn = jogadorStart;
    continua=true;
    document.querySelector('#boxjog1').style.borderBottom = '2px solid #3d6164';
    document.querySelector('#boxjog2').style.borderBottom = 'transparent';

    restart.classList.add("hidden")


    let B = startTimer()


    tempojogo = setInterval(() => {tempoDecorrido.innerHTML = `${getElapsedTimeAsString(B)}`, 1000})

    arrayJogo = ["", "", "", "", "", "", "", "", ""];
    index = 0
    arrayIfree.length = 0

    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");                     //limpa as células

    document.querySelectorAll(".cellWin")                           //remove class vencedora(css)
        .forEach(cell => cell.classList
            .remove("cellWin"));

    if (ishuman)
    {
        jogadorStart === "X" ? jogadorOn = jogador1.value : jogadorOn = jogador2.value
    }


    fraseJogadorOn.innerHTML = jogadorOn + ", é a tua vez de jogar!"
}


/*_________________ IR PARA SECÇÕES _____________________________*/

function irParaInicio()
{
    section_g_inicio.classList.remove("hide")
    section_escolhajogadores.classList.add("hide")
    section_galojogo.classList.add("hide")
    jogadoresh2.classList.remove("hide")
    jogador2.classList.remove("hide")
    restart.classList.remove("hidden")
    inicioFim.classList.remove("hidden")
}

function irParaEscolhaJogadores()
{
    section_g_inicio.classList.add("hide")
    section_escolhajogadores.classList.remove("hide")
    section_galojogo.classList.add("hide")
}

function irParaEscolhaJogadoresAI()
{
    section_g_inicio.classList.add("hide")
    section_escolhajogadores.classList.remove("hide")
    section_galojogo.classList.add("hide")
    jogadoresh2.classList.add("hide")
    jogador2.classList.add("hide")

    document.querySelector("#boxronda").classList.add("hide")
}

function irParaJogo()
{
    section_g_inicio.classList.add("hide")
    section_escolhajogadores.classList.add("hide")
    section_galojogo.classList.remove("hide")
}

//********************************** jogo ********************************************************

function validar ()
{
    ganhou = false;

    //Para cada array dentro do array array3Win:

    array3Win.forEach(array1Win => {
        let a = arrayJogo[array1Win[0]];         //letra da celula no indice 0
        let b = arrayJogo[array1Win[1]];         //letra da celula no indice 1
        let c = arrayJogo[array1Win[2]];         //letra da celula no indice 2

        if (a !== '' && a === b && b === c)      //todos iguais mas ñ todos vazios
        {
            document.getElementById(array1Win[0]).classList.add("cellWin")
            document.getElementById(array1Win[1]).classList.add("cellWin")
            document.getElementById(array1Win[2]).classList.add("cellWin")

            jogadorOn === jogador1.value ? pontosJogador1 ++ : pontosJogador2 ++

            jogador1Pontos.innerHTML = pontosJogador1.toString()
            jogador2Pontos.innerHTML = pontosJogador2.toString()

            return ganhou = true;
        }
    })

    //Alguém ganhou:

    if (ganhou)
    {
        clearInterval(tempojogo);
        continua = false
        jogoOn = false;


        //JOGO SOLO

        if(!ishuman)
        {
            if( letraOn === "O")
            {
                fraseJogadorOn.innerHTML = `MUAHAHAHAHAH Eu ganhei!!`

                setTimeout(() => {fraseJogadorOn.innerHTML = `${jogadorOn}, jogamos de novo? `},1500)

                restart.classList.remove("hidden")
                inicioFim.classList.remove("hidden")
                clearInterval(tempojogototal);
            }
            else
            {
                fraseJogadorOn.innerHTML = `Parabéns ${jogadorOn}, ganhaste! Tiveste sorte desta vez...`

                setTimeout(() => {fraseJogadorOn.innerHTML = `${jogadorOn}, jogamos de novo? `},2000)

                restart.classList.remove("hidden")
                inicioFim.classList.remove("hidden")
                clearInterval(tempojogototal);
            }
        }

        //_____________________    JOGO COMPETIÇÃO

        else
        {
            //QUANDO ACABA COMPETIÇÃO

            if (ronda === 5 || pontosJogador1 === 3 || pontosJogador2 === 3)
            {
                clearInterval(tempojogototal);
                restart.classList.add("hidden")
                divVencedor.classList.remove("hide")
                nomeJogador1 = nomeJogador1 + `${pontosJogador1} pontos`
                nomeJogador2 = nomeJogador2 + `${pontosJogador2} pontos`

                pontosJogador1 > pontosJogador2 ? jogadorOn = jogador1 : jogadorOn = jogador2

                // guardarLocalStorage ()

                // Info da caixinha:

                infoCaixinha()

                document.querySelector("#cruz").addEventListener('click', function ()
                {
                    limpar()
                    irParaInicio()
                });
            }


                //QUANDO SÓ ACABA A RONDA

            else
            {
                fraseJogadorOn.innerHTML = `${jogadorOn}, parabéns! Ganhaste esta ronda! `

                jogadorStart === "X" ? jogadorStart = "O" : jogadorStart = "X"


                restart.classList.remove("hidden")
            }
        }
    }

    //_________ EMPATE ________________ As células acabaram / array cheio e ninguém ganhou:

    let empate = (ganhou === false) && !arrayJogo.includes("")

    if (empate)
    {
        continua = false
        empateN ++

        //QUANDO ACABA COMPETIÇÃO


        if (ronda === 5 || pontosJogador1 === 3 || pontosJogador2 === 3)
        {
            clearInterval(tempojogototal);

            divVencedor.classList.remove("hide")
            restart.classList.add("hidden")

            nomeJogador1 = nomeJogador1 + `${pontosJogador1} pontos`
            nomeJogador2 = nomeJogador2 + `${pontosJogador2} pontos`

            pontosJogador1 > pontosJogador2 ? jogadorOn = jogador1 : jogadorOn = jogador2

            //Guardar na Local Storage

            // guardarLocalStorage()

            // Info da caixinha:

            infoCaixinha()

            document.querySelector("#cruz").addEventListener('click', function () {
                limpar()
                irParaInicio()
            });
        }

        //QUANDO SÓ ACABA A RONDA

        else {
            !ishuman ? fraseJogadorOn.innerHTML = `Caramba, empatámos! Quero o desempate!`
                : fraseJogadorOn.innerHTML = `Seus desgraçados! Empataram!`

            jogadorStart === "X" ? jogadorStart = "O" : jogadorStart = "X"

            restart.classList.remove("hidden")
        }

        clearInterval(tempojogo);
    }

    if (continua)
    {
        letraOn = letraOn === "X" ? "O" : "X" ;   //mudar de letra / jogador

        letraOn === "X" ? (document.querySelector('#boxjog1').style.borderBottom = '2px solid #3d6164',
                           document.querySelector('#boxjog2').style.borderBottom = 'transparent')
                        : (document.querySelector('#boxjog2').style.borderBottom = '2px solid #3d6164',
                           document.querySelector('#boxjog1').style.borderBottom = 'transparent')
        ;

        /*ishuman === true ? humanoTrue() : humanoFalse(celula)  __ para jogar sozinho*/
    }
}


//________________ GUARDAR NA LOCAL STORAGE:


// function guardarLocalStorage ()
// {
//     let dados = {
//         date: getCurrentDateAsString(),
//         time: getCurrentTimeAsString(),
//         game: "Jogo do Galo",
//         winner: jogadorOn.value,
//         duration: tempoDecorridoTotal.innerText}

//     let historicList = JSON.parse(localStorage.getItem("Dados"))
//     historicList.push(dados)
//     localStorage.setItem("Dados", JSON.stringify(historicList))
// }



//____________ Info dentro div final

function infoCaixinha ()
{
    fraseVencedor.innerHTML = `Parabéns ${jogadorOn.value} ganhaste o campeonato!`
    fraseWinJ1.innerHTML = `${jogador1.value}, Rondas Ganhas : ${pontosJogador1}`
    fraseWinJ2.innerHTML = `${jogador2.value}, Rondas Ganhas : ${pontosJogador2}`
    fraseEmpates.innerHTML = `Empates: ${empateN}`
    fraseJogadorOn.innerHTML = ""
    restart.classList.add("hidden")
    inicioFim.classList.add("hidden")
}


//_______________________  Timer _______________________________________

function getCurrentTimeAsString(){
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    return `${h}:${m}`;
}


function startTimer() {

    return new Date();
}

function getCurrentDateAsString(){
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    return `${y}/${m}/${d}`;
}



function getElapsedTimeAsString(startTime) {
    let now = new Date();
    let dt_s = (now.getTime() - startTime.getTime()) / 1000;
    let s= Math.floor(dt_s % 60);
    let m = dt_s / 60;
    let h = Math.floor(m / 60);
    m = Math.floor(m % 60);
    let form = n => n<10 ? `0${n}` : n;         // prefixes 0 to single digit integers

    let formh = h<1 ? `${form(m)}:${form(s)}`: `${form(h)}:${form(m)}:${form(s)}`
    return formh;
}
