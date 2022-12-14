//******************** histórico _ quando inicia _ **************

let scores = [
  { date: "2022/07/27",
    time: "15:25",
    winner: "Pedro",
    duration: "05:55",
  },
  { date: "2022/08/04",
    time: "03:22",
    winner: "Ice",
    duration: "01:04",
  },
  { date: "2022/09/14",
    time: "12:00",
    winner: "Tai",
    duration: "02:11",
  }, 
  { date: "2022/10/17",
  time: "15:25",
  winner: "Cátia",
  duration: "01:27",
},
{ date: "2022/10/29",
    time: "15:25",
    winner: "Beta",
    duration: "00:13",
  },
]


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
  let content = scoreList.reverse()
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



