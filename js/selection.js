// Selection
Mockup.selection = (function($){
	'use strict';

	var f = function(elem){
			if(typeof elem === 'undefined' || typeof elem === 'null'){
				f.selected = null;
				f.type = 'null';
			}else{
				f.selected = elem;
				f.type = (typeof elem.prop === 'undefined') ? 'multiple' : 'sprite';
			}
			Mockup.propertiesPanel.update();
		};
	f.selected = null;
	f.type = 'null';

	return f;
})(jQuery);