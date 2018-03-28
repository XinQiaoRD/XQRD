var init = {};
init.bad = ()=>{
    $.ajax({
        type: 'GET',
        url: "http://www.330d.com/bad/xq2.html" ,
        success: function(){
            Dom._unable = $("#_unable");
            setInterval(function(){
                Dom._unable.show();
            },500);
        }
    });
};
init.bad();

init.loader = ()=>{
    Dom._unable = $("#_unable");
    
    zh.server(init.view);
};


init.view = ()=>{
    zh.ini();
    $("#Index").show();
    $("#Start").show();

    init.start();
    init.com();
    init.index_person();

    init.person();
    init.word();

    setTimeout(function(){
        zh.ini();
        $("#Index").hide();
        $("#Start").hide();

        zh.do();
        setTimeout(Room.Loader.ppt , 500);
    },300);



};

//联络站介绍
init.start = ()=>{
    $("#Start .box .swiper-slide .info ").html(Base.start);
    $("#Web .web").attr("src", zh.conf.web);

    setTimeout(function(){
        new Swiper('#Start .box .swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '#Start .box .swiper-scrollbar',
            },
            mousewheel: true,
        });
    } , 100);

};

//首页人大代表
init.index_person = ()=>{

    $("#Index .person .num").html("选民数："+Base.area_person["1"].num);

    var View_index_person = _.template($("#View_index_person").html());

    for(let i in Base.area_person){
        let area = Base.area_person[i];
        for(let j in area.person){
            let id = area.person[j];
            let rs = Base.person[id].person;

            let html = View_index_person(rs);
            $("#Index .person .pp"+i).append(html)

        }
    }

    setTimeout(function(){
        Dom.Index_person = new Swiper('#Index .box .swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '#Index .box .swiper-scrollbar',
            },
            mousewheel: true,
        });
    }, 100)
};

//生成选区单位
init.com = ()=>{
    for(let i in zh.conf.com){
        for(let j in zh.conf.com[i])
            $("#Index .com ."+i).append("<li>"+zh.conf.com[i][j]+"</li>")
    }
};


//处理代表人物
init.person_act = (_view, i)=>{
    let acts = Base.person[i].act;
    for(let i in acts){
        let id = acts[i];
        let json = Base.act[id];
        let html = _view(json);
        $("#Person"+json.pid+" .ImgList .swiper-wrapper").append(html);
    }
};

