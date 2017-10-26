// 声明一个game构造器
function Game(){
    // console.log(Game);
    this.dom = null;
    this.timer = null;
    this.rowAmount = 20;
    this.colAmount = 12;
    // 当前方块
    this.block = new Block();
    // 下一个要生成的方块
    this.nextblock = new Block();
    this.map = new Map();
    this.init();
    this.start();
    this.bindEvent();
}
// 初始化，生成表格
Game.prototype.init = function(){
    // console.log(init);
    this.dom = document.createElement("table");
    // 给表格添加样式
    this.dom.style.float = "left";
    this.dom.style.marginRight = "10px";
    for(var i =0;i < this.rowAmount;i++){
        var tr = document.createElement("tr");
        for(var j = 0;j<this.colAmount;j++){
            var td = document.createElement("td");
            // 变量不用引号包裹
            tr.appendChild(td);
        }
        this.dom.appendChild(tr);
    }
    document.body.appendChild(this.dom);

    // 创建预览的小table
    this.domsmall = document.createElement("table");
    // 给表格添加样式
    this.domsmall.style.float = "left";
    // 添加行列
    for(var a = 0;a<4;a++){
        var trsmall = document.createElement("tr");
        for(var b = 0;b<4;b++){
            var tdsmall = document.createElement("td");
            trsmall.appendChild(tdsmall);
        }
        this.domsmall.appendChild(trsmall);
    }
    document.body.appendChild(this.domsmall);
}

// 创建一个渲染格子颜色的方法:通过添加类的方式
Game.prototype.setColor = function(row,col,className){
    // console.log(444);

    this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className = className;
}
// 由于该预览图只是生成，不运动，所以直接在game中渲染生成即可
Game.prototype.renderNextBlock = function(){
    // 遍历smalltable中tr,td
    for(var i = 0;i<4;i++){
        for(var j = 0;j<4;j++){
            if(game.block.dingli(this.nextblock.yangshizhi2,i,j)==1){
                this.domsmall.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "b" + this.nextblock.leixing1;
            }
        }
    }
}
// 创建清屏的方法
Game.prototype.clear = function(){
    // console.log(5555)
    for(var i = 0 ;i<this.rowAmount;i++){
        for(var j =0;j<this.colAmount;j++){
            this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "bkg";        }
    }
    for(var i = 0 ;i<4;i++){
        for(var j =0;j<4;j++){
            this.domsmall.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].className = "bkg";        }
    }
}
// 生成游戏开始的方法,开启定时器
Game.prototype.start = function(){
    var self = this;
    // 游戏中的方块按每帧在运动
    var zhen = 0;
    this.timer = setInterval(function(){
        zhen ++;
        // 清屏
        self.clear();
        // 更新
        zhen % 20 == 0 && self.block.update();
        // 渲染
        self.block.render();
        self.map.render();
        self.renderNextBlock();
    },20);
}
// 生成鼠标事件的方法,绑定鼠标监听事件
Game.prototype.bindEvent = function(){
    var self = this;
    document.onkeydown =function(event){
            if(event.keyCode == 37){
                self.block.moveLeft();
            }
            else if(event.keyCode == 38){
                self.block.rotate();
            }
            else if(event.keyCode == 39){
                self.block.moveRight();
            }
            else if(event.keyCode == 40){
                self.block.gotoBottom();
            }
    }
}
