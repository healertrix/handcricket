//jshint esversion:7
let pruns = 0;
let cruns = 0;
let song = new Audio("voice/5.mp3");
let updatevalue = 3;
const computername = document.querySelector(".computerscore h2");
const playername = document.querySelector(".playerscore h2");

let whobat = "Player is batting now";
//Send it out

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {

  }
};
//Old sendup
// function sendup(data) {
// req.open("PUT", "https://api.jsonbin.io/b/5fe0d5ac47ed0861b36a3b9b", true);
//          req.setRequestHeader("Content-Type", "application/json");
//    req.setRequestHeader("secret-key", "$2b$10$6qGof9HF/bccFFGUOk4seO8ZsoQQjZ5tQM94PgQtcg8SE9cBL/70i");


//             req.send(data);

// }
// old send up

// New
function sendup(data) {
  req.open("POST", "https://jsonbox.io/box_f9838d55091ff3da50b9", true);
  req.setRequestHeader("Content-Type", "application/json");
//   req.setRequestHeader(
//     "secret-key",
//     "$2b$10$6qGof9HF/bccFFGUOk4seO8ZsoQQjZ5tQM94PgQtcg8SE9cBL/70i"
//   );

  req.send(data);
}

//

//intro fadein and fadeout
const startgame = () => {
   const introduction = document.querySelector('.intro');
   const score = document.querySelector('.score');
   const startbttn = document.querySelector('.intro button');
   const main = document.querySelector('.main');

   startbttn.addEventListener('click', () => {
      introduction.classList.add('fadeout');
      main.classList.add('fadein');
      score.classList.add('fadein');
   });

};

startgame();
//

//run calculator


const runcalc = () => {
   const choices = document.querySelectorAll('.choices button');
   const playerhand = document.querySelector('.playerhand');
   const computerhand = document.querySelector('.computerhand');
   choices.forEach(function (option) {
      option.addEventListener('click', () => {
         computerhand.classList.add("computerhandshaker");
         playerhand.classList.add("playerhandshaker");
         if (updatevalue==0) {
            location.reload("false");
         }
         else {
            const compchoice = Math.floor(Math.random() * 6) + 1;
            const playerchoice = option.textContent;
            playerhand.src = `./assets/fist.svg`;
            computerhand.src = `./assets/fist.svg`;
            setTimeout(() => {
               playerhand.src = `./assets/${playerchoice}.svg`;
               computerhand.src = `./assets/${compchoice}.svg`;
               playerhand.classList.remove("playerhandshaker");
               computerhand.classList.remove("computerhandshaker");
            }, 500);
            matchupdate(playerchoice, compchoice);
         }
      });
   });

  txt.addEventListener("keypress", (e) => {
    
  });

};

