
//监听页面是否长时间未操作
var oldTime = new Date().getTime();
var oldTimeC = new Date().getTime();
var newTime = new Date().getTime();
var outTime = 5 * 60 * 1000; //screen timeout 5min
var outTimeC = 10 * 1000; //control panel timeout 10s
var checkFlag = 1;
document.addEventListener("touchstart", function (e) {
     oldTime = new Date().getTime();
     oldTimeC = new Date().getTime();
});
function OutTime(){
    console.log("out time check")
    timers=window.timersG
    outTimer=window.outTimer
    newTime = new Date().getTime();
    //检查服务器是否断连
    if (checkFlag==1){
        //服务器断连时关闭定时器
        setTimeout(function(){
            $.ajax({
                url: "/test",
                data: null,
                type: "get",
                dataType: "text",
                //async:false,
                error: function(res) {
		     
                     //clearInterval(outTimer);
                     checkFlag=0;
                     console.log("断连清除所有定时器并且不再检查...");
                }
            });
        },0);
    }

    //检查页面是否长时间未操作
    if(newTime - oldTime > outTime){
        oldTime = new Date().getTime();
        //设置闲时显示
        document.querySelector("body > div > div.wallpaper").style.zIndex = 10;
        //关闭状态数据更新及服务器断连检查
//        for(var i=0;i<timers.length;i++){
//            clearInterval(timers[i])
//            console.log("qingchudingshiqi1")
//        }
        checkFlag = 0;
        //关闭页面超时检查
        clearInterval(outTimer);
    };

    //检查control panel是否长时间未操作
    if(newTime - oldTimeC > outTimeC){
        oldTimeC = new Date().getTime();
        document.querySelector("#page02 > div.ctrLock").style.zIndex = 10;
    }
}

//页面滑动
var firstX = 0, firstY = 0, endX = 0, endY = 0;//初始化坐标值
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

function initFunc(){
    setMainPage(1);
    updateTime();
    addEvent();
    getInitInfo();
    initUpdateStats();
    window.outTimer = window.setInterval(OutTime, 5000);

    //window.timersG=0;
    //    window.timersG = initUpdateStats();
};
var timersG;
var outTimer;


window.onload = initFunc;




