import canvasLibrary from './canvasLibrary'
export default class graph {
    constructor(canvas, parent, options ={}){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.lib = new canvasLibrary(this.ctx, this.canvas)
        this.height = this.canvas.height;
        this.options = this.defaultSettings(options);
        this.crest, this.trough = 0;
        this.parent = parent;
        this.data = [];
        this.padding = this.options.padding;
        this.datapoints = [];
        this.setWidth()
        this.features()
        this.canvas.addEventListener("mousemove", (e) => {
            this.updateHoverLine(e);
        })
    }

    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    //COLORBLND
    features(){
        this.features = [
            {key: 'withShadow', cb: this.withShadow.bind(this)},
            {key: 'withBackground', cb: this.withBackground.bind(this)},
            {key: 'withCircles', cb: this.withCircles.bind(this)},
            {key: 'withInfo', cb: this.withInfo.bind(this)},
            {key: 'withLabels', cb: this.withLabels.bind(this)},
            {key: 'withLine', cb: this.withLine.bind(this)},
            {key: 'withGridLines', cb: this.withGridLines.bind(this)},
            {key: 'withSideShade', cb: this.withSideShade.bind(this)},
            {key: 'withHoverLine', cb: this.withHoverLine.bind(this)},
            {key: 'withLastUpdated', cb: this.withLastUpdated.bind(this)},
            {key: 'withActive', cb: this.withActive.bind(this)},
        ]
    }
    updateHoverLine(e){
        this.hoverLine = e.offsetX;
        this.draw()
    }
    runFeature(key){
        for(let k in this.features){
            if(this.features[k].key === key){
                this.features[k].cb();
                break;
            }
        }
    }
    addData(reading){
        this.data.push(reading)
        this.update()
        this.draw()
    }
    setData(data){
        this.data = data;
        this.update()
        this.draw()
    }
    resize(e){
        // this.height = this.parent.getBoundingClientRect().height
        this.setWidth()
        this.draw();
    }
    defaultSettings(options){
        let aesthetics = {
            line: { width: 2, colour: "rgba(57, 57, 57, 0.8)"},
            info: {colour: "#fff"},
            background: {colour: "#141414"},
            hoverLine: {lineColour: "#090909", width: 2, textboxBackground: "#090909", textboxFontSize: 11, textboxTextColour: "#999999", boxWidth: 14, boxHeight: 7, radius: 3},
            lastUpdated: {fontsize: 11},
            active: {activeColour: "rgba(33, 218, 42, .8)", inactiveColour: "#f21212", border: "rgba(38, 38, 38, .8)"},
            sideShade: {gradient: [
                {stop: 0, colour: "rgba(22,22,22, 1)"},
                {stop: 0.3, colour: "rgba(22,22,22, 0.7)"},
                {stop: 1, colour: "rgba(0,0,0,0)"}
            ]},
            circles: {colour: "#fff"},
            gridLines: {width: 2, colour: "#202020"},
            shadow: {gradient: [
                {stop: 0, colour: "#3498db"},
                {stop: 1, colour: "rgba(255, 255, 255,0)"},
            ]},
            fullShadow: {colour: "#60caca"},
            labels: {colour: "#656565", fontsize: 11}
        }
        if(options.aesthetics){
            for(let o in options.aesthetics){
                aesthetics[o] = {...aesthetics[o], ...options.aesthetics[o]}
            }
        }
        return {
            padding: {top: 4, bottom: 4, left: 4, right: 4},
            build: ['withBackground', 'withGridLines', 'withLine', 'withInfo'],
            fontsize: 14,
            font: 'Open Sans',
            name: 'Temperature sensor',
            active: false,
            lines: {horizontal: 4, vertical:9},
            ...options,
            aesthetics: aesthetics
        }
        
    }
    keyExists(obj, key){
        if(typeof obj[key] !== "undefined"){
            return true
        }
        return false;
    }
    setWidth(){
        let left = parseInt(window.getComputedStyle(this.parent).getPropertyValue("padding-right").replace(" px", ""));
        let right = parseInt(window.getComputedStyle(this.parent).getPropertyValue("padding-left").replace(" px", ""));
        this.width = (this.parent.offsetWidth - left - right);
        this.drawableWidth = this.width - (this.padding.left + this.padding.right);
        this.drawableHeight = this.height - (this.padding.top + this.padding.bottom);
        this.canvas.width = this.width;
        this.lib.scaleCanvas(this.canvas, this.ctx, this.width, this.height)
    }

