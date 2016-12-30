
const fs = require('fs')
const path = require('path')
const commonPath = require('../nodePath.js')
const request = require('request')
const handlebars = require('handlebars');

const SRC_PATH = path.resolve(__dirname,'../src');

var indexTemplate = '';

handlebars.registerHelper("addOne", function (index, options) {
    return parseInt(index) + 1;
})
handlebars.registerHelper("compare", function (left, operator, right, options) {
    if (arguments.length < 3) {
        throw new Error('Handlerbars Helper "compare" needs 3 parameters');
    }
    var operators = {
        '==':     function(l, r) {return l == r; },
        '===':    function(l, r) {return l === r; },
        '!=':     function(l, r) {return l != r; },
        '!==':    function(l, r) {return l !== r; },
        '<':      function(l, r) {return l < r; },
        '>':      function(l, r) {return l > r; },
        '<=':     function(l, r) {return l <= r; },
        '>=':     function(l, r) {return l >= r; },
        'typeof': function(l, r) {return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
    }

    var result = operators[operator](left, right);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
handlebars.registerHelper("fmoney", function (s, n, options) {
    s = s / 100;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return "￥" + t.split("").reverse().join("") + "." + r;
    // return t.split("").reverse().join("") + "." + r;
});

var bodyData = {};
var headTem = require(path.resolve(SRC_PATH,'tem/common/head.hbs'));
var bodyTem = require(path.resolve(SRC_PATH,'tem/common/body.hbs'));
var footTem = require(path.resolve(SRC_PATH,'tem/common/foot.hbs'));

indexView(headTem(), function () {
    bodyView();
});
function bodyView() {

    loadIndex(bodyData)

    function loadIndex(bodyData) {
        request(commonPath.http+'/site/loadIndexData.do', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var init = {init: result.data};
                bodyData = Object.assign(bodyData, init)
                newJoinOrg(bodyData);
            }
        });
    }

    function newJoinOrg(bodyData) {
        request(commonPath.http+'/site/newJoinOrg.r', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var newJoinOrg = {newJoinOrg: result.data};
                bodyData = Object.assign(bodyData, newJoinOrg)
                today1(bodyData);
            }else{
                today1(bodyData);
            }
        });
    }

    /*今日推荐 数学*/
    function today1(bodyData) {
        request(commonPath.http+'/site/index/selectterdayCourBysubjectId.r?subjectId=10011', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var today1 = {today1: result.data};
                bodyData = Object.assign(bodyData, today1)
                today2(bodyData);
            }else{
                today2(bodyData);
            }
        });
    }

    /*今日推荐 英语*/
    function today2(bodyData) {
        request(commonPath.http+'/site/index/selectterdayCourBysubjectId.r?subjectId=10012', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var today2 = {today2: result.data};
                bodyData = Object.assign(bodyData, today2)
                today3(bodyData);
            }else{
                today3(bodyData);
            }
        });

    }

    /*今日推荐 物理*/
    function today3(bodyData) {
        request(commonPath.http+'/site/index/selectterdayCourBysubjectId.r?subjectId=10014', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var today3 = {today3: result.data};
                bodyData = Object.assign(bodyData, today3)
                today4(bodyData);
            }else{
                today4(bodyData);
            }
        });

    }

    /*今日推荐 化学*/
    function today4(bodyData) {
        request(commonPath.http+'/site/index/selectterdayCourBysubjectId.r?subjectId=10015', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var today4 = {today4: result.data};
                bodyData = Object.assign(bodyData, today4)
                good1(bodyData);
            }else{
                good1(bodyData);
            }
        });

    }

    /*热们课程 数学*/
    function good1(bodyData) {
        request(commonPath.http+'/site/hotCourse/10011.r', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var good1 = {good1: result.data};
                bodyData = Object.assign(bodyData, good1)
                good2(bodyData);
            }else{
                good2(bodyData);
            }
        });
    }

    /*热们课程 英语*/
    function good2(bodyData) {
        request(commonPath.http+'/site/hotCourse/10012.r', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var good2 = {good2: result.data};
                bodyData = Object.assign(bodyData, good2)
                good3(bodyData);
            }else{
                good3(bodyData);
            }
        });

    }

    /*热们课程 物理*/
    function good3(bodyData) {
        request(commonPath.http+'/site/hotCourse/10014.r', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var good3 = {good3: result.data};
                bodyData = Object.assign(bodyData, good3)
                good4(bodyData);
            }else{
                good4(bodyData);
            }
        });

    }

    /*热们课程 化学*/
    function good4(bodyData) {
        request(commonPath.http+'/site/hotCourse/10015.r', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var good4 = {good4: result.data};
                bodyData = Object.assign(bodyData, good4)
                // banners(bodyData)

                indexView(bodyTem(bodyData), function () {
                    indexView(footTem())
                });
            }else{
                indexView(bodyTem(bodyData), function () {
                    indexView(footTem())
                });
            }
        });
    }

    /*banner*/
    function banners(bodyData) {
        request(commonPath.http+'/site/advertising.do', function (error, response, body) { //协议
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                var banners = {banners: result.data};
                bodyData = Object.assign(bodyData, banners)
                testGetUserInfo(bodyData);
            }
        });
    }
}
function indexView(template, callback) {
    indexTemplate += template;
    callback && callback();
    fs.writeFileSync(path.resolve(SRC_PATH,'tem/nodeTem/index.html'), indexTemplate);
}
