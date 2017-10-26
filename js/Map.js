// 创建一个游戏地图的构造函数
function Map(){
    // console.log(666)
    // 模拟创建一个游戏的地图，为了防止4*4运动的格子出去，所以给它加了三堵墙，让运动的格子始终显示在定义的table表中
     this.mapArr = [
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲□□□□□□□□□□□□▲▲▲",
   "▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲",
   "▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲",
   "▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲"
    ];
    // this.check();
}
// 渲染地图中已经停止运动的格子的颜色
Map.prototype.render = function(){
    for(var i = 0;i<20;i++){
        for(var j = 0;j<12;j++){
            // 获取地图中的某行某列，如果该行该列的格子！=□，则说明格子非空白，因而就要对其进行渲染
            var gridcontent = this.mapArr[i][j+3];
            // gridcontent获取的是格子里面的内容
            if(gridcontent != "□"){
                game.setColor(i,j,"b" + gridcontent);
            }
        }
    }
}
// 通过对比活动的4*4的格子与地图中切割的4*4的格子，来决定是否活动的格子死去后，会挂在页面上！
// false:则表示重合，挂住;true:则表示不重合，则挂不住,下落
// rwo,col与活动的盒子作对比;row,col形成的块将与活动盒子做对比,并且它是活动盒子的下一个状态，可在block中的update中查看
Map.prototype.check = function(row,col,yangshizhi2){
    // console.log(222222);
     var cutgrid = [];
    // ①地图上任意切割4*4的方块区域
    for(var i = 0;i<4;i++){

       cutgrid.push(this.mapArr[row + i].substr(col + 3 , 4));
    }

    // ②进行对比
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(game.block.dingli(yangshizhi2,i,j) == 1 && cutgrid[i][j] != "□"){
                return false;
                // return 之后，直接退出整个函数,不会继续再执行下面的语句;若是false，则会重合，活动盒子，不会再下落
            }
        }
    }
    return true;
    // 若是true,则不重合，活动盒子继续下落
}
// 获取到死亡的方块，即落地的或者咔住的
Map.prototype.addDidBlock = function(row,col,blockCode,color){
    for(var i = 0;i < 4;i++){
        for(var j = 0; j< 4;j++){
            if(game.block.dingli(blockCode,i,j )== 1){
                this.mapArr[row + i] =this.changeChar(this.mapArr[row + i],col+j+3,color);
                // 在数组中的字符串的第i行，获取到具体的某列，然后将它替换为一个颜色值
            }
        }
    }
}
// 将死亡的方块添加到mapArr中的方法：即把当前mapArr中的格子替换成死亡的方块
Map.prototype.changeChar = function(str,n,newchar){
    // substr(索引号，截取长度)+要拼接的+str.substr(截取长度);
    return str.substr(0,n) + newchar + str.substr(n+1);
    //改变字符串函数。将字符串str的第n为为newchar
    }
// 添加消行事件
Map.prototype.eliminate =function(){
  for(var i =0;i<20;i++){
    if(this.mapArr[i].indexOf("□") == -1){
        this.mapArr.splice(i,1);
        this.mapArr.unshift("XXX□□□□□□□□□□□□XXX");
    }
  }
}
