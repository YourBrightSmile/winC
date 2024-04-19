

function addEvent(){
    //control pannel

    //param: mute/nomute/1-100
    //testparams = {'setType':'winVolumeAdjust','setParams':{'param':'mute'}};setWin(JSON.stringify(testparams))
    //testparams = {'setType':'winMicrophoneAdjust','setParams':{'param':'mute'}};setWin(JSON.stringify(testparams))
    //volume_control
    document.querySelector("#volume_control > div.c_input > input").addEventListener('input',function(){
        params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': this.value}
                      };
        setWin(JSON.stringify(params));
        imgValue = Number(document.querySelector("#volume_control > div.c_input > img").value)
        if (this.value > 0 & imgValue == 1){
            params1 = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': 'nomute'}
                      };
            setWin(JSON.stringify(params1));
            document.querySelector("#volume_control > div.c_input > img").value = 0;
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
        };
    });
    document.querySelector("#volume_control > div.c_input > img").addEventListener('click',function(){
//      var audioId = document.querySelector("#volume_control > div.c_select > select").selectedOptions[0].value;
        imgValue = Number(document.querySelector("#volume_control > div.c_input > img").value)
        if(imgValue == 0){
            value = 'mute';
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume-mute.svg";
            document.querySelector("#volume_control > div.c_input > img").value = 1;
        }else if ( imgValue == 1){
            value = 'nomute';
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
            document.querySelector("#volume_control > div.c_input > img").value = 0;
        };
        params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': value}
                      };
        setWin(JSON.stringify(params));
    });
    document.querySelector("#volume_control > div.c_button > button:nth-child(1)").addEventListener('click',function(){
        imgValue = Number(document.querySelector("#volume_control > div.c_input > img").value)
        volValue = Number(document.querySelector("#volume_control > div.c_input > input").value) - 2
        if (imgValue == 1){
            value = 'nomute';
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
            document.querySelector("#volume_control > div.c_input > img").value = 0;
            params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': value}
                      };
            setWin(JSON.stringify(params));
        };
        if (volValue < 0){ volValue=0; };
        params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': volValue}
                      };
        setWin(JSON.stringify(params));
        document.querySelector("#volume_control > div.c_input > input").value = volValue;
    });
    document.querySelector("#volume_control > div.c_button > button:nth-child(2)").addEventListener('click',function(){
        imgValue = Number(document.querySelector("#volume_control > div.c_input > img").value)
        volValue = Number(document.querySelector("#volume_control > div.c_input > input").value) + 2
        if (imgValue == 1){
            value = 'nomute';
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
            document.querySelector("#volume_control > div.c_input > img").value = 0;
            params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': value}
                      };
            setWin(JSON.stringify(params));
        };
        if (volValue > 100){ volValue = 100; };
        params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': volValue}
                      };
        setWin(JSON.stringify(params));
        document.querySelector("#volume_control > div.c_input > input").value = volValue;
    });
    document.querySelector("#volume_control > div.c_select > select").addEventListener('change',function(){
        did = document.querySelector("#volume_control > div.c_select > select").value;
        params = {
            'setType':'switchIODevice',
            'setParams':{'deviceId': did,'role':'0'}
        };
        params1 = {
            'getTypes':['getAudioOutVolumeInfo']
        };
        //getInfo(JSON.stringify(params1))
        setWin(JSON.stringify(params));
        vol = getInfo(JSON.stringify(params1));
        volValue = vol['getAudioOutVolumeInfo']['speaker']['volume']
        volMute = vol['getAudioOutVolumeInfo']['speaker']['isMute']
        document.querySelector("#volume_control > div.c_input > input").value = volValue;
        document.querySelector("#volume_control > div.c_input > img").value = Number(volMute);
        if (Number(volMute) == 0){
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
        }else{
            document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume-mute.svg";
        };
    });

    //mic_control
    document.querySelector("#mic_control > div.c_input > input").addEventListener('input',function(){
        params = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': this.value}
                      };
        setWin(JSON.stringify(params));
        imgValue = Number(document.querySelector("#mic_control > div.c_input > img").value)
        if (this.value > 0 & imgValue == 1){
            params1 = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': 'nomute'}
                      };
            setWin(JSON.stringify(params1));
            document.querySelector("#mic_control > div.c_input > img").value = 0;
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";
        };
    });
    document.querySelector("#mic_control > div.c_input > img").addEventListener('click',function(){
        imgValue = Number(document.querySelector("#mic_control > div.c_input > img").value)
        if(imgValue == 0){
            value = 'mute';
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone-slash.svg";
            document.querySelector("#mic_control > div.c_input > img").value = 1;
        }else if ( imgValue == 1){
            value = 'nomute';
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";
            document.querySelector("#mic_control > div.c_input > img").value = 0;
        };
        params = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': value}
                      };
        setWin(JSON.stringify(params));
    });
    document.querySelector("#mic_control > div.c_button > button:nth-child(1)").addEventListener('click',function(){
        imgValue = Number(document.querySelector("#mic_control > div.c_input > img").value)
        volValue = Number(document.querySelector("#mic_control > div.c_input > input").value) - 2
        if (imgValue == 1){
            value = 'nomute';
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";
            document.querySelector("#mic_control > div.c_input > img").value = 0;
            params = {  'setType':'winVolumeAdjust',
                        'setParams':{'param': value}
                      };
            setWin(JSON.stringify(params));
        };
        if (volValue < 0){ volValue=0; };
        params = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': volValue}
                      };
        setWin(JSON.stringify(params));
        document.querySelector("#mic_control > div.c_input > input").value = volValue;
    });
    document.querySelector("#mic_control > div.c_button > button:nth-child(2)").addEventListener('click',function(){
        imgValue = Number(document.querySelector("#mic_control > div.c_input > img").value)
        volValue = Number(document.querySelector("#mic_control > div.c_input > input").value) + 2
        if (imgValue == 1){
            value = 'nomute';
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";
            document.querySelector("#mic_control > div.c_input > img").value = 0;
            params = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': value}
                      };
            setWin(JSON.stringify(params));
        };
        if (volValue > 100){ volValue = 100; };
        params = {  'setType':'winMicrophoneAdjust',
                        'setParams':{'param': volValue}
                      };
        setWin(JSON.stringify(params));
        document.querySelector("#mic_control > div.c_input > input").value = volValue;
    });
    document.querySelector("#mic_control > div.c_select > select").addEventListener('change',function(){
        did = document.querySelector("#mic_control > div.c_select > select").value;
        params = {
            'setType':'switchIODevice',
            'setParams':{'deviceId': did,'role':'1'}
        };
        params1 = {
            'getTypes':['getAudioInVolumeInfo']
        };
//        getInfo(JSON.stringify(params1))
        setWin(JSON.stringify(params));
        vol = getInfo(JSON.stringify(params1));
        volValue = vol['getAudioInVolumeInfo']['microphone']['volume'];
        volMute = vol['getAudioInVolumeInfo']['microphone']['isMute'];
        document.querySelector("#mic_control > div.c_input > input").value = volValue;
        document.querySelector("#mic_control > div.c_input > img").value = Number(volMute);
        if (Number(volMute) == 0){
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";
        }else{
            document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone-slash.svg";
        };
    });

    //brightness_control
    document.querySelector("#brightness_control > div.c_input > input").addEventListener('input',function(){
        displayName = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].text;
        params = {  'setType':'setMonitorBrightness',
                        'setParams':{'display': displayName,'brightness':this.value}
                      };

        setWin(JSON.stringify(params));
        document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value=this.value;
        if (this.value == 0){
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness-low.svg";
        }else{
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness.svg";
        };
    });
    document.querySelector("#brightness_control > div.c_input > img").addEventListener('click',function(){
        var displayName = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].text;
        var value = document.querySelector("#brightness_control > div.c_input > input").value;
        if(value > 0){
            value = 0;
        }else{
            value = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value;
        };
        params = {  'setType':'setMonitorBrightness',
                        'setParams':{'display': displayName,'brightness':value}
                      };
        setWin(JSON.stringify(params));
        if (value == 0){
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness-low.svg";
            document.querySelector("#brightness_control > div.c_input > input").value = 0;
        }else{
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness.svg";
            document.querySelector("#brightness_control > div.c_input > input").value = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value;
        };
    });
    document.querySelector("#brightness_control > div.c_button > button:nth-child(1)").addEventListener('click',function(){
        var displayName = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].text;
        var value = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value;
        params = {  'setType':'setMonitorBrightness',
                        'setParams':{'display': displayName,'brightness':value-2}
                      };

        setWin(JSON.stringify(params));
        if (value == 0){
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness-low.svg";
        }else{
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness.svg";
        };

        if(value <= 0){
            document.querySelector("#brightness_control > div.c_input > input").value = 0;
            document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value = 0;
        }else{
            document.querySelector("#brightness_control > div.c_input > input").value = value-2;
            document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value = value-2;
        }

    });
    document.querySelector("#brightness_control > div.c_button > button:nth-child(2)").addEventListener('click',function(){
        var displayName = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].text;
        var value = Number(document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value);
        params = {  'setType':'setMonitorBrightness',
                        'setParams':{'display': displayName,'brightness':value+2}
                      };
        setWin(JSON.stringify(params));
        if (value == 0){
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness-low.svg";
        }else{
            document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness.svg";
        };
        if(value >= 100){
            document.querySelector("#brightness_control > div.c_input > input").value = 100;
            document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value = 100;
        }else{
            document.querySelector("#brightness_control > div.c_input > input").value = value+2;
            document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value = value+2;
        }
    });
    document.querySelector("#brightness_control > div.c_select > select").addEventListener('change',function(){
        document.querySelector("#brightness_control > div.c_input > input").value = document.querySelector("#brightness_control > div.c_select > select").selectedOptions[0].value;
    });

    //app start
    apps = document.querySelectorAll("#appContainer > div");
    var pname=null;
    for (i = 0; i < apps.length; ++i) {
        apps[i].addEventListener('click',function(){
            startProgram(this.id)
        });
    };
    //从屏保页面返回
    document.querySelector("body > div > div.wallpaper").addEventListener('touchstart',function(){
        document.querySelector("body > div > div.wallpaper").style.zIndex = -1;
//        window.timersG = initUpdateStats();//继续实时更新数据
        //继续状态更新和页面超时检查
        checkFlag=1;
        initUpdateStats();//继续实时更新数据
        window.outTimer = window.setInterval(OutTime, 5000);
    });
    //Tap
    document.querySelector("#page02 > div.ctrLock").addEventListener('click',function(){
        document.querySelector("#page02 > div.ctrLock").style.zIndex = -1;

    });
    //F5
