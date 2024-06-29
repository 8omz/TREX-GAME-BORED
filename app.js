document.addEventListener('DOMContentLoaded', function () {
    const cat = document.querySelector('.cat')
    const grid = document.querySelector('.grid')
    const bg = document.querySelector('#plains')
    const btn = document.querySelector('.btn-1')
    const scores = document.querySelector('#score')
    let gravity = 0.9
    const alert = document.getElementById('alert')
    console.log(cat)
    let score = 0;
    let isJumping = false
    let isGameOver = false
    function control(e) {
        if (e.code === "Space") {
            if (!isJumping) {
                jump()

            }
        }
    }
    function updateScore(){
            score += 10
            scores.innerText = score
    }
    console.log(score)
    document.addEventListener('keydown', control)
    let position = 0
    function jump() {
        isJumping = true
        let count = 0
        let timerId = setInterval(function () {
            // move downwards
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function () {
                    position -= 5
                    count--
                    position = position * gravity
                    cat.style.bottom = position + 'px'

                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                }, 20)
            }
            // move upwards
            position += 30
            count++
            position = position * gravity
            cat.style.bottom = position + 'px'
        }, 20)
    updateScore()
    }



    function createobby() {
        if (!isGameOver) {

            let rantime = Math.random() * 4001
            let obbypos = 1000
            const obby = document.createElement('div')
            grid.appendChild(obby)
            obby.classList.add('obby')
            obby.style.left = obbypos + 'px'

            let timerId = setInterval(function () {
                if (obbypos > 0 && obbypos < 60 && position < 60) {
                    clearInterval(timerId)
                    alert.innerHTML = 'Game over Meow =^_^='
                    isGameOver = true
                    bg.style.animation = 'none'
                    btn.style.display = "block"
                    //remove the children from the grid
                    while (grid.firstChild) {
                        grid.removeChild(grid.lastChild)
                    }
                }

                obbypos -= 10
                obby.style.left = obbypos + 'px'
            }, 20)
            setTimeout(createobby, rantime)
        }
    }
    createobby()
    btn.onclick = restart;
    function restart() {
        window.location.reload();
    }

})