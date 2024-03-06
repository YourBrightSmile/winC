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

function updateWeatherValue(resp){
    document.querySelector("#daysCurr_img > img");
    document.querySelector("#currTemperature").innerHTML=resp['data']['now']['temperature'];
    document.querySelector("#precipitation");
    document.querySelector("#wind");
    for (var i=0;i<7;i++){
        document.querySelector("#days0"+i+"_range");
        document.querySelector("#days0"+i+"_img > img");
        document.querySelector("#days0"+i+"_desc");
        document.querySelector("#days0"+i+"_date");
    };
}
function updateControlPanel(resp){
    document.querySelector("#brightness_control > div.c_input > input").value =  resp['getMonitorsAndBrightness']['None Generic Monitor'];
    document.querySelector("#volume_control > div.c_input > input");
    document.querySelector("#volume_control > div.c_select > select");
    document.querySelector("#mic_control > div.c_input > input");
    document.querySelector("#mic_control > div.c_select > select");
    document.querySelector("#brightness_control > div.c_input > input");
    document.querySelector("#brightness_control > div.c_select > select");

}

//获取所有信息
function getInitInfo(params){
    var resp;
    //ajax
    $.ajax({
        url: "/getInfo",
        data: params,
        type: "post",
        dataType: "json",
        success: function(res) {
                for (let key in res){
                    console.log(res[key])
                    for (let key1 in res[key]){
                        console.log(res[key][key1])
                    }
                }
                console.log(res['getMonitorsAndBrightness']['None Generic Monitor'])
//                updateWeatherValue(resp)
//                updateControlPanel(resp);

        }
    });
}
//testparams = {'infoTypes':['getWeather']};getInitInfo(JSON.stringify(testparams))
//testparams = {'infoTypes':['getMonitorsAndBrightness']};getInitInfo(JSON.stringify(testparams))
function adjustWinSetup(set){

}