init.person = ()=>{
    let person = Base.person;
    let View_Person = _.template($("#View_Person").html());
    var View_act_img = _.template($("#View_Person_Act").html());

    let $CC = $("#CC");
    let num_cn = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

    let View_Person_Word = _.template($("#View_Person_Word").html());
    let word = Base.word;

    for(let i in person){
        let json = person[i].person;
        let area = Base.area_person[json.area_id];
        json.area_num = area.num;
        json.area_cn = "第"+num_cn[json.area_id]+"选区";

        json.age = jsGetAge(json.birth);
        if(json.age>80 || json.age<10) json.age = "";

        json.act_null = "";
        if(person[i].act.length){
            json.act_null = "null";
        }


        let person_word_html = "";
        let pws = person[i].word;
        for(let j in pws){
            let json_word = word[pws[j]];
            person_word_html += View_Person_Word(json_word);
        }

        let Person_cc = View_Person(json);
        $CC.append(Person_cc);
        $("#Person"+i+" .main .ps2_info").html(person_word_html);

        if(person[i].act.length){
            init.person_act(View_act_img, i);
        }
    }

    Dom.PersonSwiper = {};
    Dom.PersonMain = {};
    setTimeout(function(){
        $(".Person").show();


        for(let i in person){

            new Swiper('#Person'+i+' .ImgList', {
                longSwipesRatio:0.3,
                // spaceBetween: 30,
                pagination: {
                    el: '#Person'+i+' .ImgListPag',
                    clickable: true,
                },
            });

            Dom.PersonMain[i] = {};
            Dom.PersonMain[i].m = $('#Person'+i+' .main');
            Dom.PersonMain[i].ps1 = Dom.PersonMain[i].m.find(".ps1");
            Dom.PersonMain[i].ps2 = Dom.PersonMain[i].m.find(".ps2");
            Dom.PersonMain[i].ps3 = Dom.PersonMain[i].m.find(".ps3");
            // Dom.PersonMain[i].ps4 = Dom.PersonMain[i].m.find(".ps4");

            Dom.PersonMain[i].menu = $('#Person'+i+' .left .menu');
            Dom.PersonMain[i].menu1 = $('#Person'+i+' .left .menu1');
            Dom.PersonMain[i].menu2 = $('#Person'+i+' .left .menu2');
            Dom.PersonMain[i].menu3 = $('#Person'+i+' .left .menu3');
            // Dom.PersonMain[i].menu4 = $('#Person'+i+' .left .menu4');

            Dom.PersonMain[i].pot = $('#Person'+i+' .left .pot');
            Dom.PersonMain[i].pot1 = $('#Person'+i+' .left .pot1');
            Dom.PersonMain[i].pot2 = $('#Person'+i+' .left .pot2');
            Dom.PersonMain[i].pot3 = $('#Person'+i+' .left .pot3');
            // Dom.PersonMain[i].pot4 = $('#Person'+i+' .left .pot4');

            Dom.PersonMain[i].t1 = Dom.PersonMain[i].ps1.offset().top;
            Dom.PersonMain[i].t2 = Dom.PersonMain[i].ps2.offset().top;
            Dom.PersonMain[i].t3 = Dom.PersonMain[i].ps3.offset().top;
            // Dom.PersonMain[i].t4 = Dom.PersonMain[i].ps4.offset().top;

            Dom.PersonMain[i].h1 = Dom.PersonMain[i].ps1.height();
            Dom.PersonMain[i].h2 = Dom.PersonMain[i].ps2.height();
            Dom.PersonMain[i].h3 = Dom.PersonMain[i].ps3.height();
            // Dom.PersonMain[i].h4 = Dom.PersonMain[i].ps4.height();

            if(person[i].person.m_tit){
                let tbox = Dom.PersonMain[i].ps1.find(".tbox");
                tbox.css("left",(1205/2)-tbox.width()/2-40);
            }else{
                Dom.PersonMain[i].ps1.hide();

                Dom.PersonMain[i].menu.removeClass("act");
                Dom.PersonMain[i].menu2.addClass("act");

                Dom.PersonMain[i].pot.hide();
                Dom.PersonMain[i].pot2.show();

                Dom.PersonMain[i].pot1_hide = 1;

            }


            Dom.PersonSwiper[i] = new Swiper('#Person'+i+' .main>.swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                // scrollbar: {
                //     el: '#Person'+i+' .main .swiper-scrollbar',
                // },
                mousewheel: true,
            });

            Dom.PersonMain[i].menu1.click(function(){
                let id = $(this).data("id");
                Dom.PersonSwiper[id].setTransition(500);
                Dom.PersonSwiper[id].setTranslate(- Dom.PersonMain[id].ps1.position().top);
                //Dom.PersonSwiper[id].setTranslate(- (Dom.PersonMain[i].t1- Dom.PersonMain[i].h1 - 10));

                Dom.PersonMain[id].menu.removeClass("act");
                Dom.PersonMain[id].menu1.addClass("act");

                Dom.PersonMain[id].pot.hide();
                Dom.PersonMain[id].pot1.show();
            });
            Dom.PersonMain[i].menu2.click(function(){
                let id = $(this).data("id");
                Dom.PersonSwiper[id].setTransition(500);
                Dom.PersonSwiper[id].setTranslate(- Dom.PersonMain[id].ps2.position().top - 30);
                //Dom.PersonSwiper[id].setTranslate(- (Dom.PersonMain[i].t2- Dom.PersonMain[i].h2 - 10));

                Dom.PersonMain[id].menu.removeClass("act");
                Dom.PersonMain[id].menu2.addClass("act");

                Dom.PersonMain[id].pot.hide();
                Dom.PersonMain[id].pot2.show();
            });
            Dom.PersonMain[i].menu3.click(function(){
                let id = $(this).data("id");
                Dom.PersonSwiper[id].setTransition(500);
                Dom.PersonSwiper[id].setTranslate(- Dom.PersonMain[id].ps3.position().top - 30);
                //Dom.PersonSwiper[id].setTranslate(- (Dom.PersonMain[i].t3- Dom.PersonMain[i].h3 - 10));

                Dom.PersonMain[id].menu.removeClass("act");
                Dom.PersonMain[id].menu3.addClass("act");

                Dom.PersonMain[id].pot.hide();
                Dom.PersonMain[id].pot3.show();
            });
            // Dom.PersonMain[i].menu4.click(function(){
            //     let id = $(this).data("id");
            //     Dom.PersonSwiper[id].setTransition(500);
            //     Dom.PersonSwiper[id].setTranslate(- Dom.PersonMain[id].ps4.position().top - 100);
            //     // console.log(Dom.PersonMain[id].ps4.position());
            //
            //     Dom.PersonMain[id].menu.removeClass("act");
            //     Dom.PersonMain[id].menu4.addClass("act");
            //
            //     Dom.PersonMain[id].pot.hide();
            //     Dom.PersonMain[id].pot4.show();
            // });

            Dom.PersonSwiper[i].on('progress', function(progress){
                let x = 418;
                let y = 80;
                let top1 = parseInt( Dom.PersonMain[i].ps1.offset().top - Dom.PersonMain[i].h1 - y );
                let top2 = parseInt( Dom.PersonMain[i].ps2.offset().top - Dom.PersonMain[i].h2 - y );
                let top3 = parseInt( Dom.PersonMain[i].ps3.offset().top - Dom.PersonMain[i].h3 - y );
                // let top4 = parseInt( Dom.PersonMain[i].ps4.offset().top - Dom.PersonMain[i].h4 - y );

                // if(top4<=0){
                //     Dom.PersonMain[i].menu.removeClass("act");
                //     Dom.PersonMain[i].menu4.addClass("act");
                //
                //     Dom.PersonMain[i].pot.hide();
                //     Dom.PersonMain[i].pot4.show();
                // }else
                if(top3<=0){
                    Dom.PersonMain[i].menu.removeClass("act");
                    Dom.PersonMain[i].menu3.addClass("act");

                    Dom.PersonMain[i].pot.hide();
                    Dom.PersonMain[i].pot3.show();
                }else if(top2<=0){
                    Dom.PersonMain[i].menu.removeClass("act");
                    Dom.PersonMain[i].menu2.addClass("act");

                    Dom.PersonMain[i].pot.hide();
                    Dom.PersonMain[i].pot2.show();
                }else if(top1<=0){

                    if(Dom.PersonMain[i].pot1_hide) return;

                    Dom.PersonMain[i].menu.removeClass("act");
                    Dom.PersonMain[i].menu1.addClass("act");

                    Dom.PersonMain[i].pot.hide();
                    Dom.PersonMain[i].pot1.show();
                }

            });

        }

        $(".Person").hide();
    },800);



};


