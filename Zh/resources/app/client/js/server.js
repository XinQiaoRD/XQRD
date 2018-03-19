var Progress = function(num){
    Log("$$$$【Server.loader】目前完成："+num+"%");
    if(num==100) num=99;
    $$("#Loader .word").html("正在更新资料中，已完成："+num+"%");
};

var Download ={};
Download.down = function(){

    var serv = zh.conf.server+"/uploads/person/";
    var local = Url.fs+"uploads/person/";
    
    for(var i in Base.person){
        var p = Base.person[i];
        var rs = p.person;
        if(rs.head) Server.save(serv , local, rs.head, rs.head_size);
        if(rs.photo) Server.save(serv , local, rs.photo, rs.photo_size);
    }

    serv = zh.conf.server+"/uploads/word/";
    local = Url.fs+"uploads/word/";

    for(var i in Base.word){
        var rs = Base.word[i];
        if(rs.news_img1) Server.save(serv , local, rs.news_img1, rs.news_img1_size);
        if(rs.news_img2) Server.save(serv , local, rs.news_img2, rs.news_img2_size);
        if(rs.news_img3) Server.save(serv , local, rs.news_img3, rs.news_img3_size);
    }

    serv = zh.conf.server+"/uploads/act/";
    local = Url.fs+"uploads/act/";

    for(var i in Base.act){
        var rs = Base.act[i];
        if(rs.pic) Server.save(serv , local, rs.pic, rs.pic_size);
    }

};