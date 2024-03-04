
var firstX = 0, firstY = 0, endX = 0, endY = 0;//初始化坐标值
//window.addEventListener("touchstart", function (e) {
//    firstX = e.targetTouches[0].clientX;
//    firstY = e.targetTouches[0].clientY;
//});
//window.addEventListener("touchend", function (e) {
//    endX = e.changedTouches[0].clientX;
//    endY = e.changedTouches[0].clientY;
//    moveX = endX - firstX;//判断左右
//    moveY = endY - firstY;//判断上下
//    if (Math.abs(moveX) > 60 || Math.abs(moveY) > 60) {//判断是滑动，不是点击
//
//        if (Math.abs(moveX) > Math.abs(moveY)){
//            /*判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下*/
//
//            var elements = document.getElementsByClassName("panel");
//            if (elements[0].style.transform && elements[0].style.transform != 0){
//                var transValue = elements[0].style.transform.substring(elements[0].style.transform.indexOf('(')+1,elements[0].style.transform.indexOf(')')-1);
//                var maxTransValue = parseInt(0)-(parseInt(elements.length)*100-parseInt(100))
//            }else{
//                var transValue = 0;
//            }
//
//             if(moveX>0){
////                    alert('you'+transValue);
//                if(transValue == 0){
//                    transValue = parseInt(transValue)-parseInt(100);
//                }
//                setValue = parseInt(transValue)+parseInt(100);
//                for (var i = 0; i < elements.length; i++) {
////                        alert("x y");
//                    elements[i].style.transform='translateX('+setValue+'%)';
//                    elements[i].style.transition='transform 0.5s';
//                }
//            }else if(moveX<0){
////                    alert('zuo'+transValue);
////                    alert('zuoM'+maxTransValue);
//                if (transValue == maxTransValue){
//                    transValue = parseInt(transValue)+parseInt(100);
//                }
//                if(transValue == 0){
//                    setValue = parseInt(transValue)-parseInt(100);
//                }
//
//                setValue = parseInt(transValue)-parseInt(100);
//                for (var i = 0; i < elements.length; i++) {
//                    elements[i].style.transform='translateX('+setValue+'%)';
//                    elements[i].style.transition='transform 0.5s';
//                }
//
//            }
//
//        }else {
//            var ele = moveY > 0 ? "向下" : "向上";
//            //alert(ele);
//        }
//    }
//});

document.addEventListener("touchstart", function (e) {
    firstX = e.targetTouches[0].clientX;
    firstY = e.targetTouches[0].clientY;
});
document.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    moveX = endX - firstX;//判断左右
    moveY = endY - firstY;//判断上下
    if (Math.abs(moveX) > 60 || Math.abs(moveY) > 60) {//判断是滑动，不是点击

        if (Math.abs(moveX) > Math.abs(moveY)){
            /*判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下*/

            var elements = document.getElementsByClassName("panel");
            if (elements[0].style.transform && elements[0].style.transform != 0){
                var transValue = elements[0].style.transform.substring(elements[0].style.transform.indexOf('(')+1,elements[0].style.transform.indexOf(')')-1);
                var maxTransValue = parseInt(0)-(parseInt(elements.length)*100-parseInt(100))
            }else{
                var transValue = 0;
            }

             if(moveX>0){
//                    alert('you'+transValue);
                if(transValue == 0){
                    transValue = parseInt(transValue)-parseInt(100);
                }
                setValue = parseInt(transValue)+parseInt(100);
                for (var i = 0; i < elements.length; i++) {
//                        alert("x y");
                    elements[i].style.transform='translateX('+setValue+'%)';
                    elements[i].style.transition='transform 0.5s';
                }
            }else if(moveX<0){
//                    alert('zuo'+transValue);
//                    alert('zuoM'+maxTransValue);
                if (transValue == maxTransValue){
                    transValue = parseInt(transValue)+parseInt(100);
                }
                if(transValue == 0){
                    setValue = parseInt(transValue)-parseInt(100);
                }

                setValue = parseInt(transValue)-parseInt(100);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.transform='translateX('+setValue+'%)';
                    elements[i].style.transition='transform 0.5s';
                }

            }

        }else {
            var ele = moveY > 0 ? "向下" : "向上";
            updateTimeTextColort();
            //alert(ele);
        }
    }
});

function updateTime() {
    days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var now = new Date(); // 创建Date对象表示当前时间
    var hours = now.getHours(); // 小时数（0~23）
    if (hours < 10) {
        hours = "0" + hours; // 补零
    }
    var minutes = now.getMinutes(); // 分钟数（0~59）
    if (minutes < 10) {
        minutes = "0" + minutes; // 补零
    }
    var seconds = now.getSeconds(); // 秒数（0~59）
    if (seconds < 10) {
        seconds = "0" + seconds; // 补零
    }
    //document.getElementById("datetime").innerHTML = hours + ":" + minutes + ":" + seconds; // 将时间显示在id为"time"的元素内部
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("date").innerHTML = now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日，"+days[now.getDay()];
    setTimeout(updateTime, 1000); // 每隔1秒调用一次函数自身，实现定时更新
}
function updateTimeTextColort(){
    document.getElementById("hours").style.color ='rgb(' + Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
    document.getElementById("minutes").style.color ='rgb(' + Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
    document.getElementById("seconds").style.color ='rgb(' + Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
    document.getElementById("date").style.color ='rgb(' + Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
}



window.onload = updateTime;
