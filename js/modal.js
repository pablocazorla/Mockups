// Modal

/*

<div class="mck-row">
  <div class="mck-col mck-s1">
    <label class="full">Title:</label>
    <input class="full" type="text" value="" placeholder="Title of the document" />
  </div>
</div>

<h3>Size</h3>

<div class="mck-row">
  <div class="mck-col mck-s1_2">
    <label class="full">Predefined sizes:</label>
    <select class="full">
      <option value="0">1920 x 1080 px</option>
      <option value="1" selected>1400 x 1000 px</option>
      <option value="2">1280 x 720 px</option>
      <option value="3">1024 x 768 px</option>
      <option value="4">768 x 1024 px</option>
      <option value="5">640 x 480 px</option>
      <option value="6">480 x 320 px</option>
      <option value="7">320 x 480 px</option>
    </select>
  </div>
  <div class="mck-col mck-s1_2">
    <p>
      <label>Width:</label>
      <input type="number" value="1400" /> px</p>
    <p>
      <label>Height:</label>
      <input type="number" value="1000" /> px</p>
  </div>
</div>

*/

/*

<a href="" class="btn btn-primary btn-big">Ok</a> <a href="" class="btn btn-link secondary btn-big">Cancel</a>

*/

Mockup.Modal = (function($, m) {
	'use strict';

	var $modal,
		$dimmer,
		$body,
		$close,
		$title,
		$content,
		$actions,
		duration = 300,
		opened = false,

		resizing = function() {

			if (opened) {
				var top = Math.round((m.$window.height() - $body.outerHeight()) / 2);
				top = (top < 0) ? 0 : top;
				$body.css({
					'top': top + 'px'
				});
			}
		}

	var mod = {
		init: function() {
			$modal = $('#mck-modal');
			$dimmer = $('#mck-modal-dimmer');
			$body = $('#mck-modal-body');
			$close = $('#mck-modal-close');
			$title = $('#mck-modal-title');
			$content = $('#mck-modal-content');
			$actions = $('#mck-modal-actions');

			m.$window.resize(resizing);

			$close.add($dimmer).click(function() {
				mod.close();
			});
		},
		title: function(str) {
			$title.text(str);
			return mod;
		},
		content: function(h) {
			if (typeof h === 'string') {
				$content.html(h);
			} else {
				$content.html('');
				$content.append(h);
			}
			return mod;
		},
		actions: function(h) {
			if (typeof h === 'string') {
				$actions.html(h);
			} else {
				$actions.html('');
				$actions.append(h);
			}
			return mod;
		},
		open: function() {
			if (!opened) {
				opened = true;
				$modal.fadeIn(duration);
				resizing();
			}
			return mod;
		},
		close: function() {
			if (opened) {
				opened = false;
				$modal.fadeOut(duration);
			}
			return mod;
		}
	};

	return mod;

})(jQuery, Mockup);