//    document.querySelector("#F5").addEventListener('click',function(){
//        //开启屏幕超时和状态信息更新
//        console.log("开启屏幕超时和状态信息更新...")
////        window.timersG = initUpdateStats();
//        checkFlag=1;
//        initUpdateStats();
//        window.outTimer = window.setInterval(OutTime, 5000);
//    });
    document.querySelector("#qqMusic").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
    });

    document.querySelector("#qqMusic img").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
        musicP = {
            'getTypes':['getMusicInfo']
         };
        $.when(getInfoS(JSON.stringify(musicP))).done(function(res){
            resp = JSON.parse(res)
            document.querySelector("#songName").innerText= resp['getMusicInfo']['songName'];
            document.querySelector("#qqMusic > img").src = resp['getMusicInfo']['songImgUrl'];
            qqMusicDiv = document.querySelector("#qqMusic");
            qqMusicImg = document.querySelector("#qqMusic img");
            songCtrContainer = document.querySelector("#songCtrContainer");
            qqMusic.style.width="400px";
            qqMusic.style.height="100px";
            qqMusic.style.marginLeft="50%";
            qqMusic.style.background="lightgray";
            qqMusicImg.style.marginTop ="5%";
            qqMusicImg.style.marginLeft ="4%";
            songCtrContainer.style.display = "inline";
        }).fail(function(res){});
    });

    document.querySelector("#songCtrPre").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
        params = {  'setType':'ctrlMusicShortcuts',
                        'setParams':{'app': 'QQMusic','key':'previous'}
                      };
        setWin(JSON.stringify(params));
        musicP = {
            'getTypes':['getMusicInfo']
         };
        $.when(getInfoS(JSON.stringify(musicP))).done(function(res){
            resp = JSON.parse(res)
            document.querySelector("#songName").innerText= resp['getMusicInfo']['songName'];
            document.querySelector("#qqMusic > img").src = resp['getMusicInfo']['songImgUrl'];
        }).fail(function(res){});
    });
    document.querySelector("#songCtrPlay").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
        params = {  'setType':'ctrlMusicShortcuts',
                        'setParams':{'app': 'QQMusic','key':'play'}
                      };
        setWin(JSON.stringify(params));
        musicP = {
            'getTypes':['getMusicInfo']
         };
        $.when(getInfoS(JSON.stringify(musicP))).done(function(res){
            resp = JSON.parse(res)
            document.querySelector("#songName").innerText= resp['getMusicInfo']['songName'];
            document.querySelector("#qqMusic > img").src = resp['getMusicInfo']['songImgUrl'];
        }).fail(function(res){});
    });
    document.querySelector("#songCtrNext").addEventListener('click',function(e){
        e.stopPropagation();
       oldTimeQ = new Date().getTime();
        params = {  'setType':'ctrlMusicShortcuts',
                        'setParams':{'app': 'QQMusic','key':'next'}
                      };
        setWin(JSON.stringify(params));
        musicP = {
            'getTypes':['getMusicInfo']
         };
        $.when(getInfoS(JSON.stringify(musicP))).done(function(res){
            resp = JSON.parse(res)
            document.querySelector("#songName").innerText= resp['getMusicInfo']['songName'];
            document.querySelector("#qqMusic > img").src = resp['getMusicInfo']['songImgUrl'];
        }).fail(function(res){});
    });
    document.querySelector("#songCtrVoldown").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
        params = {  'setType':'ctrlMusicShortcuts',
                        'setParams':{'app': 'QQMusic','key':'voldown'}
                      };
        setWin(JSON.stringify(params));
    });
    document.querySelector("#songCtrVolup").addEventListener('click',function(e){
        e.stopPropagation();
        oldTimeQ = new Date().getTime();
        params = {  'setType':'ctrlMusicShortcuts',
                        'setParams':{'app': 'QQMusic','key':'volup'}
                      };
        setWin(JSON.stringify(params));
    });

     document.querySelector(".foot").addEventListener('click',function(){
        songCtrContainer = document.querySelector("#songCtrContainer");
        if (songCtrContainer.style.display=="inline"){
            qqMusicDiv = document.querySelector("#qqMusic");
            qqMusicImg = document.querySelector("#qqMusic img");
            qqMusic.style.width="60px";
            qqMusic.style.height="20%";
            qqMusic.style.marginLeft="90%";
            qqMusic.style.background="";
            qqMusicImg.style.marginTop ="0";
            qqMusicImg.style.marginLeft ="0";
            songCtrContainer.style.display = "none";
            document.querySelector("#qqMusic > img").src = "../static/icon/app/qqmusic.png";
        };
    });
}

