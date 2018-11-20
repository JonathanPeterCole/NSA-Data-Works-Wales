class graph {
    constructor(canvas, parent, padding={top: 4, right: 4, bottom: 4, left: 4}){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.height = this.canvas.height;
        this.crest, this.trough = 0;
        this.parent = parent;
        this.data = [];
        this.padding = padding;
        this.datapoints = [];
        this.fontsize = 14;
        this.setWidth()
    }
    addData(reading){
        console.log(this.data)
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
        this.width = (this.parent.offsetWidth - left - right);
        this.drawableWidth = this.width - (this.padding.left + this.padding.right);
        this.drawableHeight = this.height - (this.padding.top + this.padding.bottom);
        this.canvas.width = this.width;

        this.scaleCanvas(this.canvas, this.ctx, this.width, this.height)
    }

    scaleCanvas(canvas, context, width, height) {
        // assume the device pixel ratio is 1 if the browser doesn't specify it
        const devicePixelRatio = window.devicePixelRatio || 1;
      
        // determine the 'backing store ratio' of the canvas context
        const backingStoreRatio = (
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio || 1
        );
      
        // determine the actual ratio we want to draw at
        const ratio = devicePixelRatio / backingStoreRatio;
      
        if (devicePixelRatio !== backingStoreRatio) {
          // set the 'real' canvas size to the higher width/height
          canvas.width = width * ratio;
          canvas.height = height * ratio;
      
          // ...then scale it back down with CSS
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';
        }
        else {
          // this is a normal 1:1 device; just scale it simply
          canvas.width = width;
          canvas.height = height;
          canvas.style.width = '';
          canvas.style.height = '';
        }
      
        // scale the drawing context so everything will work at the higher ratio
        context.scale(ratio, ratio);
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
        this.trough = trough
        this.drawableTrough = trough - this.padding.bottom;
        this.crest = crest + this.padding.top;
        this.drawableCrest = crest + this.padding.top;
        this.updateDatapoints();
    }
    updateDatapoints(){
        this.datapoints = [];
        let data = this.data;
        let diff = this.drawableCrest-this.drawableTrough;
        if(this.drawableCrest == this.drawableTrough){
            this.diff = 1;
        }
        for(let d in data){
            this.datapoints.push({x: (Math.round(this.drawableWidth / 9  * d) + this.padding.left) , y: Math.round((this.height / diff) * (this.drawableCrest - data[d]))})
        }
    }
    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height)
        if(this.datapoints.length == 0){
            return false;
        }
        this.withGridLines().withShadow().withLine().withLabels().withCircles();
        // this.withLine();
    }
    withCircles(){

        this.datapoints.forEach(d => {
            this.ctx.beginPath();
            this.ctx.arc(d.x,d.y,5,0,2*Math.PI);
            this.ctx.fillStyle = "#fff"
            this.ctx.fill()
            this.ctx.stroke();
            this.ctx.closePath()
        })
        return this
    }
    withGridLines(){
        let horizontal = 5
        let vertical = 5
        this.ctx.lineWidth = 1
        let width = this.drawableWidth / 9
        for(let i=0; i<= vertical; i++){
            this.ctx.strokeStyle = "rgb(230, 230, 230)"
            this.ctx.beginPath()
            this.ctx.moveTo(i* (this.drawableWidth / vertical) + this.padding.left + .5, this.padding.top +.5);
            this.ctx.lineTo(i* (this.drawableWidth / vertical)+ this.padding.left + .5, this.height - this.padding.bottom + .5);
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
        for(let i =0; i<= horizontal; i++){
            this.ctx.strokeStyle = "rgb(230, 230, 230)"
            this.ctx.beginPath()
            this.ctx.moveTo(this.padding.left , this.padding.top +((this.drawableHeight/horizontal ) * i));
            this.ctx.lineTo(this.padding.left + this.drawableWidth ,this.padding.top +((this.drawableHeight/horizontal ) * i));
            this.ctx.stroke();
            this.ctx.closePath()
        }
        return this
    }
    withShadow(){
        let data = this.datapoints; 
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding.left + .5, data[0].y);
        this.ctx.lineTo(this.padding.left, data[0].y)
        for(let d in data){
            if(d==0){
                this.ctx.lineTo(data[0].x + .5, data[0].y + .5)
            } else {
                let x =data[d-1].x + ( data[d].x -  data[d-1].x)/2;
                let y = data[d].y + ( data[d].y - data[d-1].y)/2;
                this.ctx.quadraticCurveTo(x, y, data[d].x, data[d].y)
            }
        }
        this.ctx.lineTo(data[data.length-1].x, this.height - this.padding.bottom);
        this.ctx.lineTo(this.padding.left, this.height - this.padding.bottom);

        var grd=this.ctx.createLinearGradient(0,0,0 , (this.height*1.2));
        grd.addColorStop(0,"#3498db");
        grd.addColorStop(1,"rgba(255, 255, 255,0)");
        this.ctx.fillStyle = grd;
        this.ctx.fill();
        this.ctx.closePath()
        return this;
    }
    withLine(){
        let data = this.datapoints; 
        this.ctx.beginPath();
        this.ctx.lineWidth = 3
        this.ctx.moveTo(this.padding.left + .5, data[0].y + .5);
        for(let d in data){
            if(d==0){
                this.ctx.quadraticCurveTo(this.padding.left + .5, data[d].y,data[d].x + .5, data[d].y + .5)
            } else {
                let x =data[d-1].x + ( data[d].x -  data[d-1].x)/2;
                let y = data[d].y + ( data[d].y - data[d-1].y)/2;
                this.ctx.quadraticCurveTo(x, y, data[d].x, data[d].y)
            }
        }
        this.ctx.strokeStyle = "#5A60F9"
        this.ctx.stroke();
        this.ctx.closePath()
        return this;
    }
    withLabels(){
        this.ctx.fillStyle = "#000"
        this.ctx.font=this.fontsize + "px Arial"
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText(this.crest, this.padding.left - this.ctx.measureText(this.crest).width - 5 , this.padding.top )
        
        this.ctx.textAlign = "left"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText(this.trough, this.padding.left - this.ctx.measureText(this.trough).width - 5   , this.padding.top+ this.drawableHeight)
        return this
    }
}
