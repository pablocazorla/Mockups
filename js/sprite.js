// Document

Mockup.createSprite = (function($,m){
	'use strict';

	var spr = function(options){
			return this.init(options);
		},
		idCounterSprite = 0;

	spr.prototype = {
		init:function(options,draw){
			this.id = idCounterSprite++;
			this.prop = $.extend({
				x:m.observable(10),
				y:m.observable(12),
				width:m.observable(200),
				height:m.observable(120)
			},options);
			this.draw = draw || function(){
				m.c.beginPath();
				m.c.moveTo(this.prop.x.val,this.prop.y.val);
				m.c.lineTo(this.prop.x.val+this.prop.width.val,this.prop.y.val);
				m.c.lineTo(this.prop.x.val+this.prop.width.val,this.prop.y.val+this.prop.height.val);
				m.c.lineTo(this.prop.x.val,this.prop.y.val+this.prop.height.val);
				m.c.lineTo(this.prop.x.val,this.prop.y.val);
				m.c.closePath();
				m.c.stroke();
			};

			this.childs = [];
			this.length = 0;

			var self = this;

			setTimeout(function(){
			self.prop.x(300);
			self.prop.y(230);
		},6000);

			return this;
		},
		render:function(){
			this.draw.apply(this,[]);
		}
	};

	return function(options){
		return new spr(options);
	}

})(jQuery,Mockup);