var ifP = {
        'getTypes':['getIfStats']
    };
var cpuP = {
        'getTypes':['getCpuStats']
    };
var gpuP = {
        'getTypes':['getGpuStats']
    };
var memP = {
        'getTypes':['getMemStats']
    };
var diskP = {
        'getTypes':['getDiskStats']
};

function initUpdateStats(){
    ifUpdatefun();
    cpuUpdatefun();
    gpuUpdatefun();
    memUpdatefun();
    diskUpdatefun();
    //检查qqmusic是否启动
    musicP = {
            'getTypes':['getMusicInfo']
         };
    $.when(getInfoS(JSON.stringify(musicP))).done(function(res){
            resp = JSON.parse(res)
            if ( !!resp['getMusicInfo'] ){
                document.querySelector("#qqMusic").style.zIndex = "9";
            }
    }).fail(function(res){});
}


let ifTimer = null
let cpuTimer = null
let gpuTimer = null
let memTimer = null
let diskTimer = null
function ifUpdatefun(){
    if(checkFlag==0){
        clearTimeout(ifTimer);
    }else{
        clearTimeout(ifTimer);
        $.when(getInfoS(JSON.stringify(ifP))).done(function(res){
            updateStats(JSON.stringify(ifP),res);
            ifTimer = setTimeout(ifUpdatefun,30*1000);

        }).fail(function(res){});

    }
}
function cpuUpdatefun(){
    if(checkFlag==0){
        clearTimeout(cpuTimer)
    }else{
        clearTimeout(cpuTimer)
        $.when(getInfoS(JSON.stringify(cpuP))).done(function(res){
            updateStats(JSON.stringify(cpuP),res);
            cpuTimer = setTimeout(cpuUpdatefun,1000);
        }).fail(function(res){});
    }
}
function gpuUpdatefun(){
    if(checkFlag==0){
        clearTimeout(gpuTimer)
    }else{
        clearTimeout(gpuTimer)
        $.when(getInfoS(JSON.stringify(gpuP))).done(function(res){
            updateStats(JSON.stringify(gpuP),res);
            gpuTimer = setTimeout(gpuUpdatefun,1000);
        }).fail(function(res){});
    }
}
function memUpdatefun(){
    if(checkFlag==0){
        clearTimeout(memTimer)
    }else{
        clearTimeout(memTimer)
        $.when(getInfoS(JSON.stringify(memP))).done(function(res){
            updateStats(JSON.stringify(memP),res);
            memTimer = setTimeout(memUpdatefun,3*1000);
        }).fail(function(res){});
    }
}
function diskUpdatefun(){
    if(checkFlag==0){
        clearTimeout(diskTimer)
    }else{
        clearTimeout(diskTimer)
        $.when(getInfoS(JSON.stringify(diskP))).done(function(res){
            updateStats(JSON.stringify(diskP),res);
            diskTimer = setTimeout(diskUpdatefun,30*60*1000);
        }).fail(function(res){});
    }
}

