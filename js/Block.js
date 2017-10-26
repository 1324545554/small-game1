// 构建活动的格子的方法
// 活动的格子有7种类型：
//      ①S/Z/J/L/O/T/I；
//      ②每种类型又可变换几种样式
function Block( ){
    // console.log(111);
    // 首先，声明格子的现状，实现效果①
    // 获取数组中的值通过索引号
    var gezileixing = ["S","Z","J","L","O","T","I"];
    // 随机获取数组索引值
    this.leixing1 = _.random(0,gezileixing.length - 1);
    // console.log(this.leixing1);
    this.zhi1 = gezileixing[this.leixing1];
    // console.log(this.zhi1);
    // 第二，声明现有的每个格子的几种变换样式,实现效果②
    var geziyangshi ={
        "S": [0x6c00, 0x8c40],
        "Z": [0xc600, 0x4c80],
        "J": [0x44c0, 0x8e00, 0x6440, 0x0e20],
        "L": [0x4460, 0x0e80, 0xc440, 0x2e00],
        "O": [0x6600],
        "T": [0x0e40, 0x4c40, 0x4e00, 0x4640],
        "I": [0x4444, 0x0f00]
    }
    // 获取样式中的键
    this.leixing2 = geziyangshi[this.zhi1];
    // 获取样式中的键值个数
    this.zhigeshu2 = this.leixing2.length;
    // 随机获取一个键类型的样式索引
    this.yangshi2 = _.random(0,this.zhigeshu2 - 1);
    // console.log(this.yangshi2)
    // 获取到样式值
    this.yangshizhi2 = this.leixing2[this.yangshi2];
    // console.log(this.yangshizhi2); 输出的是一个十进制的数，可以用计算机转为十六进制

    // 设置活动的格子的4*4矩阵的初始位置
    this.row = 0;
    this.col = 4;
    this.dingli();
}


// 上面的数组最终获取到的是4*4矩阵列表的十进制表示法，可以转为十六进制，此刻用定理【(((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1】获取到的是某个4*4矩阵的某行某列
// 参数：4*4矩阵列表的进制表示，矩阵中某行，矩阵中某列
// 矩阵输出0，或1；0默认盒子没有颜色；1默认盒子此刻应该有颜色
Block.prototype.dingli =function(code,m,n){
    // console.log(2222);
  return (((code >> 4 * (3 - m)) & 0xf) >> (3 - n)) & 0x1;
}
// 调用game的方法渲染运动的盒子
Block.prototype.render = function(){
     // console.log(333);
    // 只能通过中介者实例调用另一个构造函数的方法
    for(var i = 0;i < 4;i++){
       for(var j = 0 ;j<4;j++){
       // game.setColor(i + this.row , j + this.col ,"bb");
       if(this.dingli(this.yangshizhi2,i,j) == 1){
        // ********************************凡是自己的属性，前面都得加this.(名字),进行调用
        game.setColor(i + this.row , j + this.col,"b"+ this.leixing1);
       }
       }
    }
}
// 更新
Block.prototype.update = function(){
// 输出为真：【game.map.check(this.row+1,this.col,this.yangshizhi2】直接return出true;表示它们未重合，可以row++
// 输出为假：【!game.map.check(this.row+1,this.col,this.yangshizhi2】输出为false;表示他们重合;不可以row++
// if判断:if(true){}才能运行;里面不能直接放false，但可以！true;
// map.check放入block.update中的原因是:当game实例化完成之后，即将Game执行完毕，才能执行check；具体方法，将其放入定时器中，延迟执行，可以防止报错！
    if(game.map.check(this.row+1,this.col,this.yangshizhi2)){
        this.row ++;
    }else{
        // 它不可以下落,已经被卡在了地图中，即停止运动，表明已经死亡，此时要声明死亡并将它放入地图数组中
        game.map.addDidBlock(this.row , this.col , this.yangshizhi2 , this.leixing1);
        game.nextblock = new Block();
        // 对象可以打点直接生成属性
        if(!game.map.check(0,4,game.nextblock.yangshizhi2)){
            alert("你撞死了");
            clearInterval(game.timer);
        }
        else{
            game.block=game.nextblock;
        }
        game.map.eliminate();

    }

}
Block.prototype.moveLeft = function(){
    if(game.map.check(this.row,this.col - 1,this.yangshizhi2)){
        this.col --;
    }
}
Block.prototype.moveRight = function(){
    if(game.map.check(this.row,this.col + 1,this.yangshizhi2)){
        this.col ++;
    }
}
Block.prototype.rotate = function(){
    // 随机一个样式的索引
    this.yangshi2 ++;
    // 随机一个样式索引与总的样式个数判断
    if(this.yangshi2 > this.zhigeshu2 -1){
        this.yangshi2 = 0;
    }
    // 声明变量：接收已经获取的样式值this.yangshizhi2 =this.leixing2[this.yangshi2]
    var nextCode = this.leixing2[this.yangshi2];
    if(game.map.check(this.row,this.col,nextCode)){
        this.yangshizhi2 = nextCode;
    }
}
Block.prototype.gotoBottom = function(){
var i = 0;
while(game.map.check(this.row + i,this.col,this.yangshizhi2)){
    i++;
}
this.row = this.row + i -1;
}