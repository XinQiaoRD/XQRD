Room.Loader = {};
Room.Loader.ppt = ()=>{
    let Start = "Index";
    cc.ppt(["Loader", Start] , (after)=>{
        cc.m["Loader"].velocity({ opacity: 0 }, { duration: 1000, display:"none"} );
        cc.m[Start].show().velocity({ opacity: [1,0] }, 1000);
    })
};

// Index
Room.Index = {};
Room.Index.dom = ()=>{

    Dom.Index_btn = 0;
    Dom.Index_btn_act = 0;

    Room.Index.map(1);

    $$("#Index .map_btn .btn1").click(function(){
        Room.Index.map(1);
    });
    $$("#Index .map_btn .btn2").click(function(){
        Room.Index.map(2);
    });
    $$("#Index .map_btn .btn3").click(function(){
        Room.Index.map(3);
    });
    $$("#Index .map_btn .btn4").click(function(){
        Room.Index.map(4);
    });
    $$("#Index .map_btn .btn5").click(function(){
        Room.Index.map(5);
    });
    $$("#Index .map_btn .btn6").click(function(){
        Room.Index.map(6);
    });
    $$("#Index .map_btn .btn7").click(function(){
        Room.Index.map(7);
    });
    $$("#Index .map_btn .btn8").click(function(){
        Room.Index.map(8);
    });

    $$("#Index .person ._person").click(function(){
        let id = $(this).data("id");
        Room.Index.person(id);
    });

};

Room.Index.map = (i)=>{
    if(Dom.Index_btn) return;
    if(Dom.Index_btn_now == i) return;
    Dom.Index_btn = 1;
    Dom.Index_btn_now = i;
    $("#Index .map .map_act").velocity("stop");
    $("#Index .map .map_act"+Dom.Index_btn_act).velocity({ opacity: 0 }, { duration: 300} );
    $("#Index .map .map_act"+i).velocity({ opacity: 1 }, { duration: 300} );
    Dom.Index_btn_act = i;

    $("#Index .com .cs").hide();
    $("#Index .com .c"+i).show();

    $("#Index .person .pp").hide().css({"margin-left":0}).removeClass("act");
    $("#Index .person .pp"+i).show().addClass("act");

    Dom.Index_person.update();
    Dom.Index_person.updateProgress();

    if($("#Index .person .pp.act li").length==1) {
        $("#Index .person .pp.act").css({"margin-left":110})
    }

    if($("#Index .person .pp.act li").length<=2) {
        $("#Index .person").css({height:350})
    }else{
        $("#Index .person").css({height:565})
    }

    $("#Index .person .num").html("选民数："+Base.area_person[i].num);

    setTimeout(function(){
        Dom.Index_btn = 0;
    },300);
};


Room.Index.person = (id)=>{
    Dom._unable.show();
    let Page = "Person"+id;
    cc.ppt([cc.id, Page, "", "Person"] , (after)=>{
        //cc.m[cc.old].velocity({ opacity: 0 }, { duration: 500, display:"none"});
        cc.m[Page].show().velocity({ opacity: [1,0] }, 100, ()=>{
            after.come();
        });
    });

};