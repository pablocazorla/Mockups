Mockup = (function($){
	'use strict';

	var dom = false;

	var headerOpen = true;

	var m = {
		cfg:{
			canvasId:'mck-canvas',
			canvasContainerId:'mck-canvas-container'
		},
		domReady:function(){
			if(!dom){
				dom = true;
				m.$canvas = $('#'+m.cfg.canvasId);
				m.canvas = m.$canvas[0];
				m.c = m.canvas.getContext('2d');

				/* HEADER *****************/
				m.$body = $('body');
				$('#mck-header-toggle').click(function(){
					m.toggleHeader();
				});

				/* Sidebar Tabs **********/
				m.$mckSidebarTab = $('.mck-sidebar-tab');
				m.$mckSidebarTab.click(function(){
					m.sidebarTab($(this).attr('data-tab'));
				});
				m.$mckSidebarContent = $('.mck-sidebar-content');
				m.render();
				m.propertiesPanel.init();		
			}
			return m;		
		},
		sidebarTab:function(tab){
			m.$mckSidebarTab.add(m.$mckSidebarContent).removeClass('current');
			$('#mck-sidebar-tab-'+tab+', #mck-sidebar-content-'+tab).addClass('current');
			return m;
		},
		toggleHeader:function(flag){
				headerOpen =(typeof flag === 'undefined')? headerOpen : !flag;

			if(headerOpen){
				m.$body.addClass('mck-hidden-header');
				headerOpen = false;
			}else{
				m.$body.removeClass('mck-hidden-header');
				headerOpen = true;
			}
			return m;
		},
		observable:function(vInitial){
			var f = function(v){
					if(typeof v !== 'undefined' && v !== f.val){
						f.val = v;
						run();
					}
					return this.val;
				};
				f.val = vInitial;

			var	subscriptions = [],
				length = 0,
				run = function(){
					for(var i=0;i<length;i++){
						subscriptions[i].apply(null,[f.val]);
					}
				};				

			f.subscribe = function(fn){
				subscriptions.push(fn);
				length++;
				return f;
			};
			f.unsubscribe = function(){
				subscriptions = [];
				length = 0;
				return f;
			};
			f.update = function(){
				run();
				return f;
			};
			return f;				
		},
		render : function(){
			var r = function(){
				if(typeof m.currentDocument !== null){
					m.c.clearRect(0,0,m.canvas.width,m.canvas.height);
					m.currentDocument.render();
				}
			};
			setInterval(r,30);
		}
	};

	return m;
})(jQuery);



