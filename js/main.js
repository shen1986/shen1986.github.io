/*
 * @Description: 
 * @Author: shenxf
 * @Date: 2019-03-04 13:52:11
 */
(function ($) {
    // To top button
    $("#back-to-top").on('click', function () {
        $('body, html').animate({ scrollTop: 0 }, 600);
    });

    // Nav bar toggle
    $('#main-nav-toggle').on('click', function () {
        $('.nav-container-inner').slideToggle();
    });

    // Caption
    $('.article-entry').each(function(i) {
        $(this).find('img').each(function() {
            if (this.alt && !(!!$.prototype.justifiedGallery && $(this).parent('.justified-gallery').length)) {
                $(this).after('<span class="caption">' + this.alt + '</span>');
            }

            // 对于已经包含在链接内的图片不适用lightGallery
            if ($(this).parent().prop("tagName") !== 'A') {
                $(this).wrap('<a href="' + this.src + '" title="' + this.alt + '" class="gallery-item"></a>');
            }
        });

    });
    if (typeof lightGallery != 'undefined') {
        var options = {
            selector: '.gallery-item',
        };
        $('.article-entry').each(function(i, entry) {
            lightGallery(entry, options);
        });
        lightGallery($('.article-gallery')[0], options);
    }
    if (!!$.prototype.justifiedGallery) {  // if justifiedGallery method is defined
        var options = {
            rowHeight: 140,
            margins: 4,
            lastRow: 'justify'
        };
        $('.justified-gallery').justifiedGallery(options);
    }

    // Sidebar expend
    $('#sidebar .sidebar-toggle').on('click', function () {
        if($('#sidebar').hasClass('expend')) {
            $('#sidebar').removeClass('expend');
        } else {
            $('#sidebar').addClass('expend');
        }
    });


    // Remove extra main nav wrap
    $('.main-nav-list > li').unwrap();

    // Highlight current nav item
    $('#main-nav > li > .main-nav-list-link').each(function () {
        if($('.page-title-link').length > 0){
            if ($(this).html().toUpperCase() == $('.page-title-link').html().toUpperCase()) {
                $(this).addClass('current');
            } else if ($(this).attr('href') == $('.page-title-link').attr('data-url')) {
                $(this).addClass('current');
            }
        }
    });

    // Auto hide main nav menus
    function autoHideMenus(){
        var max_width = $('.nav-container-inner').width() - 10;
        var main_nav_width = $('#main-nav').width();
        var sub_nav_width = $('#sub-nav').width();
        if (main_nav_width + sub_nav_width > max_width) {
            // If more link not exists
            if ($('.main-nav-more').length == 0) {
                $(['<li class="main-nav-list-item top-level-menu main-nav-more">',
                    '<a class="main-nav-list-link" href="javascript:;">More</a>',
                    '<ul class="main-nav-list-child">',
                    '</ul></li>'].join('')).appendTo($('#main-nav'));
                // Bind hover event
                $('.main-nav-more').hover(function () {
                    if($(window).width() < 480) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideDown('fast');
                }, function () {
                    if($(window).width() < 480) {
                        return;
                    }
                    $(this).children('.main-nav-list-child').slideUp('fast');
                });
            }
            var child_count = $('#main-nav').children().length;
            for (var i = child_count - 2; i >= 0; i--) {
                var element = $('#main-nav').children().eq(i);
                if (main_nav_width + sub_nav_width > max_width) {
                    element.prependTo($('.main-nav-more > ul'));
                    main_nav_width = $('#main-nav').width();
                } else {
                    return;
                }
            }
        }
        // Nav bar is wide enough
        if ($('.main-nav-more').length > 0) {
            $('.main-nav-more > ul').children().appendTo($('#main-nav'));
            $('.main-nav-more').remove();
        }
    }
    autoHideMenus();

    $(window).on('resize', function () {
        autoHideMenus();
    });

    // Fold second-level menu
    $('.main-nav-list-item').hover(function () {
        if ($(window).width() < 480) {
            return;
        }
        $(this).children('.main-nav-list-child').slideDown('fast');
    }, function () {
        if ($(window).width() < 480) {
            return;
        }
        $(this).children('.main-nav-list-child').slideUp('fast');
    });

    // Add second-level menu mark
    $('.main-nav-list-item').each(function () {
        if ($(this).find('.main-nav-list-child').length > 0) {
            $(this).addClass('top-level-menu');
        }
    });


    var bool=false; //标识是否移动元素
    var offsetX=0; //声明p在当前窗口的Left值
    var offsetY=0; //声明p在当前窗口的Top值
    $("#landlord").mouseover(function(){
        $(this).css('cursor','move');
    })

    $("#landlord").mousedown(function(){ 
        bool=true;
        offsetX = event.offsetX;
        offsetY = event.offsetY;

        //获取鼠在当前窗口的相对偏移位置的Top值并赋值给offsetY
        $(this).css('cursor','move');

    }).mouseup(function(){

        bool=false;
        //当鼠标在移动元素起来的时候将bool设定为false

    })

    $(document).mousemove(function(){
        if(!bool)//如果bool为false则返回

        return;
        //当bool为true的时候执行下面的代码

        var x = event.clientX-offsetX;

        //event.clientX得到鼠标相对于客户端正文区域的偏移

        //然后减去offsetX即得到当前推拽元素相对于当前窗口的X值

        //（减去鼠标刚开始拖动的时候在当前窗口的偏移X）

        var y = event.clientY-offsetY;

        //event.clientY得到鼠标相对于客户端正文区域的偏移

        //然后减去offsetX即得到当前推拽元素相对于当前窗口的Y值

        //（减去鼠标刚开始拖动的时候在当前窗口的偏移Y）

        $("#landlord").css("left", x);
        localStorage.setItem('live2dleft', x);

        $("#landlord").css("top", y);
        localStorage.setItem('live2dtop', y);

        $("#landlord").css('cursor','move');

    })

    $('#showLive2d').on('click', function() {
        localStorage.setItem('live2dDisplay','');
        $('#landlord').css('display', '')
        initLive2d();
    });
})(jQuery);