    update(){
        let data = this.data;
        let trough, crest;
        for(let d in data){
            let reading = data[d].reading
            if(trough === undefined){
                trough = reading; 
            }
            if(crest === undefined){
                crest = reading;
            }
            if(reading > crest){
                crest = reading
            }
            if(reading < trough){
                trough = reading
            }
        }
        

        this.trough = trough
        this.crest = crest;
        if(this.crest == this.trough || this.crest - this.trough <= 3){
            this.crest +=3
            this.trough -=3
        }
        this.drawableTrough = trough - this.padding.bottom;
        this.drawableCrest = crest + this.padding.top;
        this.updateDatapoints();
    }
    updateDatapoints(){
        this.datapoints = [];
        let data = this.data; 
        let diff = this.crest-this.trough;
        for(let d in data){
            let reading = data[d].reading
            //i* Math.round(this.drawableWidth / vertical) + this.padding.left
            this.datapoints.push({reading: reading, x: (Math.round(this.drawableWidth / (data.length-1) * d ) + this.padding.left)  , y: Math.round((this.drawableHeight / diff) * (this.crest - parseInt(reading))) + this.padding.top})
        }
    }
    draw(){
        this.lib.clear()
        if(this.datapoints.length == 0){
            return false;
        }
        for(let i in this.options.build){
            this.runFeature(this.options.build[i])
        }
    }
    setActive(active){
        this.options.active = active;
    }
    setName(name){
        this.options.name = name;
    }
    setLastUpdated(date){
        this.lastUpdated = date;
        this.update()
        this.draw()
    }
    withLastUpdated(){
        this.lib.setTextBaseline("top")
        this.lib.setFont(this.options.font, this.options.aesthetics.lastUpdated.fontsize, 600)
        this.lib.drawText("Last updated: " + this.lastUpdated, this.options.padding.left, this.drawableHeight + this.padding.top );
    }
    withHoverLine(){
        let split = (this.drawableWidth/this.options.lines.vertical)/2;
        let options =this.options.aesthetics.hoverLine
        for(let i in this.datapoints){
            if(Math.abs(this.hoverLine - this.datapoints[i].x) < split){
                let x = this.datapoints[i].x;
                let y = this.datapoints[i].y;
                
                //Hover line
                this.lib.setLineWidth(options.width)
                this.lib.setStrokeStyle(options.lineColour)
                this.lib.drawLine(x, this.options.padding.top, x, this.options.padding.top + this.drawableHeight);
                this.lib.stroke();

                //Hover line text box
                this.lib.drawRoundedRectangle(x, y, options.boxWidth, options.boxHeight, options.radius)
                this.lib.setFillStyle(options.textboxBackground)
                this.lib.fill();

                //Hover line text
                this.lib.setTextBaseline("middle")
                this.lib.setTextAlign("center")
                this.lib.setFont(this.font, options.textboxFontSize, 600)
                this.lib.setFillStyle(options.textboxTextColour)
                this.lib.drawText(this.datapoints[i].reading, x, y) 

                //break to stop waste of loop
                break;
            }
        }
    }

