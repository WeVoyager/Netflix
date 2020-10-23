$(function () {
    /* -------------------홈페이지 슬라이드------------------- */
     $('.change-slide').slick({
        dots: true,
        infinite: true,
        arrows: true,
        appendDots: $('.ig2'),
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        draggable: true,
        pauseOnHover: true
    }); 

    $('.change-slide').on('beforeChange', fboxOff)
    $('.change-slide').on('afterChange', fboxOn)

    var onOff2 = 0;

    $('.btn a').on('click',buttonM);

    function fboxOn(){
        $('.slide .slick-active').eq(1).find('.function-box').addClass('active');
    }
    fboxOn()

    function fboxOff(){
        $('.slide .slick-active').find('.function-box').removeClass('active');
    }

    function buttonM() {
        if (onOff2 == 0) {
            onOff2++
            $('.btn a img').attr('src', 'img/common/pause_gary.png')
            $('.change-slide').slick('slickPlay')
        } else {
            onOff2--
            $('.btn a img').attr('src', 'img/common/play_gary.png')
            $('.change-slide').slick('slickPause')
        }
    }
    buttonM();

    $('.ig2').append($('.btn'));

    $('.slick-dots li').append($("<span></span>"));

    var ranColor = ["#963014","#D61F06","#BF0603","#D60642","#CC0683"]
    
    $('.slick-dots li span').each(function(el,idx){
        $(this).css("background",ranColor[el]);
    });

    $('.set-box > span span').on('click',function(){
        if($(this).index() == 1){
            $(this).siblings('span').removeClass('active');
            $(this).toggleClass('active');
        }else{
            $(this).siblings('span').removeClass('active');
            $(this).toggleClass('active');
        }
    });

    /* -------------------회원가입------------------- */
    $('.step input[type=submit]').on('click', idPwCheck)

    var idx = 0;

    function idPwCheck(e) {
        e.preventDefault();

        var emailCheck = (/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
        var passwdCheck = (/^(?=.*[a-z]|[A-Z]|[0-9]|[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);

        var id = $('.one input[type=text]').val();
        var pw = $('.one input[type=password]').val();

        var id2 = $('.two input[type=text]').val();

        var idCheck = !emailCheck.test(id)
        var pwCheck = !passwdCheck.test(pw)

        var idCheck2 = !emailCheck.test(id2)

        function fail(idx, type, msg) {
            $(idx + ' input[type=' + type + ']').attr("placeholder", msg);
            $(idx + ' input[type=' + type + ']').val('');
            $(idx + ' input[type=' + type + ']').focus();
        }

        if ($(this).parent().index() == 0) {
            if (!emailCheck.test(id)) {
                fail('.one', 'text', '이메일의 형식이 올바르지 않습니다.')
                return;
            }

            if (!passwdCheck.test(pw)) {
                fail('.one', 'password', '8~16자의 영문 대소문자, 숫자 및 특수문자 사용가능')
                return;
            }

            next(!(idCheck && pwCheck),'.one')

        } else if ($(this).parent().index() == 1) {
            if (!emailCheck.test(id2)) {
                fail('.two', 'text', '이메일의 형식이 올바르지 않습니다.');
                return;
            }

            next(!(idCheck2),'.two')
            
        }


        function next(condition,el) {
            if (condition) {
                idx++
                $('.step').css("transform", "translateX(-" + 100 * idx + "%)");
                $(el).removeClass('active');
                $(el).next().addClass('active');
                console.log(el)
                if(idx == 2){$('.step-change').css('height','800px')}
            }
        }
    }

    /* -------------------배너광고------------------- */
    $(".change-ads ul").slick({
        dots: true,
        infinite: true,
        arrows: false,
        appendDots: $('.ig'),
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        draggable: false,
        pauseOnHover: false
    });

    $('.btn a').on('click', button)

    var onOff = 0;

    function button() {
        if (onOff == 0) {
            onOff++
            $('.btn a img').attr('src', 'img/common/pause_gary.png')
            $('.change-ads ul').slick('slickPlay')
        } else {
            onOff--
            $('.btn a img').attr('src', 'img/common/play_gary.png')
            $('.change-ads ul').slick('slickPause')
        }
    }
    button();

    $('.ig').append($('.btn'));

    /* -------------------컨텐츠 슬라이드------------------- */
    $('.top-slide').each(function(el){
        // $(this).css({"left":el*"-100%"});
        $(this).css({"left":(el*102.5)+"%"})
    })

    $('.slide-box2').each(function(idx){
        $(this).find('ul').each(function(idx2){
            $(this).css({"left":(idx2*102.5)+"%"});
        })
    })
    
    $('.top-10_prev').on('click',prev)
    $('.top-10_next').on('click',next)

    $('.tv_prev').on('click',prev2)
    $('.tv_next').on('click',next2)


    var slideIdx = 0, sIdx = 0;
    var slideIdx2 = [0,0,0,0];

    function next(){
        box = $(this).parent().find('div:first-child'), boxUl = box.find('ul');
        if(slideIdx < boxUl.length-1 ){
            slideIdx++;
            box.css({"left":slideIdx*-102.5 +"%"});
        }else{
            slideIdx = 0;
            box.css({"left":slideIdx*-102.5 +"%"});
        }
        listA(slideIdx,$(this));
    }

    function prev(){
        box = $(this).parent().find('div:first-child'), boxUl = box.find('ul');
        if(slideIdx > 0){
            slideIdx--;
            box.css({"left":slideIdx*-102.5 +"%"});
        }else{
            slideIdx = boxUl.length-1;
            box.css({"left":slideIdx*-102.5 +"%"});
        }
        listA(slideIdx,$(this));
    }

    function next2(){
        box = $(this).parent().find('div:first-child'), boxUl = box.find('ul');
        sIdx = $(this).parents('article').index()-1;
        if(slideIdx2[sIdx] < boxUl.length-1 ){
            slideIdx2[sIdx]++;
            // console.log(slideIdx2[sIdx])
            box.css({"left":slideIdx2[sIdx]*-102.5 +"%"});
        }else{
            slideIdx2[sIdx] = 0;
            box.css({"left":slideIdx2[sIdx]*-102.5 +"%"});
        }
        listA(slideIdx2[sIdx],$(this));
    }

    function prev2(){
        box = $(this).parent().find('div:first-child'), boxUl = box.find('ul');
        sIdx = $(this).parents('article').index()-1;
        if(slideIdx2[sIdx] > 0 ){
            slideIdx2[sIdx]--;
            // console.log(slideIdx2[sIdx])
            box.css({"left":slideIdx2[sIdx]*-102.5 +"%"});
        }else{
            slideIdx2[sIdx] = boxUl.length-1;
            box.css({"left":slideIdx2[sIdx]*-102.5 +"%"});
        }
        listA(slideIdx2[sIdx],$(this));
    }

    function listA(i,x){
        var tvList = x.parent();
        tvList.find('.tv_list span').removeClass('active');
        tvList.find('.tv_list span').eq(i).addClass('active');
    }

    /* -------------------인디게이터------------------- */
    $('.slide-box ul').each(function(idx){
        $(this).parent().parent().find('.tv_list').append('<span/>')
    });

    $('.slide-box2').each(function(idx){
        $(this).find('ul').each(function(idx2){
            $(this).parent().parent().find('.tv_list').append('<span/>')
        })
    })

    $('.tv_list span:first-child').addClass('active');

    /* -------------------장르 선택------------------- */
    $('.genre span').on('click',function(){
        $('.genre div').toggleClass('active');
    })

    $('.genre div li').on('click',function(){
        $('.genre div').removeClass('active');
        $('.genre span').html($(this).html()+"<img src='img/common/select_option_02.png'>");
    });

    $('.option span').on('click',function(){
        $('.option span').removeClass('active');
        $(this).addClass('active');
    });
});