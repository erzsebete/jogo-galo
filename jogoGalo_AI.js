function humanoFalse ()
{
    nomeJogador2.innerHTML = "Quantic AI"

    //array dos i livres

        for(i=0; i<arrayJogo.length;i++)
        {
            if (arrayJogo[i] === "") arrayIfree.push(i)
        }

        index = Math.round(Math.random() * 8)

        while (!arrayIfree.includes(index)) {index = Math.round(Math.random() * 8)}

        arrayIfree.slice(arrayIfree.indexOf(index),1)

        arrayJogo[index] = letraOn;                                         //guardar no array do jogo

        fraseJogadorOn.innerHTML = "É a minha vez!"

        setTimeout(() => {
            fraseJogadorOn.innerHTML = "Hum...estou a pensar..."
        }, 1000);

        let cell = document.getElementById(`${index}`)

        setTimeout(() => {
            cell.innerHTML = o;

            validar()

            if(continua)
            {
                jogadorOn = jogador1.value
                fraseJogadorOn.innerHTML =  jogadorOn + ", é a tua vez de jogar!"
            }
            arrayIfree.length = 0
        }, 3000);
    }
