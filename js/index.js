$(function() {
    /*1. 添加一个滚动条滚动的事件 去获取滚动的距离
    2. 获取轮播图元素的高度
    3. 计算透明度   滚动距离 / 轮播图高度
    4. 设置到header的rgba的a透明度上*/
    // 3. 获取轮播图元素 获取轮播图的高度
    var slideHeight = $('#slide').height();
    // 5. 获取头部元素
    var header = $('#header');
    // 1. 添加一个滚动条滚动的事件
    $(window).on('scroll', function(e) {
        // 2. 获取滚动条滚动的距离  兼容多种浏览器可以使用兼容写法 || 短路运算符   第一个值有值返回第一个值 第一个值没有值  返回第二个值
        var scrollTop = $(window).scrollTop();
        // 4. 计算透明度  滚动条距离/轮播图高度
        var opacity = scrollTop / slideHeight;
        // 5. 把透明度设置到头部的背景色 rgba 的a上
        header.css('background-color','rgba(222, 24, 27,' + opacity + ')');
    });

    // 后台的时间怎么来的： 使用未来的时间 假设今天中午12点    和 一个当前2018年12月8日10:47:48    
    // 用未来时间-当前的时间 求到时间差 作为一个总秒数返回给前端
    //获取未来的时间
    // var fetureTime = new Date("12 8,2018 12:00:00");
    // 注意如果使用数字传参 月份0-11  减1月    调用getTime()函数把时间转成毫秒数 1970.1.1 00:00:00-当前指定时间的时间差的毫秒数
    var futureTime = new Date(2018, 11, 8, 14, 49, 00).getTime();
    console.log(futureTime);
    //获取当前时间
    var nowTime = new Date().getTime();
    console.log(nowTime);
    // 因为使用fetureTime-nowTime默认转成毫秒数来相减 减完后默认 是毫秒数 求秒数  / 1000 求到秒  向下取整
    console.log(futureTime - nowTime);
    // 1. 定义一个总时间 2小时  1个小时60分钟  1 分钟是60秒    2小时就是7200秒 （从后台获取）
    var time = Math.floor((futureTime - nowTime) / 1000);
    // 3. 获取所有的span元素
    var spans = $('.seckill-time span');
    console.log(time);
    // 倒计时功能
    //  1. 需要有一个总的倒计时的事件(请求数据 后台返回回来的)
    //  2. 把事件作为时分秒的形式显示给用户  每个一秒  总时间--
    function downTime() {
        // 2. 求到总时间的时分秒 
        // 1. 小时 1个小时60分钟 1 分钟 60秒   1个小时 =  60*60 == 3600    总时间/3600
        var hour = time / 3600;
        // console.log(hour);
        // 2. 分钟 1分钟60秒但是要把小时部分去掉   time % 3600 把小时部分去掉  然后1分钟60   总秒数 % 3600 / 60 == 分钟数 
        var minute = time % 3600 / 60;
        // console.log(minute);
        // 3. 秒数 只要60秒以内都是秒数 总时间 % 60
        var second = time % 60;
        // console.log(second);
        // 4. 把时分秒分别显示到对应的span里面 分别求出十位和个位 向下取整  十位 / 10  个位 % 10
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);
    }
    if (time <= 0) {
        time = 7200;
    }
    downTime();
    // 5. 定义一个定时器 让总时间每隔1秒--
    var timeId = setInterval(function() {
        // 6. 让总时间在定时器里面每隔1秒--
        time--;
        if (time <= 0) {
            time = 7200;
            // 倒计时已经到了就清除定时器
            // clearInterval(timeId);
            // 7. 时间--完后重新计算--完后的时分秒设置到页面上
            downTime();
            // 跳转到秒杀商品页面
        } else {
            downTime();
        }
    }, 1000);

    // 初始化swiper插件  第一个参数轮播图大容器选择器  第二个参数是对象 是轮播图一些配置项
    new Swiper('.swiper-container', {
        // 方向 水平
        direction: 'horizontal',
        // 是否循环 无缝轮播图 （动态添加2张图片）
        loop: true,
        // 小圆点
        pagination: {
            el: '.swiper-pagination',
        },
        // autoplay: true, //等同于以下设置
        autoplay: {
            delay: 1000,
            // 是否要滚动到最后一张结束自动轮播图  false不结束  true就结束(loop模式无效)
            stopOnLastSlide: true,
            // 在手指滑动的轮播图的时候是否要禁用轮播图自动切换  默认true禁用 改为false不仅用
            disableOnInteraction: false,
        },
        // 效果 淡入淡出
        // effect : 'fade',
        // 3d立体效果
        // effect : 'cube'
    });
});