    withInfo(){
        //Text aligns and style
        this.lib.setTextAlign("left")
        this.lib.setTextBaseline("alphabetic")
        this.lib.setFillStyle(this.options.aesthetics.info.colour)

        //Draw name of sensor
        this.lib.setFont(this.options.font, this.options.fontsize, 600)
        this.lib.drawText(this.options.name, 15, 25);
        
        //Draw current reading of sensor
        this.lib.setFont(this.options.font, this.options.fontsize-2, 400)
        this.lib.drawText(this.data[0].reading + "° C", 15, 45);

        return this;
    }
    withSideShade() {
        let gradient = this.lib.createLinearGradient(0,0,this.width, 0, this.options.aesthetics.sideShade.gradient);
        this.lib.setFillStyle(gradient);
        this.lib.fillRectangle(0, 0, this.width, this.height);
        return this;
    }
    withActive(){
        this.lib.setStrokeStyle(this.options.aesthetics.active.border)
        if(this.options.active){
            this.lib.setFillStyle(this.options.aesthetics.active.activeColour)
        } else {  
            this.lib.setFillStyle(this.options.aesthetics.active.inactiveColour)
        }
        this.lib.drawCircle(this.width - 15, 16,5,0,2*Math.PI)
        this.lib.fill();
        this.lib.stroke();
        return this
    }
    withBackground(){
        this.lib.setFillStyle(this.options.aesthetics.background.colour)
        this.lib.fillRectangle(0,0,this.width, this.height);
        return this;
    }
    withCircles(){

        this.datapoints.forEach(d => {
            this.lib.setFillStyle(this.options.aesthetics.circles.colour)
            this.lib.drawCircle(d.x,d.y,5,0,2*Math.PI)
            this.lib.fill()
            this.lib.stroke();
        })
        return this
    }
    withGridLines(){
        let horizontal = this.options.lines.horizontal
        let vertical = this.options.lines.vertical
        this.lib.setLineWidth(this.options.aesthetics.gridLines.width)
        this.lib.setStrokeStyle(this.options.aesthetics.gridLines.colour)
        
        for(let i=0; i<= vertical; i++){
            this.lib.drawLine( Math.round(this.drawableWidth / vertical * i) + this.padding.left , this.padding.top,
                            Math.round(this.drawableWidth / vertical * i)+ this.padding.left , this.height - this.padding.bottom )
            this.lib.stroke();
        }
        for(let i =0; i<= 1; i++){
            this.lib.drawLine(this.padding.left , this.padding.top +  Math.round(i*this.drawableHeight),
                            this.padding.left + this.drawableWidth , this.padding.top +  Math.round(i*this.drawableHeight));
            this.lib.stroke();
        }
        for(let i =0; i<= horizontal; i++){
            this.lib.drawLine(this.padding.left , this.padding.top +( Math.round(this.drawableHeight/horizontal ) * i),
                            this.padding.left + this.drawableWidth -1 ,this.padding.top +( Math.round(this.drawableHeight/horizontal ) * i));
            this.lib.stroke();
        }
        return this
    }
    withShadow(){
        let data = this.datapoints; 
        this.lib.drawPolygon([{x: this.padding.left, y: data[0].y},
             ...data, {x: data[data.length-1].x, y: this.height - this.padding.bottom}, {x:this.padding.left, y: this.height - this.padding.bottom}]);
        let gradient = this.lib.createLinearGradient(0,0,0 , (this.height*1.2),this.options.aesthetics.shadow.gradient)
        this.lib.setFillStyle(gradient);
        this.lib.fill();
        return this;
    }
    withFullShadow(){
        let data = this.datapoints; 
        this.lib.drawPolygon([{x: this.padding.left, y: data[0].y},
             ...data, {x: data[data.length-1].x, y: this.height - this.padding.bottom}, {x:this.padding.left, y: this.height - this.padding.bottom}]);
        this.lib.setFillStyle(this.options.aesthetics.fullShadow.colour);
        this.lib.fill();
        return this;
    }
    withLine(){
        let data = this.datapoints;
        this.lib.setLineWidth(this.options.aesthetics.line.width)
        this.lib.drawLines([{x: this.padding.left, y: data[0].y} , ...data])
        this.lib.setStrokeStyle(this.options.aesthetics.line.colour)
        this.lib.stroke();
        return this;
    }
    withLabels(){
        this.lib.setFillStyle(this.options.aesthetics.labels.colour)
        this.lib.setFont(this.options.aesthetics.font, this.options.aesthetics.labels.fontsize, 600)
        this.lib.setTextAlign("left")
        this.lib.setTextBaseline("middle")
        this.lib.drawText(this.crest, this.padding.left + this.drawableWidth + 3  , this.padding.top )
        
        this.lib.setTextAlign("left")
        this.lib.setTextBaseline("middle")
        this.lib.drawText(this.trough, this.padding.left  + this.drawableWidth+ 3 , this.drawableHeight + this.padding.top)
        return this
    }
}
