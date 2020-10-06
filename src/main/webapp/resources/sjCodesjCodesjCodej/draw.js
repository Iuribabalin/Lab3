const $ = window.$;

$("#chart")[0].innerHTML = '<canvas id="canvas" width="500" height="500"></canvas>'

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

let value_r = 4;
/*
function windowToCanvas(canvas, x, y) {
    let bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

canvas.onmousedown = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    let rly_x = value_r*((loc.x - 250)/200)
    let rly_y = (-1) * value_r*((loc.y - 250)/200)

    if(rly_x > value_r || rly_y > value_r || rly_x < -1 * value_r || rly_y < -1 *value_r){
        document.getElementById('ErrorCanvas').innerText = "Не тыкай по краям, ЗАПРЕТ";
    }else {

        const selectX = $("#selectX")
        selectX.append(`<option value="${rly_x.toString()}">${rly_x.toString()}</option>`)
        selectX[0].value = rly_x.toString()

        const selectR = $("#selectR")
        selectR.append(`<option value="${value_r.toString()}">${value_r.toString()}</option>`)
        selectR[0].value = value_r.toString()

        $("#y_param")[0].value = rly_y.toString()

        flag_cvs = true;

        $("#submit")[0].click()
    }
};
*/

function set_r_value(flag_draw){
    if(flag_draw == 1){
        let input = document.getElementById("j_idt6:input3_input");
        value_r = input.value;
    }else {
        let cells = Array.prototype.slice.call(document.getElementById("table_out_data").getElementsByTagName("td"));

        if(Number(cells[2].innerHTML) !== 0) {
            value_r = Number(cells[2].innerHTML);
        }else{
            let input = document.getElementById("j_idt6:input3_input");
            value_r = input.value;
        }
    }
}

function drawPoint(x,y,r, last_point) {
    let flagger = x > r || y > r || x < -1 * r || y < -1 *r;
    if(!flagger){
        ctx.beginPath();

        if(last_point === "last") {
            ctx.fillStyle = "rgba(0, 255, 0, 1)";
        }else{
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
        }

        ctx.arc(250 + 200 * x * 10 / (r*10), 250 - 200 * y*10 / (r*10), 3, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

function draw(flag_draw){

    set_r_value(flag_draw)

    ctx.clearRect(0, 0, 1000, 1000);

    ctx.fillStyle = "rgba(91,95,201,1)";
    ctx.beginPath();
    ctx.moveTo(250, 250);
    //отображаем сектор круга
    ctx.arc(250, 250, 200, 0 ,Math.PI/2, false);
    //отображаем прмоугольник
    ctx.fillRect(250, 250, 200, -100);
    //отображаем треугольник
    ctx.moveTo(250,250);
    ctx.lineTo(50,250);
    ctx.lineTo(250,150);
    ctx.fill();

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.moveTo(30,250);
    ctx.lineTo(470,250);

    ctx.lineTo(465,255);
    ctx.moveTo(470,250);
    ctx.lineTo(465,245);
    ctx.font = "20px serif";
    ctx.fillText('X',470,245);

    ctx.moveTo(250,470);
    ctx.lineTo(250,30);

    ctx.lineTo(255,35);
    ctx.moveTo(250,30);
    ctx.lineTo(245,35);

    ctx.fillText('Y',255,35);

    ctx.moveTo(450,260);
    ctx.lineTo(450,240);
    ctx.fillText(value_r ,445,230);

    ctx.moveTo(350,260);
    ctx.lineTo(350,240);
    ctx.fillText(value_r/2 ,345,230);

    ctx.moveTo(50,260);
    ctx.lineTo(50,240);
    ctx.fillText(-value_r ,55,230);

    ctx.moveTo(150,260);
    ctx.lineTo(150,240);
    ctx.fillText(-value_r/2 ,145,230);

    ctx.moveTo(240,50);
    ctx.lineTo(260,50);
    ctx.fillText(value_r ,260,60);

    ctx.moveTo(240,150);
    ctx.lineTo(260,150);
    ctx.fillText(value_r/2 ,260,160);

    ctx.moveTo(240,450);
    ctx.lineTo(260,450);
    ctx.fillText(-value_r ,260,460);

    ctx.moveTo(240,350);
    ctx.lineTo(260,350);
    ctx.fillText(-value_r/2 ,260,360);

    ctx.closePath();
    ctx.stroke();

    chekTableAndDraw()
}


function chekTableAndDraw(){
    let cells = Array.prototype.slice.call(document.getElementById("table_out_data").getElementsByTagName("td"));
    let n = cells.length
    if(Number(cells[2].innerHTML) !== 0){
        for(let i = 0; i < n; i++){
            if(i === 0){
                drawPoint(Number(cells[i].innerHTML),
                    Number(cells[i+1].innerHTML),
                    value_r,"last");
                i+=3
            }else {
                drawPoint(Number(cells[i].innerHTML),
                    Number(cells[i+1].innerHTML),
                    value_r," ");
                i+=3
            }
        }
    }
}

function eventHandler(event) {
    checkboxOut()
    draw()
}

function checkboxOut(){
    document.getElementById('j_idt6:item_3').checked = false;
    document.getElementById('j_idt6:item_2').checked = false;
    document.getElementById('j_idt6:item_1').checked = false;
    document.getElementById('j_idt6:item0').checked = true;
    document.getElementById('j_idt6:item1').checked = false;
    document.getElementById('j_idt6:item2').checked = false;
    document.getElementById('j_idt6:item3').checked = false;
    document.getElementById('j_idt6:item4').checked = false;
}

$(window).on('resize', eventHandler)
$(window).on('load', eventHandler)