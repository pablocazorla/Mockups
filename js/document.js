// Document

;(function($,m){
	'use strict';

	var doc = function(options){
			return this.init(options);
		},
		idCounterDoc = 0;

	doc.prototype = {
		init:function(options){
			this.id = idCounterDoc++;
			this.prop = $.extend({
				width: 1200,
				height:1600
			},options);

			this.pageCounter = 1;
			this.pages = [];
			this.length = 0;
			this.currentPage = null;
			this.addPage();

			return this;
		},
		addPage:function(name){
			var n = name || 'page-'+ this.pageCounter++;

			var newPage = Mockup.createPage(n);
			this.pages.push(newPage);
			this.length++;
			return this.selectPage(newPage);
		},
		selectPage: function(pageSelected){
			for(var i = 0; i < this.length; i++){
				if(this.pages[i].id === pageSelected.id){
					this.currentPage = pageSelected;
				}
			}
			return this;
		},
		render:function(){
			this.currentPage.render();
		}

	};

	/*************************/

	m.documents = [];
	m.currentDocument = null;

	m.createDocument =  function(options){
		var newDoc = new doc(options);

		m.documents.push(newDoc);
		m.selectDocument(newDoc);

		return newDoc;
	};
	m.selectDocument = function(docSelected){
		var l = m.documents.length;
		for(var i = 0; i < l; i++){
			if(m.documents[i].id === docSelected.id){
				m.currentDocument = docSelected;
			}
		}
	};

})(jQuery, Mockup);