function updateStats(params,res){
    types = JSON.parse(params).getTypes;
    for (i=0;i<types.length;i++){
        switch(types[i]){
            case 'getIfStats':
        	    document.querySelector("#NET > pre").innerText = JSON.parse(res)['getIfStats'];
                break
            case 'getCpuStats':
                text = JSON.parse(res)['getCpuStats']
                document.querySelector("#CPU > pre").innerText = text;
                percent = text.match("[0-9].*%")[0]
                document.querySelector("#CPU").style.background = "linear-gradient(to top,lightgreen "+percent+", transparent 0%)";
                break
            case 'getGpuStats':
                text = JSON.parse(res)['getGpuStats'];
                document.querySelector("#GPU > pre").innerText = text;
                percent = text.match("GPU      [0-9].*%")[0].replace(/\s/g, "").split("GPU")[1]
//                percent = "20%";
                document.querySelector("#GPU").style.background = "linear-gradient(to top,lightgreen "+percent+", transparent 0%)";

                break
            case 'getMemStats':
                text = JSON.parse(res)['getMemStats'];
                document.querySelector("#MEM > pre").innerText = text;
                percent = text.match("[0-9].*%")[0];
                document.querySelector("#MEM").style.background = "linear-gradient(to top,lightgreen "+percent+", transparent 0%)";
                break
            case 'getDiskStats':
                document.querySelector("#DISK > pre").innerText = JSON.parse(res)['getDiskStats'];
                break
            default:
                console.log('updateStats no action')
        }
    }
};

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

    document.getElementById("whours").innerHTML = hours+":";
    document.getElementById("wminutes").innerHTML = minutes+":";
    document.getElementById("wseconds").innerHTML = seconds;
    document.getElementById("wdate").innerHTML = now.getFullYear()+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日，"+days[now.getDay()];

    setTimeout(updateTime, 1000); // 每隔1秒调用一次函数自身，实现定时更新
}
function updateTimeTextColort(){
    len = colors.length
    document.getElementById("hours").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("minutes").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("seconds").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("date").style.color ='#' + colors[Math.floor(Math.random()*len)];document.getElementById("hours").style.color ='#' + colors[Math.floor(Math.random()*len)];

    document.getElementById("whours").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("wminutes").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("wseconds").style.color ='#' + colors[Math.floor(Math.random()*len)];
    document.getElementById("wdate").style.color ='#' + colors[Math.floor(Math.random()*len)];
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
    document.querySelector("#daysCurr_img > img").src=urlIcon+resp['data']['daily'][0]['dayCode']+'.png';
    document.querySelector("#currTemperature").innerHTML=resp['data']['now']['temperature'];
    document.querySelector("#precipitation").innerHTML='降水<br><br>'+resp['data']['now']['precipitation']+'mm';
    document.querySelector("#wind").innerHTML=resp['data']['now']['windDirection']+'<br><br>'+resp['data']['now']['windScale'];
    for (var i=0;i<7;i++){
        document.querySelector("#days0"+i+"_range").innerHTML=resp['data']['daily'][i]['high']+'℃/'+resp['data']['daily'][i]['low']+'℃'
        ;
        if (hour<18){
            document.querySelector("#days0"+i+"_img > img").src=urlIcon+resp['data']['daily'][i]['dayCode']+'.png';
            document.querySelector("#days0"+i+"_desc").innerHTML=resp['data']['daily'][i]['dayText'];
            document.querySelector("#days0"+i+"_date").innerHTML=resp['data']['daily'][i]['date'].substr(5);
        }else{
            document.querySelector("#days0"+i+"_img > img").src=urlIcon+resp['data']['daily'][i]['nightCode']+'.png';
            document.querySelector("#days0"+i+"_desc").innerHTML=resp['data']['daily'][i]['nightText'];
            document.querySelector("#days0"+i+"_date").innerHTML=resp['data']['daily'][i]['date'].substr(5);
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
        bSelect.appendChild(opt);
    };
    document.querySelector("#brightness_control > div.c_input > input").value = document.querySelector("#brightness_control > div.c_select > select > option:nth-child(1)").value;
    if(document.querySelector("#brightness_control > div.c_input > input").value >0 ){
        document.querySelector("#brightness_control > div.c_input > img").src = "../static/icon/brightness.svg";
    };

    document.querySelector("#mic_control > div.c_input > img").value = resp['microphone']['isMute'];
    if(resp['microphone']['isMute'] == 0 ){
        document.querySelector("#mic_control > div.c_input > img").src = "../static/icon/microphone.svg";

    };

    document.querySelector("#volume_control > div.c_input > img").value = resp['speaker']['isMute'];
    if(resp['speaker']['isMute'] == 0 ){
        document.querySelector("#volume_control > div.c_input > img").src = "../static/icon/volume.svg";
    };

    document.querySelector("#brightness_control > div.c_select > select > option:nth-child(1)").selected="selected";
}

//获取所有信息
function getInitInfo(){
    var resp;
    var params = {'getTypes':['getWeather','getControlInfo']}
//    var params = {'getTypes':['getControlInfo']}
    //ajax
    $.ajax({
        url: "/getInfo",
        data: JSON.stringify(params),
        type: "post",
        dataType: "json",
        success: function(res) {
                updateWeatherValue(res['getWeather']);
                updateControlPanel(res['getControlInfo']);
                console.log("getInitInfo end")
        }
    });
}

//testparams = {'getTypes':['getWeather']};getInitInfo(JSON.stringify(testparams))
//testparams = {'getTypes':['getMonitorsAndBrightness']};getInfo(JSON.stringify(testparams))
//testparams = {'getTypes':['getAudioInfo']};getInfo(JSON.stringify(testparams))
function getInfo(params){
//    var defer = $.Deferred();
    var resp;
    //ajax
    $.ajax({
        url: "/getInfo",
        data: params,
        type: "post",
        dataType: "json",
        async:false,
        success: function(res) {
                resp =  res;
//                defer.resolve(res);
        }
    });
    return resp
//    return defer.promise();
}
//$.when(getInfo()).done(function(res){}).fail(function(res){});

function getInfoS(params){
//    window.paramsG=params;
    var defer = $.Deferred();
    //ajax
    $.ajax({
        url: "/getInfoS",
        data: params,
        type: "post",
        dataType: "text",
        //async:false,
        success: function(res) {

                defer.resolve(res);
        }
    });
    return defer.promise();
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
        async:false,
        success: function(res) {
                console.log(res)
        }
    });
}

