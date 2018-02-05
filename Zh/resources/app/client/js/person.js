Room.Person = {};
Room.Person.dom = ()=>{
    $$(".Person .cls").click(function(){
        let id = $(this).data("id");
        Room.Word.back(id);
    });

    $$(".Person .bgx").click(function(){
        let id = $(this).data("id");
        Room.Word.back(id);
    });
//
//     $$(".Word .btn1").click(function(){
//
//         let id = $(this).data("id");
//
//         if(Dom.Word_btn==1) return;
//         $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
//         $$("#Word"+id+" .act1").velocity({ translateX: 0 }, { duration: 200});
//         Dom.Word_btn = 1;
//
//
//         $$("#Word"+id+" .main.content").show();
//         $$("#Word"+id+" .main.back").hide();
//         $$("#Word"+id+" .main.news").hide();
//
//     });
//
//     $$(".Word .btn2").click(function(){
//
//         let id = $(this).data("id");
//
//         if(Dom.Word_btn==2) return;
//         $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
//         $$("#Word"+id+" .act2").velocity({ translateX: 0 }, { duration: 200});
//         Dom.Word_btn = 2;
//
//         $$("#Word"+id+" .main.content").hide();
//         $$("#Word"+id+" .main.back").show();
//         $$("#Word"+id+" .main.news").hide();
//     });
//
//     $$(".Word .btn3").click(function(){
//
//         let id = $(this).data("id");
//
//         if(Dom.Word_btn==3) return;
//         $$("#Word"+id+" .act"+Dom.Word_btn).velocity({ translateX: 200 }, { duration: 200});
//         $$("#Word"+id+" .act3").velocity({ translateX: 0 }, { duration: 200});
//         Dom.Word_btn = 3;
//
//         $$("#Word"+id+" .main.content").hide();
//         $$("#Word"+id+" .main.back").hide();
//         $$("#Word"+id+" .main.news").show();
//     });
};
Room.Person.come_before = (next)=>{
    let $box = cc.m[cc.id].find(".box");
    // let $act1 = cc.m[cc.id].find(".act1");
    // let $act2 = cc.m[cc.id].find(".act2");
    // let $act3 = cc.m[cc.id].find(".act3");
    //
    $box.velocity({ translateY: 940 }, { duration: 0});
    // $act1.velocity({ translateX: 0 }, { duration: 0});
    // $act2.velocity({ translateX: 200 }, { duration: 0});
    // $act3.velocity({ translateX: 200 }, { duration: 0});
    //
    // cc.m[cc.id].find(".main.content").show();
    // cc.m[cc.id].find(".main.back").hide();
    // cc.m[cc.id].find(".main.news").hide();
    //
    // Dom.Word_btn = 1;
    //
    // Dom.Word_content[cc.id].slideTo(0, 1000, false);
    // Dom.Word_back[cc.id].slideTo(0, 1000, false);
    // Dom.Word_news[cc.id].slideTo(0, 1000, false);

    next();
};
Room.Person.coming = ()=>{
    let $box = cc.m[cc.id].find(".box");
    $box.velocity({ translateY: 0 }, { duration: 220});
};
Room.Person.come_after= ()=>{
    Dom._unable.hide();
};

Room.Person.going= ()=>{
    let $box = cc.m[cc.old].find(".box");
    $box.velocity({ translateY: 940 }, { duration: 220});
};

Room.Person.back = (id)=>{
    Dom._unable.show();
    cc.ppt([cc.id, "Index", "Person"] , (after)=>{
        cc.m[cc.old].velocity({ opacity: 0 }, { duration: 300, display:"none", complete:()=>{
                Dom._unable.hide();
            }});
    });
};
