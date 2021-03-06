Mockup = (function($) {
	'use strict';

	// Request Animation Frames
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 20);
	};

	var dom = false;

	var headerOpen = true;

	var m = {
		cfg: {
			canvasId: 'mck-canvas',
			canvasContainerId: 'mck-canvas-container'
		},
		domReady: function() {
			if (!dom) {
				dom = true;
				m.$canvas = $('#' + m.cfg.canvasId);
				m.canvas = m.$canvas[0];
				m.c = m.canvas.getContext('2d');
				m.$window = $(window);

				/* Sidebar Tabs **********/
				m.$mckSidebarTab = $('.mck-sidebar-tab');
				m.$mckSidebarTab.click(function() {
					m.sidebarTab($(this).attr('data-tab'));
				});
				m.$mckSidebarContent = $('.mck-sidebar-content');
				m.render();
				m.propertiesPanel.init();

				/* Modal *****************/
				m.Modal.init();

				/* Doc Tabber *****************/
				m.docTabber.init();
			}
			return m;
		},
		sidebarTab: function(tab) {
			m.$mckSidebarTab.add(m.$mckSidebarContent).removeClass('current');
			$('#mck-sidebar-tab-' + tab + ', #mck-sidebar-content-' + tab).addClass('current');
			return m;
		},
		observable: function(vInitial) {
			var f = function(v,running) {
				var r = running || 'run';
				if (typeof v !== 'undefined' && v !== f.val) {
					f.val = v;
					if(r === 'run'){
						run();
					}					
				}
				return this.val;
			};
			f.val = vInitial;

			var subscriptions = [],
				length = 0,
				run = function() {
					for (var i = 0; i < length; i++) {
						subscriptions[i].apply(null, [f.val]);
					}
				};

			f.subscribe = function(fn) {
				subscriptions.push(fn);
				length++;
				return f;
			};
			f.unsubscribe = function() {
				subscriptions = [];
				length = 0;
				return f;
			};
			f.update = function() {
				run();
				return f;
			};
			return f;
		},
		capitalize: function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		render: function() {
			var renderCanvas = function() {
				if (m.currentDocument !== null) {
					m.c.clearRect(0, 0, m.canvas.width, m.canvas.height);
					m.currentDocument.render();
				}
				window.requestAnimationFrame(renderCanvas);
			};
			renderCanvas();
		}
	};

	return m;
})(jQuery);