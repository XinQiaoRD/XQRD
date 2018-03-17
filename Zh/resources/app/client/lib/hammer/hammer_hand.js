function HammerHand(id, pa) {

    if(!(this  instanceof HammerHand)) return new HammerHand(id);

    this.$dom  = $(id);
    this.body = this.$dom[0];

    //建立$hammer类
    this.hammer = new Hammer.Manager(this.body);
    this.hammer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL, threshold: 10 }));
    this.hammer.on("panend", Hammer.bindFn(this.onPanEnd, pa));

}
HammerHand.prototype.onPanEnd = function(ev){

    if(ev.deltaY<0) {
        if(this.up)  this.up();
    }else{
        if(this.down) this.down();
    }

};