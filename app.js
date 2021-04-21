const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
//canvas의 context는 이 안에서 픽셀을 컨트롤 해줌
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLORS = "black";//디폴트 색상
const CANVAS_SIZE = 700; //디폴트 캔버스 사이즈

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;//캔버스 사이즈도 css에 준것처럼 넣어줘야 작동 가능

/*디폴트값 정의*/
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); 
ctx.strokeStyle = INITIAL_COLORS;//캔버스 안에 그어지는 선의 색
ctx.fillStyle = INITIAL_COLORS; //paint 눌렀을때 
ctx.lineWidth = 2.5; //캔버스를 그리는 선의 px


let painting = false; //디폴트값을 false로 주어 painting이 되는지 확인
let filling;

function stopPainting(){
    painting = false; 
    //마우스를 떼거나 캔버스 밖으로 나갈경우 페인팅 변수를 false로 변경
}
function startPainting(){
    painting = true;
}

function onMouseMove(event){//캔버스 안에서 마우스 움직이는 모든 것 확인
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){//캔버스에 클릭이 되지 않을 때
        // console.log("creating path in",x,y)
        ctx.beginPath();//Path = 선
        ctx.moveTo(x, y);
    }
    else{//마우스를 움직일 때마다 사용
        // console.log("creating line in",x,y)
        ctx.lineTo(x, y); //path의 위치에서 선을 만듬
        ctx.stroke();//현재의 마우스 위치에서 선을 그림
    }
    
}
function handleColorClick(event){//event : 색 변경 div를 지칭
    // console.log(event.target.style)
    const color = event.target.style.backgroundColor; //해당 이벤트의 style->배경색 가져오기
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){//event : 브러쉬 사이즈 정하는 input을 지칭
    const size = event.target.value;//해당 이벤트의 style->value 값 가져오기
    ctx.lineWidth = size; 
}
function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = 'Fill'
    }
    else{
        filling = true;
        mode.innerText = 'Paint';
        
    }
}
function handleCanvasClick(){
    if(filling){
       ctx.fillRect(0, 0, canvas.width, canvas.height); 
    }
}

function handleCM(event){//우클릭 방지
    event.preventDefault();   
}

function handleSaveClick(){//save 버튼 클릭 시 이미지로 저장하는 function
    const image = canvas.toDataURL();//캔버스의 입력값을 png로 전환
    const link = document.createElement("a");//a태그를 생성해줌
    link.href = image; //캔버스 데이타 url 경로 
    link.download = "PaintJS[EXPORT]";//다운로드 시 제목
    link.click();

}


if(canvas){//canvars가 존재하는지 확인 있으면 안에 있는 이벤트들 실행
    canvas.addEventListener("mousemove",onMouseMove);//마우스가 움직일때
    canvas.addEventListener("mousedown",startPainting);//마우스가 클릭했을때
    canvas.addEventListener("mouseup",stopPainting);//마우스를 뗐을 때
    canvas.addEventListener("mouseleave",stopPainting);//마우스가 캔버스 밖으로 나갔을때 
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);//우클릭 방지 이벤트 생성
}


Array.from(colors).forEach(color=>
    color.addEventListener("click",handleColorClick)
    //배열로 만든 div를 반복문으로 돌려 click function 호출
);
//Array.from : array constructor method 호출 
//Array.from 메소드는 object 로부터 array를 만듦

if(range){//사이즈 조절
    range.addEventListener("input",handleRangeChange);
    //range 는 input 에서만 반응함
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}