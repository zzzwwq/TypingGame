window.onload=function(){
    let game=new Game();
    game.screen=document.querySelector(".bg");
    game.gardenBox=document.querySelector(".garden");
    game.lifesBox=document.querySelector(".lifes");
    game.life=document.querySelector(".life");
    game.point=document.querySelector(".point");
    game.point1=document.querySelector(".point1");
    game.Apause1=document.querySelector(".Apause");

    game.success=document.querySelector("#success");

    let numb=5;
    for (let i=0;i<numb;i++){
        game.createLetter();
    }

    // 音乐播放与暂停
    let music=document.querySelector("#music");
    function MusicPlayer(status) {
        if (status ==1) {
            music.pause();
        } else {
            music.play();
        }
    };
    let Aplay=document.querySelector(".Aplay");
    MusicPlayer(1);
    game.Play(1);
    Aplay.onclick=function(){
        Aplay.style.zIndex="0";
        game.Apause1.style.zIndex="2";
        MusicPlayer(1);
        game.Play(1);
    }
    game.Apause1.onclick=function(){
        game.Apause1.style.zIndex="0";
        Aplay.style.zIndex="2";
        MusicPlayer(0);
    }

    // 键盘
    let conBox=document.querySelector(".conBox");
    conBox.onclick=function(event){
        if (state==false){
            if (event.target.className!="conBox") {
                let text=event.target.innerText;
                game.remove(text,1);
            }
        }
    }
    //兔子
    let rabbit=document.querySelector(".rabbit");
    let ra=setInterval(fn,150);
    let num=1;
    function fn(){
        num++;
        if (num==16){
            num=1;
        }
        rabbit.style.backgroundImage=`url("img/rabbit${num}.png")`;
    }



    // 暂停与开始
    let Play=document.querySelector(".Play");
    let Pause=document.querySelector(".Pause");
    let state=true;
    clearInterval(ra);
    Play.onclick=function(){
        Play.style.zIndex="0";
        Pause.style.zIndex="2";
        game.run();
        state=false;
        ra=setInterval(fn,150);
    }
    Pause.onclick=function(){
        Pause.style.zIndex="0";
        Play.style.zIndex="2";
        game.Pause();
        state=true;
        clearInterval(ra);
    }


    //游戏结束
    let bg1=document.querySelector(".bg1");
    console.log(bg1);
    setInterval(over,100);
    function over(){
        if (game.flag==false){
            Pause.style.zIndex="2";
            clearInterval(ra);
            game.Pause();
            bg1.style.display="block";
        }
    }
    //  游戏重新开始
    let button=document.querySelector("button");
    button.onclick=function(){
        game.flag=true;
        state=true;
        bg1.style.display="none";
        Pause.style.zIndex="0";
        Play.style.zIndex="2";
        clearInterval(ra);
        game.sm=10;
        game.jf=0;
        game.life.innerText=game.sm;
        game.point.innerText=game.jf;
        game.point1.innerText=game.jf;
        for (let item of game.letters){
            game.screen.removeChild(item.node);
        }
        game.letters=[];
        for (let i=0;i<numb;i++){
            game.createLetter();
        }
        game.Pause();
    }

}