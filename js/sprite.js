// Document

Mockup.createSprite = (function($, m) {
	'use strict';

	var spr = function(type, options, draw) {
			return this.init(type, options, draw);
		},
		idCounterSprite = 0;

	spr.prototype = {
		init: function(type, options, draw) {
			this.id = idCounterSprite++;
			this.type = type || 'box';
			this.prop = $.extend({
				x: m.observable(10),
				y: m.observable(12),
				width: m.observable(200),
				height: m.observable(120),

				borderColor: m.observable('#F00')
			}, options);
			this.draw = draw || function() {
				m.c.strokeStyle = this.prop.borderColor.val;
				m.c.beginPath();
				m.c.moveTo(this.prop.x.val, this.prop.y.val);
				m.c.lineTo(this.prop.x.val + this.prop.width.val, this.prop.y.val);
				m.c.lineTo(this.prop.x.val + this.prop.width.val, this.prop.y.val + this.prop.height.val);
				m.c.lineTo(this.prop.x.val, this.prop.y.val + this.prop.height.val);
				m.c.lineTo(this.prop.x.val, this.prop.y.val);
				m.c.closePath();
				m.c.stroke();
			};

			this.childs = [];
			this.length = 0;
			/*
						var self = this;
						setTimeout(function(){
						self.prop.x(300);
						self.prop.y(230);
					},6000);


			*/

			return this;
		},
		render: function() {
			this.draw.apply(this, []);
		}
	};

	return function(type, options, draw) {
		return new spr(type, options, draw);
	}

})(jQuery, Mockup);