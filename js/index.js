/**
 * Created by sole l on 2017/4/11.
 */


/*loading页*/

var loadingFn = (function () {

        var $loading = $(".loading");
        var $progressBar = $(".progress-bar");
        var num=0;
        var ary = ["sense.jpg", "hr.jpg","bgMessage.jpg","bubbles.png","css3.jpg","h5.jpg","hb.jpg","return.png","react.jpg","nodejs.jpg","mfBg.jpg","meteor.png","keyBoard.png","vue.jpg","twinkling.png","tips.png","tbbg.jpg","stars.png","wei.png","ws.jpg","wx.jpg"];
        function init() {
            $loading.css("display","block");
            $.each(ary,function (index,item) {
                var reg = /\.([a-zA-Z1-9]+)/i;
                var type = reg.exec(item)[1];
                console.log(type);
                if(type == 'mp3'){
                    var oAudio = new Audio;
                    oAudio.src = "audio/"+item;
                    oAudio.onloadedmetadata =load;
                }else{
                    var oImg = new Image;
                    oImg.src = "img/"+item;
                    oImg.onload = load;
                }
            });
            function load() {
                num++;
                var count = num/ary.length*100+'%';
                $progressBar.css("width",count);
                if(num == ary.length){
                    window.setTimeout(function () {
                        $loading.remove();
                        starPage.init()
                    },2000);
                }
            }
        }

    return {init:init}
})();
loadingFn.init();
/*loading页*/

/*流星页*/
var starPage = (function () {
        var stars = document.getElementById('stars')
        var $btnVx = $('.vx2');
        var $messagePage = $('#starMessage');


        function randomDistance (max, min) {
            var distance = Math.floor(Math.random() * (max - min + 1) + min)
            return distance
        }

        function init() {
            // js随机生成流星
            for (var j=0;j<10;j++) {
                var newStar = document.createElement("div")
                newStar.className = "star"
                newStar.style.top = randomDistance(200, -300) + 'px'
                newStar.style.left = randomDistance(1300, 100) + 'px'
                stars.appendChild(newStar)
            }
            for (var i=0;i<10;i++) {
                var newStar = document.createElement("div")
                newStar.className = "star star2"
                newStar.style.top = randomDistance(200, -300) + 'px'
                newStar.style.left = randomDistance(1300, 100) + 'px'
                stars.appendChild(newStar)
            }
            for (var k=0;k<10;k++) {
                var newStar = document.createElement("div")
                newStar.className = "star star3"
                newStar.style.top = randomDistance(200, -300) + 'px'
                newStar.style.left = randomDistance(1300, 100) + 'px'
                stars.appendChild(newStar)
            }
            for (var z=0;z<10;z++) {
                var newStar = document.createElement("div")
                newStar.className = "star star4"
                newStar.style.top = randomDistance(200, -300) + 'px'
                newStar.style.left = randomDistance(1300, 100) + 'px'
                stars.appendChild(newStar)
            }
            // 封装随机数方法

            setTimeout(function(){
                var btn = $('.vx2');
                btn.css({"display":"block"});
            },4900);

            $btnVx.singleTap(function () {
                $messagePage.remove();
                messageFn.init()
            });
        }
        return {init:init}
})();

/*电话接听页*/


/*信息发送页*/
var messageFn = (function () {
    var $msg = $(".msg");
    var $oul = $msg.children("ul");
    var $oLis = $(".msg li");
    var $board = $(".board");
    var $btn = $board.find(".board-btn");
    var num = 0;
    var h =0;
    var timer = null;
    /*果然要这样获得,我JQ很不熟*/
    /*console.log($oLis);*/
    function init() {
        $msg.css("display", "block");
        move();
    }
    function move() {
        timer = window.setInterval(function () {//$.each是引擎运算,太快了,应该用定时器对单独每个li去算
            var $li = $oLis.eq(num);
            if(!$li.hasClass("btnMsg")){
                $li.css({
                    "opacity":1,
                    "transform":"translate(0,0)",
                    "-webkit-transform":"translate(0,0)"
                });
            }else{
                window.clearInterval(timer);
                keyboard();
            }
            if(num == $oLis.length){
                window.clearInterval(timer);
                window.setTimeout(function () {
                    $msg.remove();
                    cubeFn.init();
                },1000);
            }else {
                if(num >2){
                    /*  console.log($oLis[num]);*/
                    /*$oLis[num]居然获得的是原生*/
                    h += $oLis[num].offsetHeight;
                    $oul.css({
                        "-webkit-transform":"translate(0,"+(-h)+"px)",
                        "transform":"translate(0,"+(-h)+"px)",
                        "-webkit-transition":"1s",
                        "transition":"1s"
                    });

                }
            }
            num++;
        },2000);

    }
    function keyboard() {
        var str = "好,就听你说说";
        str = str.split("")
        var content = '';
        var keyTimer = null;
        var $text = $(".board-txt");
        var num = 0;
        $board.css({
            "-webkit-transform":"translate(0,0)",
            "transform":"translate(0,0)",
            "opacity":1
        });
        /*console.log($board);*/
        keyTimer = window.setInterval(function () {
            content += str[num];
            num++;
            $text.html(content);
            if(num == str.length){
                clearInterval(keyTimer);
                $btn.css("opacity",1);
                $btn.singleTap(function () {
                    var $oLi = $(".msg ul li:nth-child(7)")
                    $oLi.css({
                        "opacity":1,
                        "-webkit-transform":"translate(0,0)",
                        "transform":"translate(0,0)"
                    });
                    /*居然就是btn那个LI,不过是原生*/
                    /*   console.log($(this));*/
                    $text.html("");
                    $board.css({
                        "-webkit-transform":"translate(0,3.7rem)",
                        "transform":"translate(0,3.7rem)",
                        "-webkit-transition":"1s",
                        "transition":"1s"
                    });
                    move();
                });
            }
        },200);
    }
    return {init:init}
})();
/*信息发送页*/

