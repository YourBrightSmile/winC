
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


window.onload = updateTime;
