// Properties Panel

Mockup.propertiesPanel = (function($,m){
	'use strict';
	var $panSprite,
		$panDocument,
		$panMultiple,
		$pans,

		previousSpriteSelected = null,
		unsubscribeSprite = function(){
			if(previousSpriteSelected !== null){
				for(var a in previousSpriteSelected.prop){
					previousSpriteSelected.prop[a].unsubscribe();
				}
				previousSpriteSelected = null;
			}
		};


	return {
		init:function(){
			$panSprite = $('#mck-sprite-properties');
			$panDocument = $('#mck-document-properties');
			$panMultiple = $('#mck-multiple-properties');
			$pans = $panSprite.add($panDocument).add($panMultiple);
		},
		update:function(){
			$pans.hide();
			unsubscribeSprite();
			switch(m.selection.type){
				case 'null':
					// show document
					$panDocument.show();
					break;
				case 'multiple':
					// show multiple
					$panMultiple.show();
					break;
				case 'sprite':
					// show sprite
					$panSprite.show().find('.mck-col').hide();
					var s = m.selection.selected,
						subs = function(a){
							var $c = $('#mck-prop-'+a).show(),
							$f = $c.find('.mck-field .val'),
							$i = $c.find('.mck-field input');

							s.prop[a].subscribe(function(v){
								$f.text(v+'px');
							}).update();
						};
					// start new subscriptions
					for(var o in s.prop){
						subs(o);
					}
					previousSpriteSelected = s;




					break;
			}
			
		}
	};
})(jQuery,Mockup);