function startProgram(appname){
    var resp;
    //ajax

    $.ajax({
        url: "/startProgram",
        data: appname,
        type: "post",
        dataType: "json",
        async:false,
        success: function(res) {
                console.log(res)

        }
    });
}

//setMainPage,page strart from index 0
function setMainPage(page){
    var elements = document.getElementsByClassName("panel");
    setValue = parseInt(page)*parseInt(100);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.transform='translateX(-'+setValue+'%)';
        //elements[i].style.transition='transform 0.5s';
    }
}



//var ws = new WebSocket("ws://localhost:19433/status");//ws open
//
//ws.onopen = function() {
//   ws.send("Hello, world");
//};
//ws.onmessage = function (evt) {
//   alert(evt.data);
//};

colors = [
    "5c2223",
    "eea2a4",
    "5a191b",
    "f07c82",
    "5a1216",
    "ed5a65",
    "c04851",
    "ee3f4d",
    "c02c38",
    "a7535a",
    "e3b4b8",
    "f0a1a8",
    "f1939c",
    "a61b29",
    "894e54",
    "c45a65",
    "d11a2d",
    "c21f30",
    "de1c31",
    "7c1823",
    "541e24",
    "4c1f24",
    "82202b",
    "82111f",
    "ef475d",
    "4d1018",
    "ed556a",
    "7a7374",
    "f03752",
    "e6d2d5",
    "f0c9cf",
    "ee2746",
    "2b1216",
    "ee4863",
    "e77c8e",
    "500a16",
    "c27c88",
    "73575c",
    "ee4866",
    "621624",
    "ce5777",
    "cc163a",
    "f1c4cd",
    "eeb8c3",
    "856d72",
    "2d0c13",
    "36282b",
    "bf3553",
    "ec9bad",
    "63071c",
    "30161c",
    "eea6b7",
    "e9ccd3",
    "eba0b3",
    "4f383e",
    "ed9db2",
    "ec8aa4",
    "ec7696",
    "ea7293",
    "ef82a0",
    "ec2c64",
    "eb507e",
    "eb3c70",
    "ea517f",
    "de7897",
    "b598a1",
    "ed2f6a",
    "c5708b",
    "33141e",
    "621d34",
    "ef3473",
    "382129",
    "310f1b",
    "381924",
    "e16c96",
    "951c48",
    "62102e",
    "e0c8d1",
    "d13c74",
    "4b1e2f",
    "ec4e8a",
    "de3f7c",
    "a8456b",
    "ce5e8a",
    "461629",
    "ee2c79",
    "ef498b",
    "ede3e7",
    "ec2d7a",
    "482936",
    "440e25",
    "d2568c",
    "e9d7df",
    "d2357d",
    "36292f",
    "d276a3",
    "c06f98",
    "cc5595",
    "c35691",
    "ba2f7b",
    "9b1e64",
    "5d3f51",
    "4e2a40",
    "bc84a8",
    "c08eaf",
    "411c35",
    "ad6598",
    "a35c8f",
    "681752",
    "894276",
    "7e2065",
    "8b2671",
    "983680",
    "c8adc4",
    "1c0d1a",
    "7e1671",
    "1e131d",
    "813c85",
    "d1c2d3",
    "3e3841",
    "815c94",
    "806d9e",
    "e2e1e4",
    "322f3b",
    "8076a3",
    "35333c",
    "22202e",
    "131124",
    "302f4b",
    "525288",
    "2f2f35",
    "ccccd6",
    "74759b",
    "1f2040",
    "2e317c",
    "a7a8bd",
    "61649f",
    "2d2e36",
    "5e616d",
    "47484c",
    "0f1423",
    "131824",
    "475164",
    "2b333e",
    "1c2938",
    "101f30",
    "142334",
    "15559a",
    "0f59a4",
    "1661ab",
    "3170a7",
    "346c9c",
    "2775b6",
    "2b73af",
    "2474b5",
    "4e7ca1",
    "2376b7",
    "144a74",
    "93b5cf",
    "2177b8",
    "126bae",
    "1772b4",
    "baccd9",
    "619ac3",
    "495c69",
    "8fb2c9",
    "5698c3",
    "11659a",
    "2983bb",
    "1677b3",
    "c4cbcf",
    "1177b0",
    "2486b9",
    "5e7987",
    "74787a",
    "cdd1d3",
    "1781b5",
    "66a9c9",
    "d0dfe6",
    "2f90b9",
    "8abcd1",
    "c3d7df",
    "158bb8",
    "d8e3e7",
    "b2bbbe",
    "1a94bc",
    "5cb3cc",
    "134857",
    "132c33",
    "21373d",
    "b0d5df",
    "22a2c3",
    "474b4c",
    "63bbd0",
    "126e82",
    "0f95b0",
    "1491a8",
    "c7d2d4",
    "1e9eb3",
    "3b818c",
    "0eb0c9",
    "29b7cb",
    "51c4d3",
    "7cabb1",
    "10aec2",
    "648e93",
    "93d5dc",
    "617172",
    "c6e6e8",
    "869d9d",
    "57c3c2",
    "c4d7d6",
    "12aa9c",
    "737c7b",
    "12a182",
    "1ba784",
    "428675",
    "c0c4c3",
    "248067",
    "1a3b32",
    "314a43",
    "2c9678",
    "223e36",
    "497568",
    "141e1b",
    "69a794",
    "2bae85",
    "9abeaf",
    "45b787",
    "92b3a5",
    "1f2623",
    "83cbac",
    "70887d",
    "55bb8a",
    "20a162",
    "40a070",
    "1a6840",
    "61ac85",
    "68b88e",
    "a4cab6",
    "3c9566",
    "5dbe8a",
    "207f4c",
    "eef7f2",
    "579572",
    "b9dec9",
    "229453",
    "20894d",
    "15231b",
    "66c18c",
    "a4aca7",
    "8a988e",
    "9eccab",
    "83a78d",
    "485b4d",
    "5d655f",
    "6e8b74",
    "2b312c",
    "c6dfc8",
    "41b349",
    "43b244",
    "253d24",
    "41ae3c",
    "add5a2",
    "5e665b",
    "8cc269",
    "5bae23",
    "dfecd5",
    "cad3c3",
    "9fa39a",
    "b2cf87",
    "96c24e",
    "f0f5e5",
    "b7d07a",
    "d0deaa",
    "373834",
    "bacf65",
    "e2e7bf",
    "bec936",
    "d2d97a",
    "e2d849",
    "fffef8",
    "5e5314",
    "fffef9",
    "ad9e5f",
    "fed71a",
    "f9f4dc",
    "e4bf11",
    "d2b116",
    "fbda41",
    "eed045",
    "f1ca17",
    "d2b42c",
    "f2ce2b",
    "e2c027",
    "645822",
    "fcd217",
    "f8df70",
    "dfc243",
    "f8df72",
    "ffd111",
    "ddc871",
    "fffefa",
    "867018",
    "887322",
    "fcd337",
    "8e804b",
    "fecc11",
    "fccb16",
    "ffc90c",
    "b7ae8f",
    "f8d86a",
    "fbcd31",
    "fcc307",
    "e9ddb6",
    "fcc515",
    "f7e8aa",
    "e8b004",
    "f9c116",
    "f9d770",
    "fbc82f",
    "f1f0ed",
    "5b4913",
    "f6c430",
    "b78d12",
    "f9bd10",
    "f9d367",
    "d9a40e",
    "ebb10d",
    "584717",
    "f7de98",
    "f9f1db",
    "f4ce69",
    "feba07",
    "8a6913",
    "876818",
    "b6a476",
    "fcb70a",
    "f0d695",
    "87723e",
    "f8e8c1",
    "d6a01d",
    "f7da94",
    "eaad1a",
    "fbb612",
    "b5aa90",
    "f7f4ed",
    "f8bc31",
    "b78b26",
    "e5d3aa",
    "695e45",
    "e5b751",
    "f3bf4c",
    "685e48",
    "fbb929",
    "f9d27d",
    "e2c17c",
    "b4a992",
    "f6dead",
    "f2e6ce",
    "f8e0b0",
    "393733",
    "835e1d",
    "f8f4ed",
    "fca104",
    "815f25",
    "fca106",
    "ffa60f",
    "806332",
    "fbf2e3",
    "fba414",
    "e4dfd7",
    "826b48",
    "dad4cb",
    "bbb5ac",
    "bbb5ac",
    "ff9900",
    "fbb957",
    "dc9123",
    "c09351",
    "f4a83a",
    "f7c173",
    "e7a23f",
    "533c1b",
    "f9e8d0",
    "de9e44",
    "f9cb8b",
    "f9a633",
    "daa45a",
    "553b18",
    "513c20",
    "986524",
    "97846c",
    "e3bd8d",
    "4d4030",
    "fb8b05",
    "f8c387",
    "f28e16",
    "503e2a",
    "4a4035",
    "cfccc9",
    "c1b2a3",
    "867e76",
    "847c74",
    "fc8c23",
    "fbecde",
    "4f4032",
    "fbeee2",
    "81776e",
    "9a8878",
    "5d3d21",
    "66462a",
    "918072",
    "d99156",
    "c1651a",
    "d4c4b7",
    "be7e4a",
    "5c3719",
    "de7622",
    "db8540",
    "80766e",
    "f09c5a",
    "f97d1c",
    "f26b1f",
    "f8b37f",
    "fa7e23",
    "f9e9cd",
    "b7a091",
    "945833",
    "f0945d",
    "964d22",
    "954416",
    "e16723",
    "fc7930",
    "cf7543",
    "f86b1d",
    "cd6227",
    "f6dcce",
    "d85916",
    "f7cfba",
    "f27635",
    "e46828",
    "fc6315",
    "b7511d",
    "ea8958",
    "e8b49a",
    "fb9968",
    "edc3ae",
    "363433",
    "8b614d",
    "aa6a4c",
    "a6522c",
    "fa5d19",
    "71361d",
    "b89485",
    "f68c60",
    "f6ad8f",
    "732e12",
    "f7cdbc",
    "ef632b",
    "8c4b31",
    "64483d",
    "f9723d",
    "cf4813",
    "ee8055",
    "f8ebe6",
    "753117",
    "603d30",
    "883a1e",
    "b14b28",
    "873d24",
    "f6cec1",
    "5b423a",
    "624941",
    "673424",
    "f43e06",
    "ef6f48",
    "f4c7ba",
    "ed5126",
    "f34718",
    "f2481b",
    "652b1c",
    "eea08c",
    "f04b22",
    "692a1b",
    "f1441d",
    "773d31",
    "eeaa9c",
    "f0ada0",
    "863020",
    "f2e7e5",
    "862617",
    "f5391c",
    "f03f24",
    "f33b1f",
    "f23e23",
    "f13c22",
    "f05a46",
    "f17666",
    "f15642",
    "f25a47",
    "f2b9b2",
    "592620",
    "de2a18",
    "ed3321",
    "f04a3a",
    "482522",
    "5c1e19",
    "d42517",
    "f19790",
    "ab372f",
    "5a1f1b",
    "ed3b2f",
    "bdaead",
    "eb261a",
    "ac1f18",
    "483332",
    "481e1c",
    "f1908c",
    "ec2b24",
    "efafad",
    "f2cac9",
    "4b2e2b",
    "ed4845",
    "ed3333",
    "5d3131"
]

