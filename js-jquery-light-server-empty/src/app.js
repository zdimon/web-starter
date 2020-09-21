var div = document.getElementById('content');

div.addEventListener("click",function(evt){
    evt.stopPropagation();
    console.log(evt);
});

/*
     Движение мышкой.

     Отличие событий mouseenter от mouseover.

Различие между этими событиями заключается в том,
что события «mouseenter» и «mouseleave» получает только
самый «верхний» элемент, тогда как другая пара событий
«mouseover» и «mouseout» передается всем элементам, находящимся под курсором мыши.

*/

/*
var isDrag = false;

div.addEventListener("mousedown",
function(){ isDrag = true }
)

document.addEventListener("mouseup",
function(){ isDrag = false }
)

document.addEventListener("mousemove",
    function(e){
        if(isDrag){
            div.style.left = e.pageX + "px";
            div.style.top = e.pageY + "px";
        }
    }
)

/*

/*

**DOMContentLoaded** — браузер полностью загрузил HTML, файлы стилей и скриптов, 
построил структуру документа (DOM-структуру;

**load** — браузер загрузил все дополнительные ресурсы — изображения, фреймы;

**beforeunload** — браузер получил команду закрыть страницу (вкладку);

**unload** — браузер закрыл страницу (вкладку).


*/



document.addEventListener( "DOMContentLoaded" ,
function() {
    alert("DOM loaded");
}
)
