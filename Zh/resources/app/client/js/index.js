Room.Loader = {};
Room.Loader.ppt = ()=>{
    let Start = "Start";
    cc.ppt(["Loader", Start, "", "X"] , (after)=>{
        cc.m["Loader"].velocity({ opacity: 0 }, { duration: 1000, display:"none"} );
        cc.m[Start].show().velocity({ opacity: [1,0] }, 1000);
    })
};

// Index
Room.Index = {};
Room.Index.dom = ()=>{

    $("#Index .next_pot").velocity({ translateY:[5,0] }, { easing:"linear", duration: 300, loop: true});
    new HammerHand("#Index .next_btn", {
        "up":()=> {
            Room.Index.ppt_back();
        }
    });

    Dom.Index_btn = 0;
    Dom.Index_btn_act = 0;

    Room.Index.map(1);

    $$("#Index .map_btn .btn1").click(function(){
        $$("#Index .person .tit").html("第一选区");
        Room.Index.map(1);
    });
    $$("#Index .map_btn .btn2").click(function(){
        $$("#Index .person .tit").html("第二选区");
        Room.Index.map(2);
    });
    $$("#Index .map_btn .btn3").click(function(){
        $$("#Index .person .tit").html("第三选区");
        Room.Index.map(3);
    });
    $$("#Index .map_btn .btn4").click(function(){
        $$("#Index .person .tit").html("第四选区");
        Room.Index.map(4);
    });
    $$("#Index .map_btn .btn5").click(function(){
        $$("#Index .person .tit").html("第五选区");
        Room.Index.map(5);
    });
    $$("#Index .map_btn .btn6").click(function(){
        $$("#Index .person .tit").html("第六选区");
        Room.Index.map(6);
    });
    $$("#Index .map_btn .btn7").click(function(){
        $$("#Index .person .tit").html("第七选区");
        Room.Index.map(7);
    });
    $$("#Index .map_btn .btn8").click(function(){
        $$("#Index .person .tit").html("第八选区");
        Room.Index.map(8);
    });

    $$("#Index .person ._person").click(function(){
        let id = $(this).data("id");
        Room.Index.person(id);
    });

    $$("#Index .next_btn").click(()=>{
        Room.Index.ppt_back();
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
    cc.ppt([cc.id, Page, "X", "Person"] , (after)=>{
        //cc.m[cc.old].velocity({ opacity: 0 }, { duration: 500, display:"none"});
        cc.m[Page].show().velocity({ opacity: [1,0] }, 100, ()=>{
            after.come();
        });
    });

};
Room.Index.ppt_back = ()=>{
    Dom._unable.show();
    cc.ppt([cc.id, "Start"] , (after)=>{
        cc.m[cc.old].velocity({ translateY:[-1080,0] }, { duration: 300, display:"none", delay:50});
        cc.m[ "Start"].velocity({ translateY:1080 }, 0 ).show().velocity({ translateY:[0,1000] }, { duration: 300, complete:()=>{
                after.come();
            }});
    });
};
Room.Index.come_before = (next)=>{
    $$("#Index .logo").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Index .person").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Index .map_pot").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Index .com").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Index ._link").velocity({ translateY:1080 }, {duration: 0} );
    cc.m[ "Index"].velocity({ translateY:1080 }, {duration: 10, complete:function(){
            next();
        }} );
};
Room.Index.coming = ()=>{
    $$("#Index .logo").velocity({ translateY:-30 }, {duration: 200, delay:200} ).velocity({ translateY:0 }, {duration: 200} );
};
Room.Index.come_after = ()=>{
    let time = 230;
    $$("#Index .person").velocity({ translateY:-30 }, {duration: time} ).velocity({ translateY:0 }, {duration: time} );
    $$("#Index .map_pot").velocity({ translateY:-15 }, {duration: time, delay:100} ).velocity({ translateY:0 }, {duration: time} );
    $$("#Index .com").velocity({ translateY:-20 }, {duration: time+100, delay:230} ).velocity({ translateY:0 }, {duration: time+50} );
    $$("#Index ._link").velocity({ translateY:-20 }, {duration: time+230, delay:330} ).velocity({ translateY:0 }, {duration: time+100, complete:()=>{
            Dom._unable.hide();
        }} );
};
Room.Index.go_before = function(next){
    let time = 150;
    let delay = 100;
    $$("#Index .logo").velocity({ translateY:[30,0] }, {duration: time}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Index .person").velocity({ translateY:[30,0] }, {duration: time, delay:delay*1}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Index .map_pot").velocity({ translateY:[30,0] }, {duration: time, delay:delay*2}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Index .com").velocity({ translateY:[30,0] }, {duration: time, delay:delay*3}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Index ._link").velocity({ translateY:[30,0] }, {duration: time, delay:delay*4}).velocity({ translateY:[-1000,0] }, {duration: time, complete:function(){
            next();
        }});

};


