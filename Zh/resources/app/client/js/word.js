Room.Word = {};
Room.Word.dom = ()=>{
    $$(".Word .cls").click(function(){
        let id = $(this).data("id");
        Room.Word.back(id);
    });

    $$(".Word .bgx").click(function(){
        let id = $(this).data("id");
        Room.Word.back(id);
    });

    $$(".Word .btn1").click(function(){

        let id = $(this).data("id");

        if(Dom.Word_btn==1) return;
        $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
        $$("#Word"+id+" .act1").velocity({ translateX: 0 }, { duration: 200});
        Dom.Word_btn = 1;


        $$("#Word"+id+" .main.content").show();
        $$("#Word"+id+" .main.back").hide();
        $$("#Word"+id+" .main.news").hide();

    });

    $$(".Word .btn2").click(function(){

        let id = $(this).data("id");

        if(Dom.Word_btn==2) return;
        $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
        $$("#Word"+id+" .act2").velocity({ translateX: 0 }, { duration: 200});
        Dom.Word_btn = 2;

        $$("#Word"+id+" .main.content").hide();
        $$("#Word"+id+" .main.back").show();
        $$("#Word"+id+" .main.news").hide();
    });

    $$(".Word .btn3").click(function(){

        let id = $(this).data("id");

        if(Dom.Word_btn==3) return;
        $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
        $$("#Word"+id+" .act3").velocity({ translateX: 0 }, { duration: 200});
        Dom.Word_btn = 3;

        $$("#Word"+id+" .main.content").hide();
        $$("#Word"+id+" .main.back").hide();
        $$("#Word"+id+" .main.news").show();
    });
};
Room.Word.come_before = (next)=>{
    let $box = cc.m[cc.id].find(".box");
    let $act1 = cc.m[cc.id].find(".act1");
    let $act2 = cc.m[cc.id].find(".act2");
    let $act3 = cc.m[cc.id].find(".act3");

    $box.velocity({ translateY: 940 }, { duration: 0});
    $act1.velocity({ translateX: 0 }, { duration: 0});
    $act2.velocity({ translateX: 200 }, { duration: 0});
    $act3.velocity({ translateX: 200 }, { duration: 0});

    cc.m[cc.id].find(".main.content").show();
    cc.m[cc.id].find(".main.back").hide();
    cc.m[cc.id].find(".main.news").hide();

    Dom.Word_btn = 1;

    Dom.Word_content[cc.id].slideTo(0, 1000, false);
    Dom.Word_back[cc.id].slideTo(0, 1000, false);
    Dom.Word_news[cc.id].slideTo(0, 1000, false);

    next();
};
Room.Word.coming = ()=>{
    let $box = cc.m[cc.id].find(".box");
    $box.velocity({ translateY: 0 }, { duration: 220});
};
Room.Word.come_after= ()=>{
    Dom._unable.hide();
};

Room.Word.going= ()=>{
    let $box = cc.m[cc.old].find(".box");
    $box.velocity({ translateY: 940 }, { duration: 220});
};

Room.Word.back = (id)=>{
    Dom._unable.show();
    cc.ppt([cc.id, "Index", "Word"] , (after)=>{
        cc.m[cc.old].velocity({ opacity: 0 }, { duration: 300, display:"none", complete:()=>{
                Dom._unable.hide();
            }});
    });
};






// Room.Loader = {};
// Room.Loader.ppt = ()=>{
//     let Start = "Index";
//     cc.ppt(["Loader", Start] , (after)=>{
//         cc.m["Loader"].velocity({ opacity: 0 }, { duration: 1000, display:"none"} );
//         cc.m[Start].show().velocity({ opacity: [1,0] }, 1000);
//     })
// };
//
// // Index
// Room.Index = {};
// Room.Index.dom = ()=>{
//
//     $$("#HBoxMenu .YearMenu").click(function(){
//
//         let id = $(this).data("id");
//         let time = Math.abs(parseInt(Dom.swiper.HBox.activeIndex)-id)*260+260;
//         Dom.swiper.HBox.slideTo(id, time, false);
//
//         $(".YearMenu").removeClass("act");
//         $(".YearMenuId"+id).addClass("act");
//
//         Dom.swiper.DBList[id].slideTo(0, 0, false);
//     });
//
//     $$("#HBoxMenu .bot").click(()=>{
//         let time = parseInt(Dom.swiper.HBox.activeIndex)*260+260;
//
//         Dom.swiper.HBox.slideTo(0, time, false);
//         $(".YearMenu").removeClass("act");
//         $(".YearMenuId0").addClass("act");
//
//         Dom.swiper.DBList[0].slideTo(0, 0, false);
//     });
//
//     $$("#Index ._yearBox .pre").click(function(){
//         let id = $(this).data("id");
//         Dom.swiper.DBList[id].slidePrev();
//     });
//
//     $$("#Index ._yearBox .next").click(function(){
//         let id = $(this).data("id");
//         Dom.swiper.DBList[id].slideNext();
//     });
//
// };
//
// Room.Index.ppt = ()=>{
//     Dom._unable.show();
//     cc.ppt([cc.id, "Video"] , (after)=>{
//         cc.m[cc.old].velocity({ opacity: 0 }, { duration: 1000, display:"none"});
//         cc.m["Video"].show().velocity({ opacity: [1,0] }, 1000, ()=>{
//             after.come();
//             Dom._unable.hide();
//         });
//     });
//
// };