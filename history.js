//******************** histórico _ quando inicia _ **************

let scores = [
  { date: "2022/08/04",
    time: "15:25",
    winner: "Elisabete",
    duration: "02:49",
  },
  { date: "2022/08/04",
    time: "03:22",
    winner: "Ice",
    duration: "00:04",
  },
  { date: "2022/08/04",
    time: "12:00",
    winner: "Macaco",
    duration: "02:11",
  }, ]


// Para no início já termos algum histórico - adiciona a lista scores à local storage

if(localStorage.getItem("Dados") === null)
{
  localStorage.setItem("Dados", JSON.stringify(scores))
}


// Buscar a lista à local storage e mostrar na página

let dadosGuardados = JSON.parse(localStorage.getItem("Dados"))

updateScores(dadosGuardados)


//_____________________________ funções adicionais __________________

//Para cada elemento da list mostrar conteúdo

function updateScores(scoreList){
  let content = scoreList
      .map(gameLogElement)
      .join('\n');
  document.querySelector("#scores").innerHTML = content;}



//Conteúdo da cell

function gameLogElement(gameLog) 
{
  return '<div class="gamelog">' + 
            '<div class="row1">' + 
                  '<div class=col1>'+`${gameLog.date}`+'</div>' + 
                  '<div class=col2>'+`${gameLog.winner}`+'</div>'+ 
                  '<div class=col3>'+`${gameLog.duration}` +'</div>'+             
            '</div>' +
            '<div class="row2">'+ `${gameLog.time}` + '</div>' +
         '</div>';
}



