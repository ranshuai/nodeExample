/**
 * Created by bbb on 2015/12/8.
 */
define(['jquery'], function ($) {

    function siteSearchBar() {
        this.$Sercher = $('#sercher');
        this.$search_input = $('#search_input');
    }
    /*搜索框下面的热门词汇此功能取消*/
    siteSearchBar.prototype.hotData = function () {

    };
    /*
     搜索框
     */
    siteSearchBar.prototype.sercher = function () {
        var seltype = $(".searchList li.ac").text();
        //console.log(seltype);
        var data = $(".searchInp input").val();
        var seldata = encodeURI(encodeURI(data));
        if($.trim(data)==''){
            return;
        }
        if (seltype == "一对一") {
            window.location.href = "/site/course/selectCourse1.htm?courseTitle=" + seldata;
        }
        else if (seltype == "知名品牌") {
            window.location.href = "/site/selectschool.htm?orgname=" + seldata+"&flag=search" ;

        }
        else if (seltype == "教师") {
            window.location.href = "/site/selectteacher.htm?name=" + seldata;
        }
        else if (seltype == "讲作业") {
            window.location.href = "/site/toselectPtCourse.htm?theme=" + seldata + "&type=hw";
        }
        else if (seltype == "课海") {
            window.location.href = "/site/toselectVideoCourse.htm?theme=" + seldata;
        }
        else if (seltype == "旁听"){
            window.location.href = "/site/toselectPtCourse.htm?theme=" + seldata + "&type=pt&flag=search";
        }
        else if (seltype == "辅导班"){
            window.location.href = "/site/selectBk.htm?bktitle=" + seldata+"&flag=search" ;
        }
    };

    siteSearchBar.prototype.bindEvent = function () {
        var t = this;
        t.$Sercher.on('click', function (event) {
            t.sercher();
        });
        t.$search_input.on('keydown', function (event) {
            var theEvent = event || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                t.sercher();
                return false;
            }
            return true;
        });

    };
    siteSearchBar.prototype._init = function () {
        var t = this;
        t.bindEvent();
    };
    siteSearchBar.prototype.render = function () {
        this._init();
        $('.searchList li').click(function(){
            $(this).addClass('ac').siblings('li').removeClass('ac');
        });
    };
    return new siteSearchBar();
});