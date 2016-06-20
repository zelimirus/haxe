(function (console, $hx_exports) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var pixi_plugins_app_Application = function() {
	this._animationFrameId = null;
	this.pixelRatio = 1;
	this.set_skipFrame(false);
	this.autoResize = true;
	this.transparent = false;
	this.antialias = false;
	this.forceFXAA = false;
	this.roundPixels = false;
	this.clearBeforeRender = true;
	this.preserveDrawingBuffer = false;
	this.backgroundColor = 16777215;
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.set_fps(60);
};
pixi_plugins_app_Application.prototype = {
	set_fps: function(val) {
		this._frameCount = 0;
		return val >= 1 && val < 60?this.fps = val | 0:this.fps = 60;
	}
	,set_skipFrame: function(val) {
		if(val) {
			console.log("pixi.plugins.app.Application > Deprecated: skipFrame - use fps property and set it to 30 instead");
			this.set_fps(30);
		}
		return this.skipFrame = val;
	}
	,start: function(rendererType,parentDom,canvasElement) {
		if(rendererType == null) rendererType = "auto";
		if(canvasElement == null) {
			var _this = window.document;
			this.canvas = _this.createElement("canvas");
			this.canvas.style.width = this.width + "px";
			this.canvas.style.height = this.height + "px";
			this.canvas.style.position = "absolute";
		} else this.canvas = canvasElement;
		if(parentDom == null) window.document.body.appendChild(this.canvas); else parentDom.appendChild(this.canvas);
		this.stage = new PIXI.Container();
		var renderingOptions = { };
		renderingOptions.view = this.canvas;
		renderingOptions.backgroundColor = this.backgroundColor;
		renderingOptions.resolution = this.pixelRatio;
		renderingOptions.antialias = this.antialias;
		renderingOptions.forceFXAA = this.forceFXAA;
		renderingOptions.autoResize = this.autoResize;
		renderingOptions.transparent = this.transparent;
		renderingOptions.clearBeforeRender = this.clearBeforeRender;
		renderingOptions.preserveDrawingBuffer = this.preserveDrawingBuffer;
		if(rendererType == "auto") this.renderer = PIXI.autoDetectRenderer(this.width,this.height,renderingOptions); else if(rendererType == "canvas") this.renderer = new PIXI.CanvasRenderer(this.width,this.height,renderingOptions); else this.renderer = new PIXI.WebGLRenderer(this.width,this.height,renderingOptions);
		if(this.roundPixels) this.renderer.roundPixels = true;
		if(parentDom == null) window.document.body.appendChild(this.renderer.view); else parentDom.appendChild(this.renderer.view);
		this.resumeRendering();
		this.addStats();
	}
	,resumeRendering: function() {
		if(this.autoResize) window.onresize = $bind(this,this._onWindowResize);
		if(this._animationFrameId == null) this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,_onWindowResize: function(event) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.resize(this.width,this.height);
		this.canvas.style.width = this.width + "px";
		this.canvas.style.height = this.height + "px";
		if(this.onResize != null) this.onResize();
	}
	,_onRequestAnimationFrame: function(elapsedTime) {
		this._frameCount++;
		if(this._frameCount == (60 / this.fps | 0)) {
			this._frameCount = 0;
			if(this.onUpdate != null) this.onUpdate(elapsedTime);
			this.renderer.render(this.stage);
		}
		this._animationFrameId = window.requestAnimationFrame($bind(this,this._onRequestAnimationFrame));
	}
	,addStats: function() {
		if(window.Perf != null) new Perf().addInfo(["UNKNOWN","WEBGL","CANVAS"][this.renderer.type] + " - " + this.pixelRatio);
	}
};
var Main = function() {
	this.i = 0;
	this.preChoosedPosition3 = [6,1,2,4,0];
	this.preChoosedPosition2 = [2,0,6,3,4];
	this.preChoosedPosition1 = [0,2,4,6,1];
	this.slotSprite3 = [];
	this.slotSprite2 = [];
	this.slotSprite1 = [];
	this.creditValue = "5000";
	this.selectCandidateWidth = 70;
	this.selectCandidateHight = 70;
	this.selectCandidateInitalX = 380;
	this.selectCandidateInitalY = 535;
	this.tileWIDTH = 100;
	this.tileHEIGHT = 100;
	this.initalX = 395;
	this.slotNumber = 5;
	pixi_plugins_app_Application.call(this);
	this._init();
};
Main.main = function() {
	new Main();
};
Main.__super__ = pixi_plugins_app_Application;
Main.prototype = $extend(pixi_plugins_app_Application.prototype,{
	_init: function() {
		this.backgroundColor = 16777215;
		pixi_plugins_app_Application.prototype.start.call(this);
		var imgSlot = "assets/images/slot3.png";
		var imgSlot3 = "assets/images/slot3.png";
		var imgSlot2 = "assets/images/slot3.png";
		var texture1 = PIXI.Texture.fromImage("assets/images/ram2.png");
		var texture2 = PIXI.Texture.fromImage("assets/images/start.png");
		var texture4 = PIXI.Texture.fromImage("assets/images/start-down.png");
		var texture5 = PIXI.Texture.fromImage("assets/images/start-hover.png");
		var textureVucic = PIXI.Texture.fromImage("assets/images/vucic.jpg");
		var textureDacic = PIXI.Texture.fromImage("assets/images/dacic.jpg");
		var textureToma = PIXI.Texture.fromImage("assets/images/toma.jpg");
		var textureTadic = PIXI.Texture.fromImage("assets/images/tacic.jpg");
		var textureCeda = PIXI.Texture.fromImage("assets/images/ceda.jpg");
		var textureCanak = PIXI.Texture.fromImage("assets/images/canak.jpg");
		var textureSeselj = PIXI.Texture.fromImage("assets/images/seselj.jpg");
		var textureVucicFrame = PIXI.Texture.fromImage("assets/images/vucic-ram.png");
		var textureDacicFrame = PIXI.Texture.fromImage("assets/images/dacic-ram.png");
		var textureTomaFrame = PIXI.Texture.fromImage("assets/images/toma-ram.png");
		var textureTadicFrame = PIXI.Texture.fromImage("assets/images/tadic-ram.png");
		var textureCedaFrame = PIXI.Texture.fromImage("assets/images/ceda-ram.png");
		var textureCanakFrame = PIXI.Texture.fromImage("assets/images/canak-ram.png");
		var textureSeseljFrame = PIXI.Texture.fromImage("assets/images/seselj-ram.png");
		var texture3 = PIXI.Texture.fromImage(imgSlot);
		var selectVucic = new PIXI.Sprite(textureVucicFrame);
		selectVucic.height = this.selectCandidateHight;
		selectVucic.width = this.selectCandidateWidth;
		selectVucic.y = this.selectCandidateInitalY;
		selectVucic.x = this.selectCandidateInitalX;
		this.stage.addChild(selectVucic);
		selectVucic.interactive = true;
		var selectDacic = new PIXI.Sprite(textureDacicFrame);
		selectDacic.height = this.selectCandidateHight;
		selectDacic.width = this.selectCandidateWidth;
		selectDacic.y = this.selectCandidateInitalY;
		selectDacic.x = this.selectCandidateInitalX + 80;
		this.stage.addChild(selectDacic);
		selectDacic.interactive = true;
		var selectToma = new PIXI.Sprite(textureTomaFrame);
		selectToma.height = this.selectCandidateHight;
		selectToma.width = this.selectCandidateWidth;
		selectToma.y = this.selectCandidateInitalY;
		selectToma.x = this.selectCandidateInitalX + 160;
		this.stage.addChild(selectToma);
		selectToma.interactive = true;
		var selectTadic = new PIXI.Sprite(textureTadicFrame);
		selectTadic.height = this.selectCandidateHight;
		selectTadic.width = this.selectCandidateWidth;
		selectTadic.y = this.selectCandidateInitalY;
		selectTadic.x = this.selectCandidateInitalX + 240;
		this.stage.addChild(selectTadic);
		selectTadic.interactive = true;
		var selectCeda = new PIXI.Sprite(textureCedaFrame);
		selectCeda.height = this.selectCandidateHight;
		selectCeda.width = this.selectCandidateWidth;
		selectCeda.y = this.selectCandidateInitalY;
		selectCeda.x = this.selectCandidateInitalX + 320;
		this.stage.addChild(selectCeda);
		selectCeda.interactive = true;
		var selectCanak = new PIXI.Sprite(textureCanakFrame);
		selectCanak.height = this.selectCandidateHight;
		selectCanak.width = this.selectCandidateWidth;
		selectCanak.y = this.selectCandidateInitalY;
		selectCanak.x = this.selectCandidateInitalX + 400;
		this.stage.addChild(selectCanak);
		selectCanak.interactive = true;
		var selectSeselj = new PIXI.Sprite(textureSeseljFrame);
		selectSeselj.height = this.selectCandidateHight;
		selectSeselj.width = this.selectCandidateWidth;
		selectSeselj.y = this.selectCandidateInitalY;
		selectSeselj.x = this.selectCandidateInitalX + 480;
		this.stage.addChild(selectSeselj);
		selectSeselj.interactive = true;
		var yourCandidateImg = new PIXI.Sprite(textureVucicFrame);
		yourCandidateImg.height = 250;
		yourCandidateImg.width = yourCandidateImg.height;
		yourCandidateImg.y = 150;
		yourCandidateImg.x = 50;
		this.stage.addChild(yourCandidateImg);
		var winnerCandidateImg = new PIXI.Sprite(textureVucicFrame);
		winnerCandidateImg.height = 250;
		winnerCandidateImg.width = winnerCandidateImg.height;
		winnerCandidateImg.y = 150;
		winnerCandidateImg.x = 1000;
		this.stage.addChild(winnerCandidateImg);
		var volumeStyle = { font : "20px Arial", fill : "#ff0000", align : "center"};
		var volumeOnOF = new PIXI.Text("Isključi zvuk",volumeStyle);
		volumeOnOF.x = 1170;
		volumeOnOF.y = 10;
		volumeOnOF.interactive = true;
		this.stage.addChild(volumeOnOF);
		var messageStyle = { font : "bold 15px Arial", fill : "#ff0000", align : "center"};
		var message = new PIXI.Text("dobrodošli",messageStyle);
		message.x = 613;
		message.y = 45;
		this.stage.addChild(message);
		var creditStyle = { font : "bold 18px Arial"};
		var credit = new PIXI.Text("CREDIT:",creditStyle);
		credit.x = 595;
		credit.y = 10;
		this.stage.addChild(credit);
		var creditValueShow = new PIXI.Text(this.creditValue,creditStyle);
		creditValueShow.x = 670;
		creditValueShow.y = 10;
		this.stage.addChild(creditValueShow);
		var candidatePresent = new PIXI.Text("Tvoj kandidat",creditStyle);
		candidatePresent.x = 120;
		candidatePresent.y = 120;
		this.stage.addChild(candidatePresent);
		var winnerPresent = new PIXI.Text("Pobednik",creditStyle);
		winnerPresent.x = 1090;
		winnerPresent.y = 120;
		this.stage.addChild(winnerPresent);
		var select = new PIXI.Text("Izaberi svog kandidata i uloži kintu",creditStyle);
		select.x = 509;
		select.y = 500;
		this.stage.addChild(select);
		var imgButton = new PIXI.Sprite(texture2);
		imgButton.x = 606;
		imgButton.y = 450;
		imgButton.height = 40;
		imgButton.width = 100;
		imgButton.interactive = true;
		var imgBody = new PIXI.Sprite(texture1);
		imgBody.x = 353;
		imgBody.y = 70;
		imgBody.width = 608;
		imgBody.height = 378;
		while(this.i < this.slotNumber) {
			this.slotSprite1[this.i] = new PIXI.extras.TilingSprite(texture3,this.tileHEIGHT,this.tileWIDTH);
			this.slotSprite1[this.i].tilePosition.x = 0;
			this.slotSprite1[this.i].tilePosition.y = -this.preChoosedPosition1[this.i] * 100;
			this.slotSprite1[this.i].x = this.initalX + this.i * 105;
			this.slotSprite1[this.i].y = 105;
			this.stage.addChild(this.slotSprite1[this.i]);
			this.i++;
		}
		this.i = 0;
		while(this.i < this.slotNumber) {
			this.slotSprite2[this.i] = new PIXI.extras.TilingSprite(texture3,this.tileHEIGHT,this.tileWIDTH);
			this.slotSprite2[this.i].tilePosition.x = 0;
			this.slotSprite2[this.i].tilePosition.y = -this.preChoosedPosition2[this.i] * 100;
			this.slotSprite2[this.i].x = this.initalX + this.i * 105;
			this.slotSprite2[this.i].y = 210;
			this.stage.addChild(this.slotSprite2[this.i]);
			this.i++;
		}
		this.i = 0;
		while(this.i < this.slotNumber) {
			this.slotSprite3[this.i] = new PIXI.extras.TilingSprite(texture3,this.tileHEIGHT,this.tileWIDTH);
			this.slotSprite3[this.i].tilePosition.x = 0;
			this.slotSprite3[this.i].tilePosition.y = -this.preChoosedPosition3[this.i] * 100;
			this.slotSprite3[this.i].x = this.initalX + this.i * 105;
			this.slotSprite3[this.i].y = 315;
			this.stage.addChild(this.slotSprite3[this.i]);
			this.i++;
		}
		this.stage.addChild(imgBody);
		this.stage.addChild(imgButton);
		var line1 = new PIXI.Graphics();
		var line2 = new PIXI.Graphics();
		var winnerCheck = new PIXI.Graphics();
		var winnerCheck2 = new PIXI.Graphics();
		var arrowRight = new PIXI.Graphics();
		var arrowLeft = new PIXI.Graphics();
		arrowLeft.beginFill(10800128);
		arrowLeft.moveTo(545,635);
		arrowLeft.lineTo(565,620);
		arrowLeft.lineTo(565,630);
		arrowLeft.lineTo(605,630);
		arrowLeft.lineTo(605,640);
		arrowLeft.lineTo(565,640);
		arrowLeft.lineTo(565,650);
		arrowRight.beginFill(10800128);
		arrowRight.moveTo(763,635);
		arrowRight.lineTo(743,620);
		arrowRight.lineTo(743,630);
		arrowRight.lineTo(703,630);
		arrowRight.lineTo(703,640);
		arrowRight.lineTo(743,640);
		arrowRight.lineTo(743,650);
		var stakeValue = "100";
		var stake = new PIXI.Text(stakeValue,creditStyle);
		stake.y = 625;
		stake.x = 640;
		this.stage.addChild(arrowLeft);
		this.stage.addChild(arrowRight);
		this.stage.addChild(line1);
		this.stage.addChild(line2);
		this.stage.addChild(winnerCheck);
		this.stage.addChild(stake);
		arrowLeft.interactive = true;
		arrowRight.interactive = true;
		var minButton = new PIXI.Text("MIN",volumeStyle);
		minButton.x = 470;
		minButton.y = 624;
		minButton.interactive = true;
		this.stage.addChild(minButton);
		var maxButton = new PIXI.Text("MAX",volumeStyle);
		maxButton.x = 797;
		maxButton.y = minButton.y;
		maxButton.interactive = true;
		this.stage.addChild(maxButton);
		var tv = new PIXI.Graphics();
		tv.beginFill(16737996);
		tv.lineStyle(17,0,1);
		tv.moveTo(390,100);
		tv.lineTo(390,420);
		tv.lineTo(923,420);
		tv.lineTo(923,100);
		tv.lineTo(390,100);
		var tvAntena1 = new PIXI.Graphics();
		tvAntena1.lineStyle(10,0,1);
		tvAntena1.moveTo(600,100);
		tvAntena1.quadraticCurveTo(480,20,430,20);
		var tvAntena2 = new PIXI.Graphics();
		tvAntena2.lineStyle(10,0,1);
		tvAntena2.moveTo(700,100);
		tvAntena2.quadraticCurveTo(820,20,850,20);
		var tvAntenaEnd1 = new PIXI.Graphics();
		tvAntenaEnd1.lineStyle(0);
		tvAntenaEnd1.beginFill(0);
		tvAntenaEnd1.drawCircle(850,18,13);
		tvAntenaEnd1.endFill();
		var tvAntenaEnd2 = new PIXI.Graphics();
		tvAntenaEnd2.lineStyle(0);
		tvAntenaEnd2.beginFill(0);
		tvAntenaEnd2.drawCircle(430,18,13);
		tvAntenaEnd2.endFill();
		var congrStyle = { font : "bold 30px Arial", align : "center", fill : "#A4CC00"};
		var congr = new PIXI.Text("Prekidamo politički program\n zbog ekskluzivnih  vesti!\n Nepoznati kladioničar\n osvojio brdo keša!",congrStyle);
		congr.x = 450;
		congr.y = 170;
		var winnStyle = { font : "bold 12px Arial", align : "center", fill : "#A4CC00"};
		var showWinn = new PIXI.Text("0",winnStyle);
		showWinn.x = 740;
		showWinn.y = 13;
		this.stage.addChild(winnerCheck2);
		var INC_0 = 25;
		var INC_1 = 35;
		var INC_2 = 50;
		var INC_3 = 70;
		var INC_4 = 100;
	}
});
var Perf = $hx_exports.Perf = function(pos,offset) {
	if(offset == null) offset = 0;
	if(pos == null) pos = "TR";
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) this._memoryObj = Reflect.field(this._perfObj,"memory");
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) this._createMemoryDom();
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame)); else if(window.mozRequestAnimationFrame != null) this.RAF = window.mozRequestAnimationFrame; else if(window.webkitRequestAnimationFrame != null) this.RAF = window.webkitRequestAnimationFrame; else if(window.msRequestAnimationFrame != null) this.RAF = window.msRequestAnimationFrame;
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame)); else if(window.mozCancelAnimationFrame != null) this.CAF = window.mozCancelAnimationFrame; else if(window.webkitCancelAnimationFrame != null) this.CAF = window.webkitCancelAnimationFrame; else if(window.msCancelAnimationFrame != null) this.CAF = window.msCancelAnimationFrame;
	if(this.RAF != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
};
Perf.prototype = {
	_tick: function(val) {
		var time;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) time = this._perfObj.now(); else time = new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) this.fps.style.backgroundColor = Perf.FPS_BG_CLR; else if(this.currentFps >= 15) this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR; else this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
	}
	,_createDiv: function(id,top) {
		if(top == null) top = 0;
		var div;
		var _this = window.document;
		div = _this.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) frac = 0;
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) return "0";
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck?48:32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
};
var Reflect = function() { };
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.DELAY_TIME = 4000;
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

//# sourceMappingURL=main.js.map