//Start
Room.Start = {};
Room.Start.dom = ()=>{
    $("#Start .next_pot").velocity({ translateY:[5,0] }, { easing:"linear", duration: 300, loop: true});
    new HammerHand("#Start .next_btn", {
        "up":()=> {
            Room.Start.ppt()
        }
    });

    $$("#Start .next_btn").click(()=>{
        Room.Start.ppt();
    });
};
Room.Start.ppt = ()=>{
    Dom._unable.show();
    cc.ppt([cc.id, "Index"] , (after)=>{
        cc.m[cc.old].velocity({ translateY:[-1080,0] }, { duration: 300, display:"none", delay:50});
        cc.m[ "Index"].velocity({ translateY:1080 }, 0 ).show().velocity({ translateY:[0,1000] }, { duration: 300, complete:()=>{
                after.come();
            }});
    });
};
Room.Start.coming = ()=>{
    $$("#Start .tit").velocity({ translateY:-30 }, {duration: 200, delay:200} ).velocity({ translateY:0 }, {duration: 200} );
};
Room.Start.come_after = ()=>{
    let time = 230;
    $$("#Start .pic").velocity({ translateY:-30 }, {duration: time} ).velocity({ translateY:0 }, {duration: time} );
    $$("#Start .box").velocity({ translateY:-15 }, {duration: time, delay:100} ).velocity({ translateY:0 }, {duration: time} );
    $$("#Start ._link").velocity({ translateY:-20 }, {duration: time+100, delay:230} ).velocity({ translateY:0 }, {duration: time+50, complete:()=>{
            Dom._unable.hide();
        }} );
};
Room.Start.come_before = function(next){
    $$("#Start .tit").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Start .pic").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Start .box").velocity({ translateY:1080 }, {duration: 0} );
    $$("#Start ._link").velocity({ translateY:1080 }, {duration: 0} );
    cc.m[ "Start"].velocity({ translateY:1080 }, {duration: 10, complete:function(){
            next();
        }} );

};
Room.Start.go_before = function(next){
    let time = 150;
    let delay = 100;
    $$("#Start .tit").velocity({ translateY:[30,0] }, {duration: time}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Start .pic").velocity({ translateY:[30,0] }, {duration: time, delay:delay*1}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Start .box").velocity({ translateY:[30,0] }, {duration: time, delay:delay*2}).velocity({ translateY:[-1000,0] }, {duration: time});
    $$("#Start ._link").velocity({ translateY:[30,0] }, {duration: time, delay:delay*3}).velocity({ translateY:[-1000,0] }, {duration: time, complete:function(){
            next();
        }});

};


// Web
Room.Web = {};
Room.Web.dom = ()=>{
    $$("._link").click(function(){

        Room.Web.ppt_come();
    });

    $$("#Web .bg").click(function(){
        Room.Web.ppt_go();
    });
    $$("#Web .cls").click(function(){
        Room.Web.ppt_go();
    });
};
Room.Web.ppt_come = ()=>{
    cc.ppt([cc.id, "Web", "X"] , (after)=>{
        cc.m["Web"].show().velocity({ opacity: [1,0] }, {duration: 500, complete:function(){
                webview.loadURL(zh.conf.web);
            }});
    })
};
Room.Web.ppt_go = ()=>{
    cc.ppt([cc.id, "Start", "", "X"] , (after)=>{
        cc.m["Web"].velocity({ opacity: 0 }, { duration: 500, display:"none"} );
    })
};