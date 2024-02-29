//var firstX = 0, firstY = 0, endX = 0, endY = 0;//初始化坐标值
//    window.addEventListener("touchstart", function (e) {
//        firstX = e.targetTouches[0].clientX;
//        firstY = e.targetTouches[0].clientY;
//    })
//    window.addEventListener("touchend", function (e) {
//        endX = e.changedTouches[0].clientX;
//        endY = e.changedTouches[0].clientY;
//        moveX = endX - firstX;//判断左右
//        moveY = endY - firstY;//判断上下
//        if (Math.abs(moveX) > 60 || Math.abs(moveY) > 60) {//判断是滑动，不是点击
//            if (Math.abs(moveX) > Math.abs(moveY)){
//                /*判断横向移动的距离和纵向移动的距离大小对比，判断是左右还是上下*/
//                var ele = moveX > 0 ? "向右" : "向左";
//                alert(ele);
//            }else {
//                var ele = moveY > 0 ? "向下" : "向上";
//                alert(ele);
//            }
//        }
//    })