class Game{
    constructor(){
      this.screen="";
      this.letters=[];
      this.sm=10;
      this.jf=0;
      this.life="";
      this.point="";
      this.point1="";
      this.flag=true;
      this.success="";
      this.Pause1="";
    }
    createLetter(){
        let div=document.createElement("div");
        div.className="letter";
        let code,content;
        do {
            code=parseInt(Math.random()*26+65);
            content=String.fromCharCode(code);
        }while(contentRepeat(content,this.letters));
        div.style.backgroundImage=`url(img/A_Z/${content}.png)`;

        let Left;
        // 去重
        do {
            Left=Math.random()*(7.5-4*0.55)+0.55;
        }while(leftRepeat(Left,this.letters));
        let Top=Math.random()*0.2+1.07;
        div.style.left=`${Left}rem`;
        div.style.top=`${Top}rem`;

        let obj={};
        let speed=Math.random()*0.05+0.1;
        obj['left']=Left;
        obj['top']=Top;
        obj['node']=div;
        obj['name']=content;
        obj['speed']=speed;
        this.letters.push(obj);

        this.screen.appendChild(div);
    }
    run(){
        this.t=setInterval(()=>{
            for (let item of this.letters){
                item['top']+=item['speed'];
                if (item['top']>7.94){
                    this.remove(item['name'],0);
                    continue;
                }
                item['node'].style.top=item['top']+"rem";
            }
        },100)
    }
    remove(content,type){
        for (let item of this.letters){
            if (item['name']==content){
                let index=this.letters.indexOf(item);
                this.screen.removeChild(item['node']);
                this.letters.splice(index,1);
                this.createLetter();
                if (type==0){
                    this.sm--;
                } else if(type==1){
                    this.jf++;
                    this.Play(0);
                    if (this.Apause1.style.zIndex=="2"){
                        this.Play(1);
                    }
                }
                this.life.innerText=this.sm;
                this.point.innerText=this.jf;
                this.point1.innerText=this.jf;

                if (this.sm==0){
                    this.flag=false;
                }
            }
        }
    }
    Pause(){
        clearInterval(this.t);
    }
    Play(sta){
        if (sta==1){
            this.success.pause();
        } else {
            this.success.play();
        }
    };

}

//去重
function leftRepeat(Left,letters){
    for (item of letters){
        if(Math.abs(Left-item.left)<=0.55){
            return true;
        }
    }
        return false;
}
function contentRepeat(content,letters){
    for (item of letters){
        if(item.name==content){
            return true;
        }
    }
    return false;
}

