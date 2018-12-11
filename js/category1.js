window.addEventListener('load', function() {
    // 初始化分类左侧的滚动
    new Swiper('.category-left .swiper-container', {
        //滑动方向
        direction: 'vertical',
        // 控制多屏滑动 内容滚动的原理就是多屏滚动
        slidesPerView: 'auto',
        // 支持鼠标拖动  滑动只有手机上才能滑动
        mousewheelControl: true,
        // 利用惯性自动滚动  松手后自动到顶部或者到底部
        freeMode: true,
        //防止文字模糊
        roundLengths: true
    });
    // 初始化分类右侧的滚动
    new Swiper('.category-right .swiper-container', {
        //滑动方向
        direction: 'vertical',
        // 控制多屏滑动 内容滚动的原理就是多屏滚动
        slidesPerView: 'auto',
        // 支持鼠标拖动  滑动只有手机上才能滑动
        mousewheelControl: true,
        // 利用惯性自动滚动  松手后自动到顶部或者到底部
        freeMode: true,
        //防止文字模糊
        roundLengths: true,
        //给右边添加一个滚动条  注意使用4.0的对象方式传参
        scrollbar: {
            el: '.swiper-scrollbar',
        }
    });

    /*1. 点击了左侧分类的某个分类 要滑动到让当前分类吸在顶部
    2. 要滑动吸顶  就是要设置位移 往上位移translateY 值还是负值
    3. 位移的距离 = - 分类的索引 * 分类高度
    4. 位移距离还不能超过最小位移距离 如果超过了就使用最小的位移距离
    5. 给滑动的元素设置当前计算的位移
    6. 慢慢位移添加一个过渡效果
    7. 给当前点击li添加active 其他兄弟删掉*/

    // 1. 给所有的li里面的a添加点击事件
    var links = document.querySelectorAll('.category-left ul li a');
    // 爷爷元素
    var swiperContainer = document.querySelector('.swiper-container');
    // 父元素
    var swiperWrapper = document.querySelector('.swiper-wrapper');
    // 子元素
    var swiperSlide = document.querySelector('.swiper-slide');
    // 2. 给所有a添加一个索引
    for (var i = 0; i < links.length; i++) {
        // 设置JS对象的属性
        // links[i].index = i;
        // 设置标签元素属性
        links[i].setAttribute('index', i);
        // 给所有a添加点击事件
        links[i].addEventListener('click', function() {
            // 3. 获取当前点击的a元素 的索引
            var index = this.getAttribute('index');
            // 4. 计算当前点击a需要位移的距离
            var translateY = -index * this.offsetHeight;
            console.log(translateY);
            // 5. 获取最小的位移的距离 爷爷元素高度swiper-container容器高度-子元素swiper-slide的高度
            var minTranslateY = swiperContainer.offsetHeight - swiperSlide.offsetHeight;
            // 6. 判断当前点击a要位移的距离是否小于最小位移距离
            if (translateY < minTranslateY) {
                // 如果小于了就设置为最小位移距离
                translateY = minTranslateY;
            }
            // 7. 给滑动的父元素设置位移
            swiperWrapper.style.transform = 'translate3d(0px, ' + translateY + 'px, 0px)';
            // 8. 给当前滑动父元素设置过渡效果
            swiperWrapper.style.transition = 'all 0.3s';
            // 9. 删掉所有元素的active
            for (var j = 0; j < links.length; j++) {
                //给每个a的父元素li删除active类名
                links[j].parentNode.classList.remove('active');
            }
            // 10. 给当前点击a的父元素添加active类名
            this.parentNode.classList.add('active');
        });
    }
    // console.log(links[1].index);
    // console.log(links[9].getAttribute('index'));
});