/*魔方页*/
var cubeFn = (function () {
    var $cube = $(".cube");
    var $cubeBox = $cube.children("ul");
    var $cubeLi = $(".cube li");

    function init() {
        $cube.css("display","block");
        window.setTimeout(function () {
            $cubeBox.css("transform","scale(0.5) rotateX(-45deg) rotateY(45deg)");
        },500);
        /*本身设置的,我们想让其初始化的时候转一下*/
        $cubeBox.on("transitionEnd webkitTransitionEnd",function () {
            /*清楚应该是避免等下还有动画用了这个过渡吧*/
            $(this).css("transition","");
        });
        bind();
        $cubeLi.singleTap(function () {
            var index = $(this).index();
            $cube.hide();
            details.init(index);
        });
    }
    function bind() {
        console.log(4);
        var startX = -45;
        var startY = 45;
        var x = 0;
        var y = 0;
        var downX = 0;
        var downY = 0;
        var flag = false;
        var moveX =0;
        var moveY =0;
        $(document).on("touchstart",function(e){
            console.log(e);
            downX = e.touches[0].pageX;
            downY = e.touches[0].pageY;
        },false);
        $(document).on("touchmove",function(e){
            flag = true;
            e.preventDefault();
            moveX = e.touches[0].pageX;
            moveY = e.touches[0].pageY;
            x = (downY - moveY)*1/2;
            y = (moveX-downX)*1/2;
            if(x+startX>70){
                x =-startX+70;
            }else if(x+startX<-70){
                x =-startX-70;
            }
            $cubeBox.css("transform","scale(0.6) rotateX("+(x+startX)+"deg) rotateY("+(y+startY)+"deg)");
        },false);

        $(document).on("touchend",function(){
            if(flag){
                startX +=x;
                startY +=y;
            }

        },false);
    }
    return {init:init}
})();
cubeFn.init();
/*魔方页*/

/*详情页*/
var details = (function () {
    /*1.去dl添加类名,2.这里获得,3.那个设置就可以了*/
    var $maki = $("#maki");
    var $detailsReturn = $(".detailsReturn");
    var $details = $(".details");
    var $cube = $(".cube");
    function init(index) {
        $details.show();
        bind(index);
        $detailsReturn.singleTap(function () {
            /*详情页消失,回到魔方页*/
            $details.hide();
            $cube.show();
        });
    }
    function bind(index) {
        var mySwiper = new Swiper ('.swiper-container', {
            direction:"horizontal",
            loop:false,
            effect:"coverflow",
            initialSlide:index,//初始滑块的索引
            onTransitionEnd:change,//滑动结束的时候执行change
            onInit:change//初始化也执行这个函数
        });
    }//布置好结构后,只要用bind这个函数就马上可以滑动了
    function change(swiper) {//这个方法自带一个参数 我们命名为swiper
        //首先获得所有的滑块
        var slides = swiper.slides;
        //还要获得当前滑块的索引
        var curIndex = swiper.activeIndex;
        curIndex ==0?open():close();
        //循环遍历所有滑块,当=索引,就添加ID名
        $.each(slides,function (index,item) {
            if(index == curIndex){
                item.id = "slide"+(curIndex+1);
                return;
            }
            item.id="";
        });
    }
    function open() {
        $maki.makisu({
            selector:'dd',
            overlap:0.6,
            speed:0.8
        });
        $maki.makisu("open");
    }
    function close() {
        $maki.makisu({
            selector:'dd',
            overlap:0.6,
            speed:0
        });
        $maki.makisu("close");
    }
    return {init:init}
})();
/*详情页*/
