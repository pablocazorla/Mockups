// Doc Tabber
Mockup.docTabber = (function($, m) {
	'use strict';

	var $tabber, $addBtn, closing = false;

	/*

		<div class="mck-doc-tab current">
			<div class="mck-doc-tab-label">Untitled-1</div><i class="mck-doc-tab-close fa fa-times-circle"  title="Close document"></i>
		</div>

	*/

	var createTab = function(doc) {
			var $tab = $('<div class="mck-doc-tab mck-for-doc" data-id="' + doc.id + '"/>').insertBefore($addBtn),
				$title = $('<div class="mck-doc-tab-label"/>').appendTo($tab),
				$close = $('<i class="mck-doc-tab-close fa fa-times-circle"  title="Close document"></i>').appendTo($tab);

			doc.prop.title.subscribe(function(v) {
				$title.text(v);
			}).update();
			$title.click(function() {
				m.selectDocument(doc.id);
			});
			

			$close.click(function() {
				if (!closing) {
					m.closeDocument(doc.id);
				}
			});
		},
		selectTab = function(idDoc) {
			$tabber.find('.mck-for-doc').removeClass('current').each(function() {
				var $this = $(this),
					idTab = parseInt($this.attr('data-id'));
				if (idTab === idDoc) {
					$this.addClass('current');
				}
			});
		},
		closeTab = function(idDoc) {
			$tabber.find('.mck-for-doc').each(function() {
				var $this = $(this),
					idTab = parseInt($this.attr('data-id'));
				if (idTab === idDoc) {
					closing = true;
					$this.animate({
						'width': '0',
						'padding': '0',
						'margin-right': '0',
						'opacity': '0'
					}, 400, function() {
						$this.remove();
						closing = false;
					});
				}
			});
		};
		/*
		createDocModal = function() {

			var $cont = $('<div/>'),
				$r1 = $('<div class="mck-row"/>').appendTo($cont),

				$c1 = $('<div class="mck-col mck-s1"><label class="full">Title:</label></div>').appendTo($r1),

				$inputTitle = $('<input class="full" type="text" value="" placeholder="Title of the document" />').appendTo($c1);

			$cont.append('<h3>Size</h3>');

			var $r2 = $('<div class="mck-row"/>').appendTo($cont),

				$c2 = $('<div class="mck-col mck-s1_2"> <label class="full">Predefined sizes:</label></div>').appendTo($r2),

				sel = '<select class="full">';

			sel += '<option value="1920x1080">1920 x 1080 px</option>';
			sel += '<option value="1400x1000" selected>1400 x 1000 px</option>';
			sel += '<option value="1280x720">1280 x 720 px</option>';
			sel += '<option value="1024x768">1024 x 768 px</option>';
			sel += '<option value="768x1024">768 x 1024 px</option>';
			sel += '<option value="640x480">640 x 480 px</option>';
			sel += '<option value="480x320">480 x 320 px</option>';
			sel += '<option value="320x480">320 x 480 px</option>';
			sel += '</select>';

			var $selectSizes = $(sel).appendTo($c2),
				$c3 = $('<div class="mck-col mck-s1_2"/> ').appendTo($r2),
				$p1 = $('<p><label>Width:</label></p>').appendTo($c3),
				$inputWidth = $('<input type="number" value="1400" />').appendTo($p1);
			$p1.append('<span>px</span>');

			var $p2 = $('<p><label>Height:</label></p>').appendTo($c3),
				$inputHeight = $('<input type="number" value="1000" />').appendTo($p2);
			$p2.append('<span>px</span>');

			var setSizesBySelect = function() {
				var st = $selectSizes.val().split('x');
				$inputWidth.val(parseInt(st[0]));
				$inputHeight.val(parseInt(st[1]));
			};
			setSizesBySelect();
			$selectSizes.change(setSizesBySelect);

			var $acc = $('<div/>'),
				$b1 = $('<a href="" class="btn btn-primary btn-big">Ok</a>').appendTo($acc),
				$b2 = $('<a href="" class="btn btn-link secondary btn-big">Cancel</a>').appendTo($acc);

			$b2.click(function(e) {
				e.preventDefault();
				m.Modal.close();
			});

			$b1.click(function(e) {
				e.preventDefault();
				m.createDocument({
					title: $inputTitle.val(),
					width: parseInt($inputWidth.val()),
					height: parseInt($inputHeight.val())
				});
				m.Modal.close();
			});

			m.Modal.title('New document').content($cont).actions($acc).open();
		};
		*/

	return {
		init: function() {
			$tabber = $('#mck-doc-tabber');
			$addBtn = $('#mck-doc-tab-plus').click(function() {
				//createDocModal();
				m.createDocument();
			});
		},
		//createDocModal: createDocModal,
		createTab: createTab,
		selectTab: selectTab,
		closeTab: closeTab
	};
})(jQuery, Mockup);