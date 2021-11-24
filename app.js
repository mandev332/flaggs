


function sleep(ms){
    return new Promise(resolve => {setTimeout(resolve,ms)})
}

var gameCount = 16
let score = 0
let hour = document.querySelector(".hour")
const flags = document.querySelector(".img-class")
const button = document.querySelector(".btn")
const gamescore = document.querySelector(".gamescore")
const gameEnd = document.getElementById("gameEnd")
let h1 = document.querySelector(".namecountry")
let maxScore = JSON.parse(localStorage.getItem("maxscore"))||0
let max = document.querySelector(".max")
max.textContent = "MAX SCORE:"+maxScore
// shu yerda toxtading new game ni qoshish

let interval
function timer (count=9) {
    interval = setInterval(function(){ 
    hour.textContent = `00:0${count}`
    count--
    if(count<0){
        if(gameCount==1){
            showGameEnd(0) 
        return}
        clearInterval(interval)
        gameFlags()
        hour.textContent = `00:10`
        timer(9)
    }

 }, 1000);}

 button.addEventListener("click",()=>{
    button.textContent = "NEXT"
    if(gameCount==1){
        showGameEnd(0)
    }
    else{
        clearInterval(interval)
        hour.textContent = `00:10`
        gameFlags()
        timer(9)
    }
    
})


 let render=(lst)=>{
    flags.innerHTML = null
    let flagName
    let img1 = document.createElement("img")
    let img2 = document.createElement("img")
    let img3 = document.createElement("img")
    let img4 = document.createElement("img")
    
    img1.classList.add("img");img2.classList.add("img")
    img3.classList.add("img");img4.classList.add("img")
    
    img1.src = `./flags/${lst[0]}.png`
    img2.src = `./flags/${lst[1]}.png`
    img3.src = `./flags/${lst[2]}.png`
    img4.src = `./flags/${lst[3]}.png`
    flags.append(img1,img2,img3,img4)
    let randSon = Math.random()*3.9999|0
    let randNatija = lst[randSon]

    let infoFlags = fetch("https://flagcdn.com/en/codes.json")
    
    infoFlags
        .then((data)=>data.json())
        .then((data)=>{
            flagName = data[randNatija]
            h1.textContent = flagName
            
            img1.addEventListener("click",()=>{
                checkvalue(randNatija,0)
                
            })
            img2.addEventListener("click",()=>{
                checkvalue(randNatija,1)

            })
            img3.addEventListener("click",()=>{
                checkvalue(randNatija,2)
                
            })
            img4.addEventListener("click",()=>{
                checkvalue(randNatija,3)

            })
        }
        )

    function checkvalue(value1,value2){

        if(lst[value2]==value1){
            score++
            gamescore.textContent = "SCORE:"+score
        }
        addClass()
        kutib()
        button.disabled = true
        
    }

    function addClass(){
        let images = [img1,img2,img3,img4]
        for(let j=0;j<4;j++){
            if(randSon==j){
                images[j].classList = "correct"
            }
            else{
                images[j].classList = "wrong"
            }
        }
    }

    async function kutib(){
        await sleep(2000)
        button.disabled = false
        if(gameCount==1){
            showGameEnd(0)
            return
        }

        hour.textContent = "00:10"
        clearInterval(interval)
        timer()
        gameFlags()
    }

 }

async function showGameEnd(sum){
    if(sum==0){
        //game count togirlash kerak
        gameCount = 16
        gameEnd.textContent = 15
        
        
        button.textContent = "NEW GAME"
        hour.textContent = `00:10`
        flags.innerHTML = null
        h1.textContent = ""
        if((maxScore)<=score){
            localStorage.setItem("maxscore",JSON.stringify(score))
        }
        score = 0
        gamescore.textContent = "SCORE:"+score
        max.textContent = "MAX SCORE:"+JSON.parse(localStorage.getItem("maxscore"))
        clearInterval(interval)


        
    }
    else{
        gameEnd.textContent = sum
    }
}


 function gameFlags(){
    gameCount--
    showGameEnd(gameCount)

    let lstFlagsAPI = []
    let showFlags = []
    let infoFlags = fetch("https://flagcdn.com/en/codes.json")
    infoFlags
        .then((data)=>data.json())
        .then((data)=>{
            for(let j in data){
                lstFlagsAPI.push(j)
            }
            for(let i=0;i<4;i++){
                let h = lstFlagsAPI[Math.random()*306|0]
                if(!showFlags.includes(h)&&(h[0]!="u" && h[1]!="s" && h.length!=4 && h!="eu")){
                    showFlags.push(h)
                }
                else{
                    i--
                }
            }
        render(showFlags)
        })
    
 }

//  gameFlags()