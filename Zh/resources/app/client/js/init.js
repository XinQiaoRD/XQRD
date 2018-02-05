var init = {};

init.loader = ()=>{
    Dom._unable = $("#_unable");
    zh.server(init.view);
};


init.view = ()=>{
    zh.ini();
    $("#Index").show();

    init.com();
    init.index_person();

    init.person();
    init.word();

    setTimeout(function(){
        zh.ini();
        $("#Index").hide();

        zh.do();
        setTimeout(Room.Loader.ppt , 500);
    },300);



};

//首页人大代表
init.index_person = ()=>{

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

        // Dom.Index_person.on('progress', function(progress){
        //     console.log(Math.abs(Dom.Index_person_h*progress));
        // })
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
init.person = ()=>{
    let person = Base.person;
    let View_Person = _.template($("#View_Person").html());
    let $CC = $("#CC");
    let num_cn = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

    for(let i in person){
        let json = person[i].person;
        let area = Base.area_person[json.area_id];
        json.area_num = area.num;
        json.area_cn = "第"+num_cn[json.area_id]+"选区";

        json.age = jsGetAge(json.birth);
        if(json.age>80 || json.age<10) json.age = "";

        let Person_cc = View_Person(json);
        $CC.append(Person_cc);
    }

    setTimeout(()=>{
        $(".Person").show();

        // Dom.Word_content = {};
        // Dom.Word_back = {};
        // Dom.Word_news = {};
        // for(let i in word){
        //     Dom.Word_content["Word"+i] = new Swiper('#Word'+i+' .content .swiper-container', {
        //         direction: 'vertical',
        //         slidesPerView: 'auto',
        //         freeMode: true,
        //         scrollbar: {
        //             el: '#Word'+i+' .content .swiper-scrollbar',
        //         },
        //         mousewheel: true,
        //     });
        //
        //     Dom.Word_back["Word"+i] = new Swiper('#Word'+i+' .back .swiper-container', {
        //         direction: 'vertical',
        //         slidesPerView: 'auto',
        //         freeMode: true,
        //         scrollbar: {
        //             el: '#Word'+i+' .back .swiper-scrollbar',
        //         },
        //         mousewheel: true,
        //     });
        //
        //     Dom.Word_news["Word"+i] = new Swiper('#Word'+i+' .news .swiper-container', {
        //         direction: 'vertical',
        //         slidesPerView: 'auto',
        //         freeMode: true,
        //         scrollbar: {
        //             el: '#Word'+i+' .news .swiper-scrollbar',
        //         },
        //         mousewheel: true,
        //     });
        // }

        $(".Person").hide();
    },200);



};


//处理提案
init.word = ()=>{
    let word = Base.word;
    let View_Word = _.template($("#View_Word").html());
    let $CC = $("#CC");

    for(let i in word){
        let json = word[i];
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
    },200);



};

// init.swiper = (year)=>{
//     Dom.swiper = {};
//     cc.m["Index"].show();
//     Dom.swiper.HBox = new Swiper('#HBox', {
//         direction: 'vertical',
//         spaceBetween: 80,
//         longSwipesRatio:0.3,
//         on:{
//             slideChangeTransitionEnd: function(){
//
//                 let ids = this.activeIndex;
//                 $(".YearMenu").removeClass("act");
//                 $(".YearMenuId"+ids).addClass("act");
//                 Dom.swiper.DBList[ids].slideTo(0, 0, false);
//
//             }
//         },
//     });
//
//     Dom.swiper.DBList = [];
//     for(let i in year){
//         Dom.swiper.DBList[i] = new Swiper('.DBList'+year[i], {
//             slidesPerView: 2,
//             slidesPerColumn: 2,
//             longSwipesRatio:0.3,
//             spaceBetween: 30,
//             pagination: {
//                 el: '.swiper-pagination-box'+year[i],
//                 clickable: true,
//             },
//         });
//     }
//
//     cc.m["Index"].hide();
//
// };


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