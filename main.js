const elForm = document.querySelector(".js-form");
const elSelectLevel = document.querySelector(".js-level");
const elSelectTime = document.querySelector(".js-time");
const elBtn = document.querySelector(".js-btn")
const elBox = document.querySelector(".offcanvas-body")
const elModal = document.querySelector(".modall")
const elTitleQuestion = document.querySelector(".question");
const elAnswerList = document.querySelector(".answer-list");
const elScoreText = document.querySelector(".score");
const elScoreOneText = document.querySelector(".scoreOne");
const fragment = document.createDocumentFragment();
shuffle(roadSymbols);

let attemp = 5;
let scoreOne = 0;

function renderSymbols(arr) {
    arr.forEach(itm => {
        const newIMg = document.createElement("img");
        
        newIMg.classList.add("img");
        
        newIMg.src = itm.symbol_img;
        newIMg.dataset.id = itm.id;
        elScoreOneText.textContent = `Score : ${scoreOne}`;
        elScoreText.textContent = `Attemp : ${attemp}`;
        
        fragment.appendChild(newIMg);
    })
    elAnswerList.appendChild(fragment)
}


function renderSymbolsTitle (arr) {
    arr.forEach(itm => {
        elTitleQuestion.textContent = itm.symbol_title;
        elTitleQuestion.dataset.id = itm.id;
    }) 
}

function shuffle(arr) {
    let current = arr.length,
    temp,
    random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        
        current--;
        
        temp = arr[current];
        
        arr[current] = arr[random];
        
        arr[random] = temp
    }
    
    return arr
}




elBtn.addEventListener("click", function(evt){
    evt.preventDefault();
    let a = roadSymbols.splice(0 , Number(elSelectLevel.value));
    renderSymbols(a);
    shuffle(a);
    renderSymbolsTitle(a);
    
    const elTime = document.querySelector(".time")
    const startMin = Number(elSelectTime.value);
    let time = startMin * 60;
    setInterval(updateCountDown, 1000)
    
    function updateCountDown() {
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        
        seconds = seconds < Number(elSelectTime.value) ? "0" + seconds : seconds;
        elTime.textContent = `Your time - ${minutes}:${seconds}`;
        time--;
        
        if(minutes == 0 && seconds == 0) {
            elModal.innerHTML = "";
            elModal.classList.add("lose") 
            elModal.innerHTML = `<button class="replay2"><img width="100" height="100" src="./images/replay1.svg"></button>`;
            const replayBtn = document.querySelector(".replay2") ;
            
            replayBtn.addEventListener("click", function (){
                window.location.reload()
            })
        }
    }
    elAnswerList.addEventListener("click", (e) => {
        const target = e.target;
        if (target.matches(".img")) {
            target.style.visibility = "visible"
            if(target.dataset.id == elTitleQuestion.dataset.id){
                target.style.backgroundColor = "green"
                setInterval(() => {
                    target.style.visibility = "hidden"
                    target.style.cursor = "not-allowed"
                }, "500")   
                
                elTitleQuestion.textContent = a[0].symbol_title;
                elTitleQuestion.dataset.id = a[0].id;
                a.splice(0 , 1);
                scoreOne += 2;
                elScoreOneText.textContent = `Score : ${scoreOne}`;
                i++
                if(i == (Number(elSelectLevel.value))) {
                    elBox.innerHTML = " ";
                    elBox.classList.add("win");
                    elTime.style.display = "none";
                    elBox.innerHTML = `<button class="replay"><img width="100" height="100" src="./images/replay1.svg"></button>`;
                    const replayBtn = document.querySelector(".replay") ;
                    
                    replayBtn.addEventListener("click", function (){
                        window.location.reload()
                    });
                } 
            }
            else {
                attemp--;
                elScoreText.textContent = `Attemp : ${attemp}`;
                target.style.backgroundColor = "red";
                setInterval(() => {
                    target.style.backgroundColor = "transparent";
                }, "1000") ;
                if(attemp == 0) {
                    elBox.innerHTML = " ";
                    elBox.classList.add("lose");
                    elTime.style.display = "none";
                    elBox.innerHTML = `<button class="replay2"><img width="100" height="100" src="./images/replay1.svg"></button>`;
                    const replayBtn = document.querySelector(".replay2") ;
                    
                    replayBtn.addEventListener("click", function (){
                        window.location.reload()
                    })
                }
                scoreOne--;
                elScoreOneText.textContent = `Score : ${scoreOne}`;
            }
        }
    })
});

let i= 0;


