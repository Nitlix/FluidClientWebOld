

var messages = [
    ["Minecraft.", "🎮"],
    ["PvP.", "⚔️"],
    ["Boosted FPS.", "🚀"],
    ["Customisation.", "🔥"]
]

page_visibile = false;


var currenttypingmsg = 0;
var typingspeed = 50;
var discord = "https://discord.gg/fluidclient";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function fId(id){
    return document.getElementById(id);
}

function discordHover(self){
    //get the discord icon inside the hovered button (self)
    var discord = self.children[0];
    //add the class bx-tada to the discord icon
    discord.classList.add("bx-tada");
    //remove the class bx-tada after 1 second
}


function updateFps(){

    fId('fluid-fps').innerText = Math.floor(Math.random() * 20) + 630 + "fps";
    fId('lunar-fps').innerText = Math.floor(Math.random() * 80) + 350 + "fps";

}

function discordUnHover(self){
    //get the discord icon inside the hovered button (self)
    var discord = self.children[0];
    //remove the class bx-tada from the discord icon
    discord.classList.remove("bx-tada");
}


function typeWord(){
    var msg = messages[currenttypingmsg][0];
    var emoji = messages[currenttypingmsg][1];

    var i = 0;
    var interval = setInterval(function(){
        fId("type").innerHTML += msg.charAt(i);
        i++;

        //check if the message is finished typing
        if (i >= msg.length){
            clearInterval(interval);
            setTimeout(function(){
                fId("type").innerHTML += " " + emoji;
            }, typingspeed);
        }
    }, typingspeed);

    

    //next word
    currenttypingmsg++;
    if (currenttypingmsg >= messages.length){
        currenttypingmsg = 0;
    }


}

function notif(title, desc){
    fId('notif-title').innerText = title;
    fId('notif-desc').innerText = desc;
    fId('notif-wrapper').classList.add('active');
    setTimeout(()=>{
        fId('notif-wrapper').classList.remove('active');
    }, 5000);
}

function erase(){
    var i = -2;
    e = setInterval(function(){
        fId("type").innerHTML = fId("type").innerHTML.slice(0, i);
        if (fId("type").innerHTML.length == 0){
            clearInterval(e);
        }
        if (i == -2){
            i = -1;
        }

    }, typingspeed);
}


function toggleWindow(){
    page_visibile = !page_visibile;
}


function zoomers(){
    document.getElementsByClassName("snowflakes")[0].style.opacity = 0;

    fId('zoomer-wrapper').classList.add('active')
    fId('zoomer1').classList.add('active')
    notif("Welcome to our Discord!", "Thanks for joining us!")
    setTimeout(()=>{
        fId('zoomer2').classList.add('active')
        setTimeout(()=>{
            fId('zoomer3').classList.add('active')
            setTimeout(()=>{
                fId('discord').play()
                setTimeout(()=>{
                    window.location.href = discord;
                }, 1500)
            },150)
        },10)
    },250)
}


window.onload = function(){
    window.scrollTo(0,0);
    //Init AOS
    AOS.init({
        duration: 500,
        easing: 'ease',
        once: true
    });

    //Default Init


    // Hide window listener
    document.addEventListener("visibilitychange", toggleWindow()); 



    typeWord();
    updateFps();
    
    setTimeout(()=>{
        erase();
    }, 2000);


    setInterval(()=>{
        if (page_visibile){
            typeWord();
            setTimeout(()=>{
                erase();
            }, 2000);
        }
        
    }, 4000);

    setInterval(()=>{
        updateFps();
    }, 500);


    //CUSTOM SCROLL


    
    // var container = document.body;
    // var bodyScrollLevel = 0, newY, destY, currentY, windowScrollTop;
    // smoothScrollMove = function () {
    //     requestAnimationFrame(smoothScrollMove);
    //     windowScrollTop = window.pageYOffset;
    //     destY = windowScrollTop;
    //     currentY = -bodyScrollLevel;
    //     if (Math.round(currentY) != Math.round(destY)) {
    //     newY = Math.round(currentY + ((destY - currentY) * 0.08));
    //     bodyScrollLevel = -newY;
    //     container.style.transform = "translate3d(0,-" + newY + "px, 0)";
    //     }
    // }
    // requestAnimationFrame(smoothScrollMove);



   

        
    //DISCORD BUTTON HOVER
    var discordButtons = document.getElementsByClassName("discord");
    for (var i = 0; i < discordButtons.length; i++){
        discordButtons[i].addEventListener("mouseover", function(){
            discordHover(this);
        });
        discordButtons[i].addEventListener("mouseout", function(){
            discordUnHover(this);
        });

        discordButtons[i].addEventListener("click", function(){
            zoomers()
        });
    }


}


console.log("Fluid Client index.js Initiated 🚀");