const computerrun = document.querySelector(".computerscore p");
const playerrun = document.querySelector(".playerscore p");
const billboard = document.querySelector(".main p");
const matchupdate = (playerchoice, compchoice) => {
   //Sending up
   let playersendm = "player: " + playerchoice;
                  let compsendm = "comp: " + compchoice;
   let plruns = "Player runs: " + pruns;
  let clruns = "Computer runs: " + cruns;
   let runny = plruns + ' ' + ' '+ clruns;
   let newer = [runny, "Player is batting", playersendm, compsendm];
   let knewer = {'a': runny, 'b':whobat, 'c':playersendm,'d': compsendm };

   let luck = JSON.stringify(knewer);
   // let data = JSON.parse(knewer);

   
   sendup(luck);
   //Sending over
   if (updatevalue == 3) {
      computername.textContent = "Computer Runs";
      playername.textContent = "Player Runs🏏";
     //billboard.textContent = "Player will bat first";
      if (playerchoice == compchoice) {
        whobat = "Computer is batting now";
         setTimeout(() => {
            billboard.textContent = "YOU ARE OUT!!!      COMPUTER WILL BAT NEXT";
         }, 700);
         song.pause();
         song = new Audio("voice/0.mp3");
         song.play();
        setTimeout(function hello() {
           updatevalue = 4;
           playerchoice = 0;
        }, 200);

     } else {
        {
           if (playerchoice == 4) {
              song.pause();
               song = new Audio("voice/4.mp3");
              song.play();
           }
           if (playerchoice == 6) {
             song.pause();
             song = new Audio("voice/6.mp3");
             song.play();
           }
           if (playerchoice == 5) {
             song.pause();
             song = new Audio("voice/5.mp3");
             song.play();
           }
           if (playerchoice == 3) {
             song.pause();
             song = new Audio("voice/3.mp3");
             song.play();
           }
           if (playerchoice == 1) {
             song.pause();
             song = new Audio("voice/1.mp3");
             song.play();
           }
           if (playerchoice == 2) {
             song.pause();
             song = new Audio("voice/2.mp3");
             song.play();
           }
            pruns = pruns + Number(playerchoice);
            setTimeout(() => {
               billboard.textContent = `YOU scored ${playerchoice} runs`;
               playerrun.textContent = pruns;
            },700);
       }
     }
   }

   if (updatevalue == 4) {
      computername.textContent = "Computer Runs🏏";
      playername.textContent = "Player Runs";
      if (playerchoice == compchoice) {
            //Sending up
         let playersendm = "player: " + playerchoice;
                  let compsendm = "comp: " + compchoice;
   let plruns = "Player runs: " + pruns;
   let clruns = "Computer runs: " + cruns;
   let runny = plruns + " " + " " + clruns;
         let newer = [runny, "Computer is batting", playersendm, compsendm];
         let  brew = {

           a: runny,
           b: whobat,
           c: playersendm,
           d: compsendm,
         };

     let luck = JSON.stringify(brew);
         let data = JSON.parse(luck);

   sendup(luck);
   //Sending over
         if (cruns == pruns) {
            setTimeout(() => {
               billboard.textContent = "Match TIED! 😱  😱 ";
            }, 700);
           updatevalue = 0;
         }
         else {
            //sending up
              let playersendm = "player: " + playerchoice;
              let compsendm = "comp: " + compchoice;
              let plruns = "Player runs: " + pruns;
              let clruns = "Computer runs: " + cruns;
              let runny = plruns + " " + " " + clruns;

              let knewer = {
                a: runny,
                b: "Computer is batting",
                c: playersendm,
                d: compsendm,
              };

            let luck = JSON.stringify(knewer);

              let data = JSON.parse(luck);
               

              sendup(luck);
            setTimeout(() => {
               billboard.textContent = "COMPUTER IS OUT!!  YOU WON!!!!! 😍 ";
            }, 700);
            setInterval(() => {
               party.screen();
            },800);
            updatevalue = 0;
            song.pause();
            song = new Audio("voice/won.mp3");
            song.play();
         }
     } else {
         {
            if (compchoice == 4) {
              song.pause();
              song = new Audio("voice/4.mp3");
              song.play();
            }
            if (compchoice == 6) {
              song.pause();
              song = new Audio("voice/6.mp3");
              song.play();
            }
            if (compchoice == 5) {
              song.pause();
              song = new Audio("voice/5.mp3");
              song.play();
            }
            if (compchoice == 3) {
              song.pause();
              song = new Audio("voice/3.mp3");
              song.play();
            }
            if (compchoice == 1) {
              song.pause();
              song = new Audio("voice/1.mp3");
              song.play();
            }
            if (compchoice == 2) {
              song.pause();
              song = new Audio("voice/2.mp3");
              song.play();
            }
            cruns = cruns + Number(compchoice);
            setTimeout(() => {
               billboard.textContent = `COMPUTER scored ${compchoice} runs`;
                 computerrun.textContent = cruns;
            }, 700);
            if (cruns > pruns) {
              //send
              //sending up
              let playersendm = "player: " + playerchoice;
              let compsendm = "comp: " + compchoice;
              let plruns = "Player runs: " + pruns;
              let clruns = "Computer runs: " + cruns;
              let runny = plruns + " " + " " + clruns;

              let knewer = {
                a: runny,
                b: "Computer is batting",
                c: playersendm,
                d: compsendm,
              };

              let luck = JSON.stringify(knewer);
              let data = JSON.parse(luck);
              sendup(luck);

              setTimeout(() => {
                billboard.textContent = "COMPUTER CHASED THE SCORE 🥳 ";
              }, 700);
              song.pause();
              song = new Audio("voice/loser.mp3");
              song.play();
              updatevalue = 0;
            }
       }
     }
   }
};
runcalc();

//
