Room.Person = {};
Room.Person.dom = ()=> {
    $$(".Person .cls").click(function () {
        let id = $(this).data("id");
        Person_reset(id);
        Room.Person.back(id);
    });

    $$(".Person .bgx").click(function () {
        let id = $(this).data("id");
        Person_reset(id);
        Room.Person.back(id);
    });

    $$(".Person .ps1_btn").click(function () {
        let id = $(this).data("id");
        $$("#Person" + id + " .ps1 .tinfo").css({"height": "auto", "overflow": "auto"});
        $$(".Person .ps1_btn").hide();
        Dom.PersonSwiper[id].update();
    });

    $$("._word_btn").click(function () {
        let id = $(this).data("id");
        Room.Person.word(id);
    });


    function Person_reset(id) {
        $$("#Person" + id + " .ps1 .tinfo").css({"height": 240, "overflow": "hidden"});
        $$(".Person .ps1_btn").show();
        Dom.PersonSwiper[id].update();
        Dom.PersonSwiper[id].slideTo(0, 0, false);
        if (Dom.PersonMain[id].pot1_hide) {
            Dom.PersonMain[id].menu.removeClass("act");
            Dom.PersonMain[id].menu2.addClass("act");

            Dom.PersonMain[id].pot.hide();
            Dom.PersonMain[id].pot2.show();
        } else {
            Dom.PersonMain[id].menu.removeClass("act");
            Dom.PersonMain[id].menu1.addClass("act");

            Dom.PersonMain[id].pot.hide();
            Dom.PersonMain[id].pot1.show();
        }
    }
};
Room.Person.come_before = (next)=>{
    let $box = cc.m[cc.id].find(".box");
    $box.velocity({ translateY: 940 }, { duration: 0});

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

Room.Person.word = (id)=>{
    Dom.Person_Back = cc.id;
    Dom._unable.show();
    cc.ppt([cc.id, "Word"+id, "", "Word"] , (after)=>{
        cc.m[cc.id].show().velocity({ opacity: [1,0] }, 100, ()=>{
            after.come();
        });
    });
};
