const Gameboard = (()=>{
    let gameboard = ['','','','','','','','','']
    const render = () =>{
        let boardHTML=""
        gameboard.forEach((square,i)=>{
            boardHTML+=`<div class='square' id='square-${i}'>${square}</div>`
           
        })
        document.querySelector('.gameboard').innerHTML=boardHTML;
        const squares  = document.body.querySelectorAll('.square')
        squares.forEach((square)=>{
            square.addEventListener('click',Game.handleClick)
        })
        
    }
    const update =(index,value)=>{
        gameboard[index] = value;
        render()
    }

    const getGameboard = ()=> gameboard
    return {
        render,update, getGameboard
    }
})();

//factory
const createPlayer =(name,mark)=>{
    return{name,mark}
}

const Game = (()=>{
    let players =[]
    let currPlayerIndex
    let gameOver
    const message= document.querySelector('.message')
    let player1 = document.body.querySelector('#player1')
    let player2 = document.body.querySelector('#player2')

    const start =()=>{
        
        players =[
        createPlayer(player1.value,'X'),
        createPlayer(player2.value,'O')
        ]
        if (player1.value===''){
            players[0].name='Player 1'
         }
         if(player2.value===''){
            players[1].name='Player 2'
         }
        currPlayerIndex=0
        
        
        gameOver = false;
        Gameboard.render()
        
    }

    const restart=()=>{
        for (let i =0;i<9;i++){
            Gameboard.update(i,'')
            message.innerText=''
        }
        startBtn.classList.remove('hide')
        Gameboard.render()
    }

    const handleClick =(e)=>{
        if(gameOver){
            restartBtn.classList.remove('hide')
            return;
        }
            
        let index = parseInt(e.target.id.split('-')[1])
        if(Gameboard.getGameboard()[index]!=="")
            return;

        Gameboard.update(index,players[currPlayerIndex].mark)
        if(checkForWin(Gameboard.getGameboard(),players[currPlayerIndex].mark)){
            gameOver=true;
            message.innerText=`${players[currPlayerIndex].name} won!`
        }
        else if(checkForTie(Gameboard.getGameboard())){
            gameOver=true
            message.innerText=`It's a tie!`
        }
        currPlayerIndex = currPlayerIndex === 0? 1:0;
    }
return{
    start, handleClick,restart
}
})()

function checkForWin(board){
    const winningComb=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let i =0; i<winningComb.length;i++){
        const [a,b,c] = winningComb[i]
        if(board[a]&&board[a]===board[b]&&board[a]===board[c]){
            return true;
        }
    }
    return false;
}


function checkForTie(board){
    return board.every(cell => cell!=='')
}
const restartBtn = document.body.querySelector('.restart-btn')
restartBtn.addEventListener('click',function(){
    Game.restart()
    restartBtn.classList.add('hide')
})

const startBtn = document.body.querySelector('.start-btn')
startBtn.addEventListener('click',function(){
    Game.start()
    startBtn.classList.add("hide")
})

Gameboard.render()