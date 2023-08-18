$(function(){
    // 風船5種類
    img1 = 'pic/b1.png';
    img2 = 'pic/b2.png';
    img3 = 'pic/b3.png';
    img4 = 'pic/b4.png';
    img5 = 'pic/b5.png';
    imgArr = [img1,img2,img3,img4,img5];
    $('body').append('<div id="added"></div>');

    // 画面の高さと幅を取得
    wh = $(window).height();
    ww = $(window).width();

    // 風船オブジェクトの配列
    bl=[];
    for(var i = 0; i<30; i++){
        var startX=Math.floor(Math.random()*(ww/20))*20;
        var startY = wh+(Math.floor(Math.random()*10)*80);
        var ratio =1 / (Math.floor(Math.random()*5)+4); // Yが進む距離に対してXが進む距離の比率
        direction = 1-Math.round(Math.random())*2;
        bl[i]= new balloon(i,startX,startY,ratio,direction);
        bl[i].appear();
    }
});

// ... 既存のコード ...

function balloon(i,x,y,r,d){
    this.i=i;
    this.x=x;
    this.y=y;
    var dist1 =-8;
    var dist2 = Math.abs(dist1)*r*d;
    $('#added').append('<img id=image'+this.i+'>');

    // 風船を出現させる
    this.appear = function(){
        var target = $("#image"+this.i);
        target.css({
            position:'absolute',
            top:this.y,
            left:this.x,
            zIndex:9999,
            width:'80px'
        });
        var rnd = Math.floor(Math.random()*imgArr.length);
        target.attr("src", imgArr[rnd]);
        var xx = this.x;
        var yy = this.y;

        // 風船を動かす
        var si = setInterval(function(){
            yy+=dist1;
            xx+=dist2;
            target.css({
                top:yy,
                left:xx
            });
            if(yy<-200) {
                clearInterval(si);
                target.remove(); // 風船を削除
                var newBalloon = new balloon(i, Math.floor(Math.random()*(ww/20))*20, wh+(Math.floor(Math.random()*10)*80), 1 / (Math.floor(Math.random()*5)+4), 1-Math.round(Math.random())*2);
                newBalloon.appear(); // 新しい風船を出現させる
            }
        },20);
    };
}