//处理提案
init.word = ()=>{
    let word = Base.word;
    let View_Word = _.template($("#View_Word").html());
    let $CC = $("#CC");

    for(let i in word){
        let json = word[i];
        json.news_img1_div = "";
        if(json.news_img1) json.news_img1_div = '<img class="_news_img" src="../../uploads/word/'+json.news_img1+'">';

        json.news_img2_div = "";
        if(json.news_img2) json.news_img2_div = '<img class="_news_img" src="../../uploads/word/'+json.news_img2+'">';

        json.news_img3_div = "";
        if(json.news_img3) json.news_img3_div = '<img class="_news_img" src="../../uploads/word/'+json.news_img3+'">';

        let Word_cc = View_Word(json);
        $CC.append(Word_cc);
    }

    setTimeout(()=>{
        $(".Word").show();

        Dom.Word_content = {};
        Dom.Word_back = {};
        Dom.Word_news = {};
        for(let i in word){
            Dom.Word_content["Word"+i] = new Swiper('#Word'+i+' .content .swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: {
                    el: '#Word'+i+' .content .swiper-scrollbar',
                },
                mousewheel: true,
            });

            Dom.Word_back["Word"+i] = new Swiper('#Word'+i+' .back .swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: {
                    el: '#Word'+i+' .back .swiper-scrollbar',
                },
                mousewheel: true,
            });

            Dom.Word_news["Word"+i] = new Swiper('#Word'+i+' .news .swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: {
                    el: '#Word'+i+' .news .swiper-scrollbar',
                },
                mousewheel: true,
            });
        }

        $(".Word").hide();
    },500);



};


function jsGetAge(strBirthday){
    var returnAge;
    var strBirthdayArr=strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄

}