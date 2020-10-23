$(function () {
    $('footer').load('Netflix_header_footer.html footer div');
    $('header').load('Netflix_header_footer.html header > div', HFloaded);

    /* -------------------메뉴 이벤트------------------- */
    function HFloaded() {
        var navMenu = $(this).find('nav').find('a');
        var page_url = window.location.href;
        var page_id = page_url.split('#');
        var searchTxt = $('.search input').attr('placeholder');
        var nowY = 0,
            inW = $(window).innerWidth(),
            outW = $(window).outerWidth();

        $('.DOMcontainer').width(outW);
        $('.DOMscroll').width(inW);
        $('header').width(inW);
        $('main').width(inW);
        $('footer').width(inW);

        $(window).resize(function () {
            inW = $(window).innerWidth();
            outW = $(window).outerWidth();
            $('.DOMcontainer').width(outW)
            $('.DOMscroll').width(inW);
            $('header').width(inW);
            $('main').width(inW);
            $('footer').width(inW);
        })

        navMenu.on({
            click: menuClick,
            mouseover: barMove,
        })

        $('nav').on('mouseleave', barMove2);

        /* $(window).on('wheel',function(e){
            if($('.burger-menu span').eq(1).attr('class') == 'active'){
                $(this).scrollTop(nowY);
            };
            console.log(nowY)
        }) */

        $(window).on('scroll', function (e) {
            e.preventDefault();
        })

        $('.header-box').on('click', function (e) {
            if (e.target.nodeName == 'INPUT') {
                $('.search input').addClass('active');
            } else {
                $('.search input').removeClass('active');
            }
        })

        function onBtn() {
            $('.burger-menu').on('click', menuOpen);
        }
        onBtn();

        function offBtn() {
            $('.burger-menu').off('click');
            setTimeout(function () {
                onBtn()
            }, 1000);
        }

        function menuOpen() {
            if ($('body').attr('style') == undefined) {
                $('body').css({
                    'overflow-y': 'scroll',
                    'position': 'fixed',
                    'width': '100%'
                })
            } else {
                $('body').removeAttr('style');
            }
            var btn = $('.burger-menu > span').eq(1);
            btn.toggleClass('active');

            nowY = $(window).scrollTop();

            if (btn.attr('class') == 'active') {
                $('nav').css({
                    "transform": "translateY(-30%) rotateX(90deg)",
                    "opacity": 0,
                    "visibility": "hidden"
                });
                $('.openmenu-bg').fadeIn();
                setTimeout(function () {
                    $('.search').addClass('active');
                    $('.menu-open').addClass('active');
                    $('.menu-line').addClass('active');
                }, 200)
                setTimeout(function () {
                    $('.menu-scroll').fadeIn();
                }, 1000)
            } else {
                $('.search').removeClass('active');
                $('.menu-open').removeClass('active');
                $('.menu-line').removeClass('active');
                $('.openmenu-bg').fadeOut();
                $('.menu-scroll').fadeOut();
                setTimeout(function () {
                    $('nav').removeAttr('style');
                }, 500)
            }

            offBtn();
        }

        function menuClick() {
            var navIdx = $(this).index();
            if (navIdx == 2) {
                $('.option span').removeClass('active');
                $('.option span').eq(1).addClass('active');
            }
        }

        var setT = '';

        function barMove() {
            clearTimeout(setT);
            var mLeft = $(this).position().left + "px",
                mWidth = $(this).width();
            $('.point').css({
                "width": mWidth + 'px',
                "left": mLeft,
                "opacity": 1
            })
        }

        function barMove2() {
            setT = setTimeout(function () {
                $('.point').css({
                    "width": 0,
                    "left": 0,
                    "opacity": 0
                });
            }, 800);
        }

        $(document).ready(function () {
            history.pushState(null, null, page_id[0]);
            if (page_id[1] != '') {
                $('html').scrollTop(0)
            }
        });

        /* -------------------콘텐츠 상세정보------------------- */

        $.ajax({
            url: '../preview.json',
            type: 'GET',
            success: function (data) {
                var imgUrl = '',
                    letterUrl = '',
                    videoUrl = '',
                    label = '',
                    story = '',
                    genre = '',
                    characters = '',
                    sub = '',
                    aria = '',
                    aria2 = '',
                    pIdx = 0,
                    filter = '',
                    filter2 = [];
                var epThumbnail = '',
                    epTitle = '',
                    epRunningtime = 0,
                    epStory = '',
                    epContent = '',
                    menuContent = '',
                    keyPress = '';
                let ranCont = [],
                    randomIdx = 0;

                $('#search').on('keyup',keyU)
                $('.search span').on('click',function(){
                    $('#search').val('');
                    $('.search span').fadeOut();
                    $('.menu-scroll').fadeOut();
                    setTimeout(function(){
                        recommandC();
                        searchResult();
                        $('.menu-scroll').fadeIn();
                    },300)
                })

                function keyU(){
                    clearTimeout(keyPress);
                    filter = '';
                    keyPress = setTimeout(function(){
                        data.element.forEach(function (el, idx) {
                            if(el.genre.includes($('#search').val()) || el.title.includes($('#search').val())){
                                filter += el.title+',';
                            };
                        })
                        filter2 = filter.split(',');

                        data.element.forEach(function (el, idx) {
                            filter2.forEach(function(el2, idx2){
                                if(el2 == el.title){
                                    ranCont.push(idx);
                                    randomIdx++;
                                }
                            })
                        })
                        recommandC();
                        searchResult();
                        $('.menu-scroll').fadeIn();
                        $('.search-result li').on('click', startMd);
                    },1000);
                    if($('#search').val() != ''){
                        $('.menu-scroll').fadeOut();
                        $('.search span').fadeIn();
                    }
                }

                function recommandC() {
                    while (randomIdx < 10) {
                        let num = Math.floor(Math.random() * 16) + 1;
                        if (!sameNum(num)) {
                            ranCont.push(num);
                            randomIdx++;
                        }
                    }

                    function sameNum(raN) {
                        for(var i = 0; i < ranCont.length; i++){
                            if (raN == ranCont[i]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    return ranCont;
                }
                recommandC();

                function searchResult(){
                    menuContent = '';
                    aria = '';

                    ranCont.forEach(function(el, idx){
                        aria += data.element[ranCont[idx]].title+',';
                        imgUrl = data.element[ranCont[idx]].imgUrl;
    
                        menuContent += "<li>"
                        menuContent += "<img src="+imgUrl+">"
                        menuContent += "<p class='sr-bg'></p>"
                        menuContent += "</li>"
                    })
                    $('.search-result').html(menuContent);
                    $('.search-result li').each(function(idx){
                        $(this).attr('aria-label',aria.split(',')[idx])
                        $(this).find('img').attr('alt',aria.split(',')[idx])
                    })
                    ranCont = [];
                    randomIdx = 0;
                }
                searchResult();


                $('.top-slide li').on('click', startMd);
                $('.slide-box2 li').on('click', startMd);
                $('.search-result li').on('click', startMd);
                $('.sub-list li').on('click', startMd);

                function startMd() {
                    $('#content-preview').modal({
                        fadeDuration: 250
                    });

                    label = $(this).attr('aria-label');

                    $('body').css({
                        'overflow-y': 'scroll',
                        'width': '100%'
                    })
                    console.log($(this))

                    epContent = '';

                    data.element.forEach(function (el, idx) {
                        if (label == el.title) {
                            imgUrl = el.bgImgUrl;
                            letterUrl = el.bgLetterImg;
                            videoUrl = el.bgVideo;
                            story = el.story;
                            genre = el.genre;
                            characters = el.characters;
                            pIdx = idx;

                            data.element[idx].episode.forEach(function (el2, idx2) {
                                epTitle = el2.title;
                                epRunningtime = el2.runningTime;
                                epStory = el2.episodeStory;

                                epContent += "<li>"
                                epContent += "<code>" + (idx2 + 1) + "</code>"
                                epContent += "<p class='ep-play'><span></span></p>"
                                epContent += "<p class='ep-times'>"
                                epContent += "<span>" + epTitle + "</span>"
                                epContent += "<span>" + epRunningtime + "분</span></p>"
                                epContent += "<p class='ep-story'>" + epStory + "</p></li>"
                            });
                            $('.episode ul').html(epContent);

                            data.element[idx].episode.forEach(function (el3, idx3) {
                                epThumbnail = el3.thumbNail;
                                $('.ep-play').eq(idx3).css({
                                    "background": "url(" + epThumbnail + ") no-repeat center / 100% 100%"
                                });
                            })
                        };
                    });

                    $('#preview-vdo').attr('src', videoUrl);
                    $('#preview-img').attr('src', imgUrl);
                    $('#preview-letter').attr('src', letterUrl);
                    $('.preview-story').html(story);
                    $('#preview-characters').html(characters.slice(0, 3).join(', ') + " 外");
                    $('#preview-genre').html(genre.join(', '));

                    setTimeout(function () {
                        $('.preview-letter').css('transform', 'scale(0.8)')
                    }, 1000)
                }

                $('#content-preview').on($.modal.CLOSE, function () {
                    if($('.burger-menu span').eq(1).attr('class') != 'active'){
                        setTimeout(function () {
                            $('body').removeAttr('style', '');
                        }, 180)
                    };
                    $('.preview-letter').removeAttr('style');
                    $('.bg-img').removeClass('active');
                    $('#preview-vdo').get(0).pause();
                    $('#preview-vdo')[0].currentTime = 0;
                })

                $('#content-preview').on($.modal.AFTER_CLOSE, function () {
                    if($('.burger-menu span').eq(1).attr('class') == 'active'){
                        $('body').css({
                            'overflow-y': 'scroll',
                            'position': 'fixed',
                            'width': '100%'
                        })
                    }
                })

                $('#content-preview').on($.modal.BEFORE_OPEN, function () {
                    // $('.DOMcontainer').css('overflow-y','hidden')
                    $('body').css({
                        'overflow-y': 'hidden'
                    })
                    if (label != sessionStorage.getItem(label)) {
                        $('.int-btn span').eq(0).removeClass('active');
                    } else {
                        $('.int-btn span').eq(0).addClass('active');
                    }

                    if (sessionStorage.getItem(label+'like') == 'yes') {
                        $('.int-btn span').eq(2).removeClass('active');
                        $('.int-btn span').eq(1).addClass('active');
                    } else if(sessionStorage.getItem(label+'like') == 'no') {
                        $('.int-btn span').eq(1).removeClass('active');
                        $('.int-btn span').eq(2).addClass('active');
                    } else{
                        $('.int-btn span').eq(1).removeClass('active');
                        $('.int-btn span').eq(2).removeClass('active');
                    }
                })

                $('#content-preview').on($.modal.OPEN, function () {
                    setTimeout(function () {
                        $('.bg-img').addClass('active');
                    }, 300)
                    $('#preview-vdo').get(0).play();
                    

                    $('.blocker').on('scroll', function () {
                        if ($(this).scrollTop() > $('.preview-bg').height() / 2) {
                            $('.bg-img').removeClass('active');
                            $('#preview-vdo').get(0).pause();
                        } else {
                            $('.bg-img').addClass('active');
                            $('#preview-vdo').get(0).play();
                        }
                    })
                })

                $('.int-btn span').on('click', function () {
                    $(this).toggleClass('active');
                    if ($(this).index() == 1) {
                        if($(this).attr('class').includes('active')){
                            sessionStorage.setItem(label, label);
                        }else{
                            sessionStorage.removeItem(label);
                        }
                    }else if ($(this).index() == 2) {
                        $(this).siblings('.thumb-down').removeClass('active');
                        if($(this).attr('class').includes('active')){
                            sessionStorage.setItem(label+'like', 'yes');
                        }else{
                            sessionStorage.removeItem(label+'like');
                        }
                    } else if ($(this).index() == 3) {
                        $(this).siblings('.thumb-up').removeClass('active');
                        if($(this).attr('class').includes('active')){
                            sessionStorage.setItem(label+'like', 'no');
                        }else{
                            sessionStorage.removeItem(label+'like');
                        }
                    }
                })
            }
        })
    }
});