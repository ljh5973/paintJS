const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const jsColor = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const rangeText= document.getElementsByClassName("rangeText");
const fillBtn = document.getElementsByClassName("controls_btns")[0].children[0];
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR="#2c2c2c"
const CANVAS_SIZE=700;



// canvas 사이즈를 줘야함
canvas.width= CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

// strokeStyle= 색상
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;



//lineWidth = 선의 굵기
ctx.lineWidth= 2.5;



let painting = false;
let filling = false;

function startPainting(){
    painting=true;
}


function stopPainting(event){
    painting=false;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //path 는 선
        ctx.beginPath();
        //moveTO = path의 전 위치
        ctx.moveTo(x,y);
        
    } else{
        console.log("creating line", x ,y)
        //lineTo = path의 전 위치에서 지금 위치까지 선을 만드는것
        ctx.lineTo(x,y);
        // stroke 획을 긋는다
        ctx.stroke();
        
    }
}

function onMouseDown(event){
    painting= true;

}
function handleColorClick(event){
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle= color;

}

function handleRangeChange(event){
    const range=event.target.value;
    ctx.lineWidth=range;
    rangeText[0].innerHTML=range;
    

}

function handleModeClick(){
    if(filling===true){
        filling=false;
        fillBtn.innerHTML="FILL"

    }else{
        filling=true;
        fillBtn.innerHTML="PAINT"
        
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)

    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image= canvas.toDataURL();
    const link = document.createElement("a");
    link.href=image;
    link.download="PaintJS[EXPORT]🎨";
    
    link.click();
}

// function changeFillBtn(event){
//     fillBtn.classList.toggle("have");
//     if(fillBtn.classList.contains("have")){
//         fillBtn.innerHTML="paint"
//     }else{
//         fillBtn.innerHTML="fill"
//     }
// }

if(canvas){
    // move 마우스 움직일 때
    canvas.addEventListener("mousemove",onMouseMove);
    // down 마우스 누를 때
    canvas.addEventListener("mousedown",startPainting);
    // up 마우스 땠을 때
    canvas.addEventListener("mouseup", stopPainting);
    // leave 마우스가 canvas밖으로 나갔을 때
    canvas.addEventListener("mouseleave", stopPainting );

    canvas.addEventListener("click", handleCanvasClick);
    
    canvas.addEventListener("contextmenu", handleCM);
}


// fillBtn.addEventListener("click", changeFillBtn);

Array.from(jsColor).forEach(color => color.addEventListener("click", handleColorClick));


if(fillBtn){

    fillBtn.addEventListener("click", handleModeClick);
}


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
