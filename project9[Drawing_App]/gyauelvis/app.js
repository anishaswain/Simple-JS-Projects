let CanvasApp = {
    canvas: document.querySelector('#canvas'),
    isDrawn: false,
    colorMenuStatus: false,
    brushMenuStatus: false,
    brushColor: "black",
    lineWidth: 2,
    isErase: false,
    coverWholeScreen(){
        CanvasApp.canvas.height = window.innerHeight;
        CanvasApp.canvas.width = window.innerWidth;
    },
    draw(){
        CanvasApp.isDrawn = true;
        CanvasApp.canvas.getContext("2d").beginPath();
    },
    stopDraw(){
        CanvasApp.isDrawn = false;
    },
    letDraw(e){
        if(CanvasApp.isDrawn){
            const ctx = CanvasApp.canvas.getContext("2d");
            ctx.lineWidth = CanvasApp.lineWidth;
            ctx.lineCap = "round";
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            ctx.moveTo(e.clientX, e.clientY);
        }
        
    },
    colorMenu(){
        if(!CanvasApp.colorMenuStatus){
            document.getElementById("brushes").style.display = "none";
            CanvasApp.brushMenuStatus = false;
            document.getElementById("colors").style.display = "flex";
            CanvasApp.colorMenuStatus = true;
        }else{
            document.getElementById("colors").style.display = "none";
            CanvasApp.colorMenuStatus = false;
        }
    },

    brushMenu(e){
        e.preventDefault();
        if(!CanvasApp.brushMenuStatus){
            document.getElementById("colors").style.display = "none";
            CanvasApp.colorMenuStatus = false;
            document.getElementById("brushes").style.display = "flex";
            CanvasApp.brushMenuStatus = true;
            document.querySelectorAll(".brush").forEach(elem =>elem.style.backgroundColor = CanvasApp.brushColor);
        }else{
            document.getElementById("brushes").style.display = "none";
            CanvasApp.brushMenuStatus = false;
        }
    },

    selectedColor(color){
        CanvasApp.canvas.getContext("2d").strokeStyle = color;
        CanvasApp.brushColor = color;
    },

    eraserLine(e){
        e.preventDefault();
        if(CanvasApp.isErase){
            const ctx = CanvasApp.canvas.getContext("2d");
            ctx.clearRect(e.clientX, e.clientY, 7,7)
            ctx.moveTo(e.clientX,e.clientY)
        }
        
    }
}

window.addEventListener('load',()=>{
    CanvasApp.coverWholeScreen();
    document.querySelectorAll(".brush").forEach(elem =>elem.style.backgroundColor = CanvasApp.brushColor)
});

CanvasApp.canvas.addEventListener('mousedown',CanvasApp.draw);
CanvasApp.canvas.addEventListener('mouseup',CanvasApp.stopDraw);
CanvasApp.canvas.addEventListener('mousemove',CanvasApp.letDraw);
window.addEventListener('load',CanvasApp.letDraw);
window.addEventListener('resize', CanvasApp.coverWholeScreen);
document.querySelector('.palette').addEventListener('click',CanvasApp.colorMenu);
document.querySelector('.brush-btn').addEventListener('click',CanvasApp.brushMenu)

document.querySelectorAll('.color').forEach(elem =>{
    elem.addEventListener('click',(e)=>{
        e.preventDefault();
        CanvasApp.brushColor = e.target.title;
        CanvasApp.selectedColor( e.target.title);
        document.getElementById("colors").style.display = "none";
        CanvasApp.colorMenuStatus = false;
    })
})


document.querySelectorAll(".brush").forEach(elem =>{
    elem.addEventListener("click",(e)=>{
        e.preventDefault();
        CanvasApp.lineWidth =  Number(elem.classList[1].slice(4));
        document.getElementById("brushes").style.display = "none";
        CanvasApp.brushMenuStatus = false;
    });
})



document.querySelector(".eraser").addEventListener("click", (e)=>{
    if(CanvasApp.isErase){
        CanvasApp.canvas.removeEventListener('mousemove',CanvasApp.eraserLine);
        CanvasApp.canvas.addEventListener('mousemove',CanvasApp.letDraw);
        CanvasApp.isErase = false;
    }
    else{
        CanvasApp.canvas.removeEventListener('mousemove',CanvasApp.letDraw);
        CanvasApp.canvas.addEventListener('mousemove',CanvasApp.eraserLine);
        CanvasApp.isErase = true;
    }
});