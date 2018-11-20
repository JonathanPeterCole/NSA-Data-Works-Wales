export default class graph {
    constructor(canvas, parent, padding={top: 4, right: 4, bottom: 4, left: 4}){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = this.canvas.height;
        this.crest, this.trough = 0;
        this.parent = parent;
        this.data = [];
        this.padding = padding;
        this.datapoints = [];
        this.setWidth()
    }
    addData(reading){
        if(this.data.length >= 10){
            this.data.shift();
        }
        this.data.push(reading)
        this.update()
        if(this.data.length > 1){

            this.draw()
        }
    }
    resize(e){
        // this.height = this.parent.getBoundingClientRect().height
        this.setWidth()
        this.draw();
    }
    setWidth(){
        let left = parseInt(window.getComputedStyle(this.parent).getPropertyValue("padding-right").replace(" px", ""));
        let right = parseInt(window.getComputedStyle(this.parent).getPropertyValue("padding-left").replace(" px", ""));
        this.width = this.parent.offsetWidth - left - right ;
        this.drawableWidth = this.width - (this.padding.left + this.padding.right);
        this.drawableHeight = this.height - (this.padding.top + this.padding.bottom);
        this.canvas.width = this.width;
    }
    update(){
        let data = this.data;
        let trough, crest;
        for(let d in data){
            if(trough === undefined){
                trough = data[d]; 
            }
            if(crest === undefined){
                crest = data[d];
            }
            if(data[d] > crest){
                crest = data[d]
            }
            if(data[d] < trough){
                trough = data[d]
            }
        }
        this.trough = trough - this.padding.bottom;
        this.crest = crest + this.padding.top;
        this.updateDatapoints();
    }
    updateDatapoints(){
        this.datapoints = [];
        let data = this.data;
        let diff = this.crest-this.trough;
        if(this.crest == this.trough){
            this.diff = 1;
        }
        for(let d in data){
            this.datapoints.push({x: (Math.round(this.drawableWidth / 9  * d) + this.padding.left) , y: Math.round((this.height / diff) * (this.crest - data[d]))})
        }
    }
    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height)
        if(this.datapoints.length == 0){
            return false;
        }
        this.withGridLines().withLine().withLabels();
    }
    withGridLines(){
        let width = this.drawableWidth / 9
        for(let i=0; i<= 9; i++){
            this.ctx.strokeStyle = "rgb(230, 230, 230)"
            this.ctx.beginPath()
            this.ctx.moveTo(i* width + this.padding.left, 0);
            this.ctx.lineTo(i* width+ this.padding.left, this.height);
            this.ctx.stroke();
            this.ctx.closePath()
        }
        for(let i =0; i<= 1; i++){
            this.ctx.strokeStyle = "rgb(230, 230, 230)"
            this.ctx.beginPath()
            this.ctx.moveTo(this.padding.left , this.padding.top + (i*this.drawableHeight));
            this.ctx.lineTo(this.padding.left + this.drawableWidth , this.padding.top + (i*this.drawableHeight));
            this.ctx.stroke();
            this.ctx.closePath()
        }
        return this
    }
    withShadow(){
        let data = this.datapoints; 
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding.left, this.height);
        this.ctx.lineTo(this.padding.left, data[0].y)
        for(let d in data){
            this.ctx.lineTo(data[d].x, data[d].y)
        }
        this.ctx.lineTo(data[data.length-1].x, this.height);
        this.ctx.lineTo(this.padding.left, this.height);
        this.ctx.fillStyle = "rgba(52, 152, 219, .4)"
        this.ctx.fill();
        this.ctx.closePath()
        return this;
    }
    withLine(){
        let data = this.datapoints; 
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding.left + .5, data[0].y + .5);
        console.log(data)
        for(let d in data){
            this.ctx.lineTo(data[d].x + .5, data[d].y + .5)
        }
        this.ctx.strokeStyle = "rgb(100, 100, 100)"
        this.ctx.stroke();
        this.ctx.closePath()
        return this;
    }
    withLabels(){
        this.ctx.font="8px Arial"
        this.ctx.textAlign = "right"
        this.ctx.textBaseline = "top"
        this.ctx.fillText(this.crest, this.padding.left - 2 , this.padding.top )
        
        this.ctx.textAlign = "right"
        this.ctx.textBaseline = "bottom"
        this.ctx.fillText(this.trough, this.padding.left - 2 , this.padding.top+ this.drawableHeight)
    }
}
