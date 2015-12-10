// Properties Panel

Mockup.propertiesPanel = (function($, m) {
	'use strict';
	var $panSprite,
		$titleSprite,
		$rowSprite,
		$panDocument,
		$panMultiple,
		$pans,
		spriteSelected = null,
		previousSpriteSelected = null,
		unsubscribeSprite = function() {
			if (previousSpriteSelected !== null) {
				for (var a in previousSpriteSelected.prop) {
					previousSpriteSelected.prop[a].unsubscribe();
				}
				previousSpriteSelected = null;
			}
		};

	//*******************************
	/*
	<div id="mck-prop-x" class="mck-col mck-s1_2 mck-col-num">
		<span class="mck-label">x:</span>
		<div class="mck-field"><span class="val"></span><input type="number" value=""/></div>
	</div>
	*/

	// Map for render inputs
	var mapInputs = {
			//o: ['label', 'type', 'size'],	
			x: ['x', 'num', '1_2'],
			y: ['y', 'num', '1_2'],
			width: ['width', 'num', '1_2'],
			height: ['height', 'num', '1_2'],
			borderColor: ['border color', 'color', '2_3']
		},
		addInput = function(o) {
			var va,
				t = mapInputs[o][1],
				$col = $('<div class="mck-col mck-s' + mapInputs[o][2] + ' mck-col-' + t + '"><span class="mck-label">' + mapInputs[o][0] + ':</span></div>').appendTo($rowSprite);

			switch (t) {
				case 'num':

					var $field = $('<div class="mck-field"/>').appendTo($col),
						$span = $('<span class="val">0</span>').appendTo($field),
						$input = $('<input type="number" value=""/>').appendTo($field);

					spriteSelected.prop[o].subscribe(function(v) {
						va = v;
						$span.text(va + 'px');
					}).update();

					var inputVisible = false;
					$span.click(function() {
						$input.val(va).show();
						setTimeout(function() {
							$input.focus();
							inputVisible = true;
						}, 50);

					});

					$input.change(function() {
						if (inputVisible) {
							var iv = parseInt($input.val());
							spriteSelected.prop[o](iv)
						}
					}).blur(function() {
						$input.hide();
						inputVisible = false;
					});
					break;
				case 'color':
					break;
				default:
					//
			}
		};

	var renderSpriteInputs = function() {
		$titleSprite.text(m.capitalize(spriteSelected.type) + ' properties');
		$rowSprite.html('');

		for (var o in spriteSelected.prop) {
			addInput(o);
		}
		previousSpriteSelected = spriteSelected;

	};


	//*******************************
	return {
		init: function() {
			$panSprite = $('#mck-sprite-properties');
			$titleSprite = $('#mck-sprite-properties-title');
			$rowSprite = $('#mck-sprite-properties-row');
			$panDocument = $('#mck-document-properties');
			$panMultiple = $('#mck-multiple-properties');
			$pans = $panSprite.add($panDocument).add($panMultiple);
		},
		update: function() {
			$pans.hide();
			unsubscribeSprite();
			switch (m.selection.type) {
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
					$panSprite.show();
					spriteSelected = m.selection.selected;
					renderSpriteInputs();
					break;
			}

		}
	};
})(jQuery, Mockup);