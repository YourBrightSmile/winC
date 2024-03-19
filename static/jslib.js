function initFunc(){
    updateTime();
    addEvent();
//    getInitInfo()
};

function addEvent(){
    //control pannel
    document.querySelector("#volume_control > div.c_input > input").addEventListener('input',function(){
        params = {  'setType':'setMonitorBrightness',
                        'setParams':{'display':'Lenovo 40A0','brightness':this.value}
                      };
        setWin(JSON.stringify(params));
    });


    document.querySelector("#volume_control > div.c_input > img");
    document.querySelector("#volume_control > div.c_button > button:nth-child(1)");
    document.querySelector("#volume_control > div.c_button > button:nth-child(2)");
}


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
function getDataF(){
    var now = new Date();
    fnTmp = (d) => ('0'+d).substr(-2)
    nowDate = now.getFullYear()+'/'+fnTmp(now.getMonth()+1)+'/'+fnTmp(now.getDate())
}
function updateWeatherValue(resp){
    var now = new Date();
    hour = now.getHours();
    var urlIcon = "https://weather.cma.cn/static/img/w/icon/w"
    document.querySelector("#daysCurr_img > img").src=urlIcon+resp['getWeather']['data']['daily'][0]['dayCode']+'.png';
    document.querySelector("#currTemperature").innerHTML=resp['getWeather']['data']['now']['temperature'];
    document.querySelector("#precipitation").innerHTML='降水<br><br>'+resp['getWeather']['data']['now']['precipitation']+'mm';
    document.querySelector("#wind").innerHTML=resp['getWeather']['data']['now']['windDirection']+'<br><br>'+resp['getWeather']['data']['now']['windScale'];
    for (var i=0;i<7;i++){
        document.querySelector("#days0"+i+"_range").innerHTML=resp['getWeather']['data']['daily'][i]['high']+'℃/'+resp['getWeather']['data']['daily'][i]['low']+'℃'
        ;
        if (hour<18){
            document.querySelector("#days0"+i+"_img > img").src=urlIcon+resp['getWeather']['data']['daily'][i]['dayCode']+'.png';
            document.querySelector("#days0"+i+"_desc").innerHTML=resp['getWeather']['data']['daily'][i]['dayText'];
            document.querySelector("#days0"+i+"_date").innerHTML=resp['getWeather']['data']['daily'][i]['date'].substr(5);
        }else{
            document.querySelector("#days0"+i+"_img > img").src=urlIcon+resp['getWeather']['data']['daily'][i]['nightCode']+'.png';
            document.querySelector("#days0"+i+"_desc").innerHTML=resp['getWeather']['data']['daily'][i]['nightText'];
            document.querySelector("#days0"+i+"_date").innerHTML=resp['getWeather']['data']['daily'][i]['date'].substr(5);
        };


    };
}
function updateControlPanel(resp){

    document.querySelector("#volume_control > div.c_input > input").value = resp['speaker']['volume'];
    document.querySelector("#mic_control > div.c_input > input").value = resp['microphone']['volume'];

    vDevices = resp['audioInfo'];
    for (let dev in vDevices){
        vSelect = document.querySelector("#volume_control > div.c_select > select");
        mSelect = document.querySelector("#mic_control > div.c_select > select");

        if (vDevices[dev]['class'] == 'in'){
            var opt = document.createElement("option");
            opt.text = dev;
            opt.value = vDevices[dev]['id'];
            if (vDevices[dev]['default'] == 1){
                opt.selected="selected";
            };
            mSelect.appendChild(opt);
        }else if (vDevices[dev]['class'] == 'out'){
            var opt = document.createElement("option");
            opt.text = dev;
            opt.value = vDevices[dev]['id']
            if (vDevices[dev]['default'] == 1){
                opt.selected="selected";
            };
            vSelect.appendChild(opt);
        }

    };
    mons = resp['monitorInfo'];
    for (let mon in mons){
        bSelect = document.querySelector("#brightness_control > div.c_select > select")
        bSelect.value = resp['monitorInfo'];
        var opt = document.createElement("option");
        opt.text = mon;
        opt.value = mons[mon];
        console.log(opt.value)
        bSelect.appendChild(opt);
    };
    document.querySelector("#brightness_control > div.c_input > input").value = document.querySelector("#brightness_control > div.c_select > select > option:nth-child(1)").value;
    document.querySelector("#brightness_control > div.c_select > select > option:nth-child(1)").selected="selected";
}

//获取所有信息
function getInitInfo(){
    var resp;
//    var params = {'getTypes':['getWeather','getMonitorsAndBrightness','getAudioInfo']}
    var params = {'getTypes':['getControlInfo']}
    //ajax
    $.ajax({
        url: "/getInfo",
        data: JSON.stringify(params),
        type: "post",
        dataType: "json",
        success: function(res) {
//                updateWeatherValue(res['getWeather']);
                updateControlPanel(res['getControlInfo']);
                console.log("getInitInfo end")
        }
    });
}

//testparams = {'getTypes':['getWeather']};getInitInfo(JSON.stringify(testparams))
//testparams = {'getTypes':['getMonitorsAndBrightness']};getInfo(JSON.stringify(testparams))
//testparams = {'getTypes':['getAudioInfo']};getInfo(JSON.stringify(testparams))
function getInfo(params){
    var resp;
    //ajax
    $.ajax({
        url: "/getInfo",
        data: params,
        type: "post",
        dataType: "json",
        success: function(res) {
//                updateWeatherValue(res);
//                updateControlPanel(res);
                console.log(res);
                console.log(res['getAudioInfo']['microphone']['volume']);

        }
    });
}

//param: mute/nomute/1-100
//testparams = {'setType':'winVolumeAdjust','setParams':{'param':'mute'}};setWin(JSON.stringify(testparams))
//testparams = {'setType':'winMicrophoneAdjust','setParams':{'param':'mute'}};setWin(JSON.stringify(testparams))
//param:displayname,brightness:1-100
//testparams = {'setType':'setMonitorBrightness','setParams':{'display':'Lenovo 40A0','brightness':'50'}};setWin(JSON.stringify(testparams))
function setWin(params){
    var resp;
    //ajax

    $.ajax({
        url: "/setWin",
        data: params,
        type: "post",
        dataType: "json",
        success: function(res) {
//                updateWeatherValue(res);
//                updateControlPanel(res);
                console.log(res)

        }
    });
}


