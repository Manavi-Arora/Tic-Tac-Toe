let mode = "light";
let playerX = true;
let vol = "on";
let noPlayer = 1;
let winSound = new Audio("winSound.mp3");
let playSound = new Audio("playSound.mp3");
let loose = new Audio("loose.mp3");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]
let divs = document.querySelector("main").querySelectorAll("div");

function checkWinner() {
    let findWinner = false;
    if(mode === "light"){
    divs.forEach(element => {
        element.style.color = "black";
      });
    }else{
        divs.forEach(element => {
            element.style.color = "white";
          });   
    }
    for (const pattern of winPatterns) {
        let place1Val = divs[pattern[0]].innerText;
        let place2Val = divs[pattern[1]].innerText;
        let place3Val = divs[pattern[2]].innerText;
        
        if (place1Val != "" && place2Val != "" && place3Val != "") {
            if (place1Val == place2Val && place2Val == place3Val) {
                console.log("winner", place1Val);
                document.querySelector(".turn").innerText = "";
                findWinner = true;               
                if (noPlayer === 1) {
                    if (place1Val == "O") {
                        document.getElementsByClassName("winner")[0].innerText = `You Win!!`;
                        divs[pattern[0]].style.color = "green";
                        divs[pattern[1]].style.color = "green";
                        divs[pattern[2]].style.color = "green";
                        if (vol === "on") {
                            winSound.load();
                            winSound.play();
                        }
                    }
                    else {
                        document.getElementsByClassName("winner")[0].innerText = `Computer Wins!!`;
                        divs[pattern[0]].style.color = "red";
                        divs[pattern[1]].style.color = "red";
                        divs[pattern[2]].style.color = "red";
                        if (vol === "on") {
                            playSound.pause();
                            loose.load();
                            loose.play();
                        }
                    }
                }
                else {
                    document.getElementsByClassName("winner")[0].innerText = `Player ${place1Val} wins!!`
                    divs[pattern[0]].style.color = "green";
                    divs[pattern[1]].style.color = "green";
                    divs[pattern[2]].style.color = "green";
                    if (vol === "on") {
                        winSound.load();
                        winSound.play();
                    }
                }


                divs.forEach(element => {
                    element.classList.add("disabled");
                });
            }

        }
        
    }

    let arr = Array.from(document.querySelector("main").innerText);
    console.log(arr);
    if (arr.length == 17) {
        if (!findWinner) {
            document.getElementsByClassName("winner")[0].innerText = `Draw`
            document.querySelector(".turn").innerText = "";
        }
    }
    return findWinner;
}
theme.addEventListener("click", () => {
    if (mode == "light") {
        document.querySelector("#theme").src = "svgs/light.svg";
        document.querySelector("body").classList.add("dark");
        document.querySelector("body").classList.remove("light");

        document.querySelector("main").querySelectorAll("div").forEach(element => {
            element.style.borderColor = "white";
        });

        divs.forEach(element => {
            element.style.color = "white";
          });

        volume.querySelectorAll("path").forEach(element => {
            element.setAttribute("stroke", "white");
        });
        console.log("dark");
        mode = "dark";

    }
    else if (mode == "dark") {
        document.querySelector("#theme").src = "svgs/dark.svg";
        document.querySelector("body").classList.add("light");
        document.querySelector("body").classList.remove("dark");

        document.querySelector("main").querySelectorAll("div").forEach(element => {
            element.style.borderColor = "black";
        });

        divs.forEach(element => {
            element.style.color = "black";
          });

        volume.querySelectorAll("path").forEach(element => {
            element.setAttribute("stroke", "black");
        });
        console.log("light");
        mode = "light";
    }
})

const computerTurn = () => {
    let boxNo;
    let div;

    do {
        boxNo = Math.floor(Math.random() * 8);
        div = divs[boxNo];
    } while (div.classList.contains("disabled"));

    console.log(boxNo);
    console.log(div.classList.contains("disabled"));

    return div;
}

divs.forEach(element => {
    element.addEventListener("click", () => {
        if (noPlayer === 2) {
            if (!element.classList.contains("disabled")) {
                if (playerX == false) {
                    document.querySelector(".turn").innerText = "Turn : Player O";
                    element.innerText = "X";
                    if (vol === "on") {
                        playSound.load();
                        playSound.play();
                    }
                    playerX = true;
                    checkWinner();
                }
                else {
                    element.innerText = "O";
                    document.querySelector(".turn").innerText = "Turn : Player X";
                    playerX = false;
                    if (vol === "on") {
                        playSound.load();
                        playSound.play();
                    }
                    checkWinner();
                }
                element.classList.add("disabled");
            }
        }
        else if (noPlayer === 1) {
            let draw = false;
            if (!element.classList.contains("disabled")) {
                element.innerText = "O";
                if (vol === "on") {
                    playSound.load();
                    playSound.play();
                }
                document.querySelector(".turn").innerText = "Turn : Computer";
                playerX = true;
                element.classList.add("disabled");
                let check = checkWinner();
                let arr = Array.from(document.querySelector("main").innerText);

                if (!check) {
                    if (arr.length < 15) {
                        if (playerX == true) {
                            document.querySelector(".turn").innerText = "Turn : You";
                            console.log(computerTurn());
                            let div = computerTurn();
                            div.innerText = "X";
                            div.classList.add("disabled");
                            playerX = false;
                            check = checkWinner();

                        }
                    }
                }
                if (!check) {
                    if (arr.length > 15) {
                        draw = true;
                    }
                }

            }
            if (draw) {
                document.getElementsByClassName("winner")[0].innerText = `Draw`
                document.querySelector(".turn").innerText = "";
            }

        }
    })
});

