var elem = document.getElementById('content');
if (elem.addEventListener) {
    if ('onwheel' in document) {
        // IE9+, FF17+
        elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
    } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
    }
} else { 
    // IE8-
    elem.attachEvent("onmousewheel", onWheel);
}

num_color = 0;
ctrl_deg = 0;

function onWheel(e) {
    e = e || window.event;
    // deltaY, detail содержат пиксели
    // wheelDelta не дает возможность узнать количество пикселей
    // onwheel || MozMousePixelScroll || onmousewheel
    var delta = e.deltaY || e.detail || e.wheelDelta;
    delta = Math.round(e.wheelDelta);
    
    var info = document.getElementById('delta');

    deg = $('.color').attr('data-deg');
    color1 = $('.color').attr('data-color1');
    color2 = $('.color').attr('data-color2');

    if(ctrl_deg == 1){
        deg = + deg + delta/60;
        $('.color').attr('data-deg', deg);
        $('#content').css('background', 'linear-gradient('+deg+'deg, hsl('+color1+', 100%, 50%) 0%, hsl('+color2+', 100%, 50%) 100%)');
    }else {
        if(num_color == 0){
            color1 = + color1 + delta/60;
            $('#content').css('background', 'linear-gradient('+deg+'deg, hsl('+color1+', 100%, 50%) 0%, hsl('+color2+', 100%, 50%) 100%)');
            $('.color').attr('data-color1', color1);
        }else {
            color2 = + color2 + delta/60;
            $('#content').css('background', 'linear-gradient('+deg+'deg, hsl('+color1+', 100%, 50%) 0%, hsl('+color2+', 100%, 50%) 100%)');
            $('.color').attr('data-color2', color2);
        }
        
    }

    $('#text span').text('linear-gradient('+deg+'deg, hsl('+color1+', 100%, 50%) 0%, hsl('+color2+', 100%, 50%) 100%)');
    
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

document.addEventListener('keydown', function(event) {
    if (event.shiftKey) {
        ctrl_deg = 0;
        if(num_color == 0){
            num_color = 1;
            $('#text n').text(num_color);
        }else {
            num_color = 0;
            $('#text n').text(num_color);
        }
    }else if(event.ctrlKey){
        if(ctrl_deg == 0){
            ctrl_deg = 1;
            $('#text n').text('deg');

        }else {
            ctrl_deg = 0;
            $('#text n').text(num_color);
        }
    }
});

