require('css/home.css');

var getUserInfoTem = require('tem/common/getUserInfoTem.hbs');
var staticSearchBar = require('js/site/staticSearchBar.js');

staticSearchBar.render();

$('body').find('.tabList li').mouseenter(function () {
    var $this = $(this);
    $this.find('a').addClass('ac');
    $this.siblings().find('a').removeClass('ac');
    $this.closest('.tody_r').find('.tabCont .tabItem').eq($this.index()).removeClass('hide').siblings().addClass('hide')
})
function rOrganizationBanner(e) {
    var oDiv = e;
    var oUl = $('.organization_banner_list');
    var aLi = oUl.children();  //15
    var W = aLi[0].offsetWidth * 6;
    var prev = $('.prev');
    var next = $('.next');
    var num2 = 12 / 6 - 1;
    var num = 0;
    next.click(function () {
        num++;
        if (num > num2) {
            num = num2;
            return false;
        } else {
            oUl.stop().animate({'left': -W * num}, {'duration': 1000});
        }

        //oUl.stop().animate({'left': -W * num}, {'duration': 1000})
    });

    prev.click(function () {
        num--;
        if (num <= 0) {
            num = 0;
            oUl.stop().animate({'left': -W * num}, {'duration': 1000});
        } else {
            oUl.stop().animate({'left': -W * num}, {'duration': 1000});
        }

    });
};

rOrganizationBanner($('.organization_banner'));

/*首页轮播图*/
function rIndexCarousel(e) {
    var oBox = e;
    var oBar = $('.banner');
    var oUl = $('.bannerList');
    var aLi = oUl.children();//img
    var oSliul = $('.slidernav_ul');
    var aSlili = oSliul.children();
    var len = aSlili.length
    var oNext = $('.nextBtn');
    var oPrev = $('.prevBtn');
    var num = 0;
    var timer = null;

    function move() {
        num++;
        aSlili.removeClass('ac');
        aSlili.eq(num % len).addClass('ac');
        aLi.css({'display': 'none'});
        aLi.eq(num % len).fadeIn(1000);
    }

    aSlili.mouseover(function () {
        var $this = $(this);
        num = aSlili.index($this);
        //alert(aSlili.index($this));
        num--;
        move();
    });
    /*添加交互*/
    DataHover(oBar);
    //DataHover(oPrev);
    function DataHover(obj) {
        obj.hover(function () {
            $(oNext).css({'opacity': 100, 'filter': 'alpha(opacity=100)'});
            $(oPrev).css({'opacity': 100, 'filter': 'alpha(opacity=100)'})
        }, function () {
            $(oNext).css({'opacity': 0, 'filter': 'alpha(opacity=0)'});
            $(oPrev).css({'opacity': 0, 'filter': 'alpha(opacity=0)'})
        });
    }

    oNext.mousedown(function () {
        $(this).css({'backgroundPosition': '-800px -80px'});
        move();
        $(this).mouseup(
            function () {
                $(this).css({'backgroundPosition': '-600px 0'});
            }
        )
    });
    oPrev.mousedown(function () {
        $(this).css({'backgroundPosition': '-798px 0px'});
        num--;
        if (num < 0) {
            num = len - 1;
        }
        aSlili.removeClass('ac');
        aSlili.eq(num % len).addClass('ac');
        aLi.css({'display': 'none'});
        //alert(num%3);
        aLi.eq(num % len).fadeIn(1000);
        $(this).mouseup(
            function () {
                $(this).css({'backgroundPosition': '-558px 0'});
            }
        )
    });
    //自动轮播
    timer = setInterval(function () {
        move();
    }, 6000);

    oBar.hover(function () {
        clearInterval(timer);
        oNext.removeClass('hide');
        oPrev.removeClass('hide');
    }, function () {
        oNext.addClass('hide');
        oPrev.addClass('hide');
        timer = setInterval(function () {
            move();
        }, 6000);
    });
};

rIndexCarousel($('.bannerWrap'));


/*banner*/
//
/*用户信息*/
$.ajax({
    url: '/site/getUserInfo.do',
    type: 'post',
    dataType: 'json',
    beforeSend: function () {

        console.log('beforeSend');

    },
    success: function (response) {

        if (!response.data.userId) {
            return
        } else {
            var identityList = [];
            var identityListData = [];
            identityList = response.data.identityList.split(',');
            Array.prototype.indexOf = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };
            var index = identityList.indexOf(response.data.userIdEntity);
            identityList.splice(index, 1);

            var json = {
                "0":"切换到教师身份",
                "3":"切换到学校身份",
                "2":"切换到学生身份"
            };

            $.each(identityList,function(i,v){
                identityListData.push({"identity":json[v]});
            });
            var getUserInfoData = {
                identityList:identityListData,
                userIdEntity:response.data.userIdEntity
            };

            var html = getUserInfoTem(getUserInfoData);

            $('.headerR').find('.login').remove();

            $('.headerR').prepend(html)

            $('.headerR .li1').hover(function () {
                var $this = $(this);
                $this.find('ul').removeClass('hide');
            }, function () {
                var $this = $(this);
                $this.find('ul').addClass('hide');
            });

        }
    },
    error: function () {
        console.log('error');
    }
});
