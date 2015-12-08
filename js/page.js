// Page

Mockup.createPage = (function($){
	'use strict';

	var pag = function(name){
			return this.init(name);
		},
		idCounterPag = 0;

	pag.prototype = {
		init:function(name){
			this.id = idCounterPag++;
			this.name = name || 'page';

			this.sprites = [];
			this.length = 0;

			return this;
		},
		addSprite:function(options){
			var newSprite = Mockup.createSprite(options);
			this.sprites.push(newSprite);
			this.length++;
			Mockup.selection(newSprite);
			return this;
		},
		render:function(){
			for(var i = 0; i < this.length; i++){
				this.sprites[i].render();
			}
		}
	};

	return function(name){
		return new pag(name);
	}

})(jQuery);