function NewGame(){
    divs.forEach(element => {
        element.innerText = "";
        element.classList.remove("disabled");

    });
    document.getElementsByClassName("winner")[0].innerText = "";
    document.querySelector(".turn").innerText = "";

}

newGame.addEventListener("click", NewGame);


volume.addEventListener("click", () => {
    if (vol == "on") {

        volume.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> \
        <path d="M22 22L2 2" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        <path d="M17 10C17.6296 10.7667 18 11.7054 18 12.7195C18 13.1635 17.929 13.593 17.7963 14" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        <path d="M20 8C21.2508 9.22951 22 10.7952 22 12.5C22 13.9164 21.4829 15.2367 20.5906 16.348" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        <path d="M14 14C14 17.1452 14 19.5313 13.074 19.9227C12.1481 20.3141 11.0583 19.2021 8.8787 16.9781C7.7499 15.8264 7.106 15.5713 5.5 15.5713C4.3879 15.5713 3.02749 15.7187 2.33706 14.6643C2 14.1496 2 13.4331 2 12C2 10.5669 2 9.85038 2.33706 9.33566C3.02749 8.28131 4.3879 8.42869 5.5 8.42869C6.60725 8.42869 7.3569 8.43869 7.96 7.96M14 9.5C14 6.3548 14.026 4.46866 13.1 4.0773C12.3292 3.75147 11.5323 4.46765 10 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        </svg>';
        vol = "off";
        if (mode == "dark") {
            volume.querySelectorAll("path").forEach(element => {
                element.setAttribute("stroke", "white");
            });
        }
        if (mode == "light") {
            volume.querySelectorAll("path").forEach(element => {
                element.setAttribute("stroke", "black");
            });
        }

    }
    else if (vol == "off") {

        volume.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> \
        <path d="M14 14.8135V9.18646C14 6.04126 14 4.46866 13.0747 4.0773C12.1494 3.68593 11.0603 4.79793 8.88232 7.02192C7.75439 8.17365 7.11085 8.42869 5.50604 8.42869C4.10257 8.42869 3.40084 8.42869 2.89675 8.77262C1.85035 9.48655 2.00852 10.882 2.00852 12C2.00852 13.118 1.85035 14.5134 2.89675 15.2274C3.40084 15.5713 4.10257 15.5713 5.50604 15.5713C7.11085 15.5713 7.75439 15.8264 8.88232 16.9781C11.0603 19.2021 12.1494 20.3141 13.0747 19.9227C14 19.5313 14 17.9587 14 14.8135Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        <path d="M17 9C17.6254 9.81968 18 10.8634 18 12C18 13.1366 17.6254 14.1803 17 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        <path d="M20 7C21.2508 8.36613 22 10.1057 22 12C22 13.8943 21.2508 15.6339 20 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
        </svg>' ;
        vol = "on";
        if (mode == "dark") {
            volume.querySelectorAll("path").forEach(element => {
                element.setAttribute("stroke", "white");
            });
        }
        if (mode == "light") {
            volume.querySelectorAll("path").forEach(element => {
                element.setAttribute("stroke", "black");
            });
        }

    }

});

playerNo.addEventListener("click", () => {
    NewGame();
    if (noPlayer === 1) {
        document.querySelector("#playerNo").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> \
    <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="#595858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
    <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="#595858" stroke-width="1.5"/> \
    </svg>'
        noPlayer = 2;
    }

    else if (noPlayer === 2) {
        document.querySelector("#playerNo").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"> \
<path d="M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="#595858" stroke-width="1.5"/> \
<path d="M15 11C17.2091 11 19 9.20914 19 7C19 4.79086 17.2091 3 15 3" stroke="#595858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
<path d="M11 14H7C4.23858 14 2 16.2386 2 19C2 20.1046 2.89543 21 4 21H14C15.1046 21 16 20.1046 16 19C16 16.2386 13.7614 14 11 14Z" stroke="#595858" stroke-width="1.5" stroke-linejoin="round"/> \
<path d="M17 14C19.7614 14 22 16.2386 22 19C22 20.1046 21.1046 21 20 21H18.5" stroke="#595858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> \
</svg>'
        noPlayer = 1;
    }
})


