var clicks = 0;
var newName = "nemo";
var localRanking = [
        {
            name:"nemo",
            score:20
        },{
            name:"nemo",
            score:17
        },{
            name:"nemo",
            score:14
        },{
            name:"nemo",
            score:11
        },{
            name:"nemo",
            score:8
        }
    ]

var dbRef1 = firebase.database().ref().child("rankingBoard");

dbRef1.on('value', snap => {
    var boardObj = snap.val();
    
    document.getElementById("one").innerText = "#1) " + boardObj.one.name + ": " + boardObj.one.score;
    document.getElementById("two").innerHTML = "#2) " + boardObj.two.name + ": " + boardObj.two.score;
    document.getElementById("three").innerHTML = "#3) " + boardObj.three.name + ": " + boardObj.three.score;
    document.getElementById("four").innerHTML = "#4) " + boardObj.four.name + ": " + boardObj.four.score;
    document.getElementById("five").innerHTML = "#5) " + boardObj.five.name + ": " + boardObj.five.score;
});


const getRanking = () => {
    var dbRef0 = firebase.database().ref().child("rankingBoard");

    dbRef0.once('value', snap => {
        var boardObj0 = snap.val();
        
        document.getElementById("one").innerHTML = "#1) " + boardObj0.one.name + ": " + boardObj0.one.score;
        document.getElementById("two").innerHTML = "#2) " + boardObj0.two.name + ": " + boardObj0.two.score;
        document.getElementById("three").innerHTML = "#3) " + boardObj0.three.name + ": " + boardObj0.three.score;
        document.getElementById("four").innerHTML = "#4) " + boardObj0.four.name + ": " + boardObj0.four.score;
        document.getElementById("five").innerHTML = "#5) " + boardObj0.five.name + ": " + boardObj0.five.score;
        
        localRanking[0].name = boardObj0.one.name;
        localRanking[0].score = boardObj0.one.score;
        localRanking[1].name = boardObj0.two.name;
        localRanking[1].score = boardObj0.two.score;
        localRanking[2].name = boardObj0.three.name;
        localRanking[2].score = boardObj0.three.score;
        localRanking[3].name = boardObj0.four.name;
        localRanking[3].score = boardObj0.four.score;
        localRanking[4].name = boardObj0.five.name;
        localRanking[4].score = boardObj0.five.score;
    });
}

const start = () => {

    inputProfile();
    document.getElementById("display").innerHTML = clicks;
    var profileNode = document.getElementById("info");
        document.getElementById("interfaceContainer").removeChild(profileNode);
    newGame();
}

const newGame = () => {
    var gameNode = document.createElement("button");
        gameNode.id = "gameButton";
        gameNode.onclick = function(){ press(); };
        gameNode.innerHTML = "Click Me!";
        document.getElementById("interfaceContainer").appendChild(gameNode);
    setTimeout(function(){
        checkRanking();
        var gameNode2 = document.getElementById("gameButton");
            document.getElementById("interfaceContainer").removeChild(gameNode2);
    },15000)
}

const inputProfile = () => {
    
    newName = document.getElementById("nameInput").value;

    firebase.database().ref("userHistory/"+newName).set({
        name:newName,
        score:0
    });
};

const press = () => {
    clicks++;
    document.getElementById("display").innerHTML = clicks;
}

const checkRanking = () => {
    var dbRef2 = firebase.database().ref().child("rankingBoard");
    
    dbRef2.on('value', snap => {
        var boardObj3 = snap.val();
        
        if(clicks > boardObj3.one.score){
            firebase.database().ref("rankingBoard/one").set({
                name:newName,
                score:clicks
            });
            firebase.database().ref("rankingBoard/two").set({
                name:localRanking[0].name,
                score:localRanking[0].score
            });
            firebase.database().ref("rankingBoard/three").set({
                name:localRanking[1].name,
                score:localRanking[1].score
            });
            firebase.database().ref("rankingBoard/four").set({
                name:localRanking[2].name,
                score:localRanking[2].score
            });
            firebase.database().ref("rankingBoard/five").set({
                name:localRanking[3].name,
                score:localRanking[3].score
            });
            console.log("user: "+clicks+" => rank 1");
        }else if(clicks > boardObj3.two.score && clicks < boardObj3.one.score){
            firebase.database().ref("rankingBoard/two").set({
                name:newName,
                score:clicks
            });
            firebase.database().ref("rankingBoard/three").set({
                name:localRanking[1].name,
                score:localRanking[1].score
            });
            firebase.database().ref("rankingBoard/four").set({
                name:localRanking[2].name,
                score:localRanking[2].score
            });
            firebase.database().ref("rankingBoard/five").set({
                name:localRanking[3].name,
                score:localRanking[3].score
            });
            console.log("user: "+clicks+" => rank 2");
        }else if(clicks > boardObj3.three.score && clicks < boardObj3.two.score){
            firebase.database().ref("rankingBoard/three").set({
                name:newName,
                score:clicks
            });
            firebase.database().ref("rankingBoard/four").set({
                name:localRanking[2].name,
                score:localRanking[2].score
            });
            firebase.database().ref("rankingBoard/five").set({
                name:localRanking[3].name,
                score:localRanking[3].score
            });
            console.log("user: "+clicks+" => rank 3");
        }else if(clicks > boardObj3.four.score && clicks < boardObj3.three.score){
            firebase.database().ref("rankingBoard/four").set({
                name:newName,
                score:clicks
            });
            firebase.database().ref("rankingBoard/five").set({
                name:localRanking[3].name,
                score:localRanking[3].score
            });
            console.log("user: "+clicks+" => rank 4");
        }else if(clicks > boardObj3.five.score && clicks < boardObj3.four.score){
            firebase.database().ref("rankingBoard/five").set({
                name:newName,
                score:clicks
            });
            console.log("user: "+clicks+" => rank 5");
        }
    });
}



//Unused code for future functionality

// const checkPersonal = () => {
//     console.log("2) New Score: " + clicks);
    
//     var dbRef2 = firebase.database().ref().child("userHistory/"+newName);
    
//     dbRef2.once('value', snap => {
//         var userObj2 = snap.val();
//         console.log("3) previous score: " + userObj2.score + "New Score: " + clicks);
//         if ( clicks > userObj2.score){
//             firebase.database().ref("userHistory/"+newName).set({
//                 name:newName,
//                 score:clicks
//             });
//         }
//     });
// }