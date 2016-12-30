
module.exports = function(n,arr,options){

    var json = {
        "0":"切换到教师身份",
        "3":"切换到学校身份",
        "2":"切换到学生身份"
    };

    return json[n];
}