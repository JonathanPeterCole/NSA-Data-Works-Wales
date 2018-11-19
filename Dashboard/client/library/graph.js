export default class graph {
    constructor(canvas, parent){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.crest, this.trough = 0;
        this.parent = parent;
        this.data = [];
        this.datapoints = [];
    }
    addData(reading){
        if(this.data.length >= 10){
            this.data.shift();
        }
        this.data.push(reading)
        this.update()
        this.draw()
    }
    resize(e){
        this.height = this.parent.getBoundingClientRect().height
        this.canvas.width = this.parent.getBoundingClientRect().width;
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
        this.trough = trough;
        this.crest = crest;
        this.updateDatapoints();
    }
    updateDatapoints(){
        let data = this.data;
        let diff = this.crest-this.trough;
        for(let d in data){
            this.datapoints.push({x: (this.width / 10)  * d, y: (this.height / diff) * (this.crest - data[d])})
        }
    }
    draw(){
        let data = this.datapoints;
        console.log('draw');
        console.log(this.height)
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.beginPath();
        this.ctx.moveTo(this.height, 0);
        for(let d in data){
            this.ctx.lineTo(data[d].x, data[d].y)
        }
        this.ctx.closePath()
        this.ctx.stroke();
    }
}
