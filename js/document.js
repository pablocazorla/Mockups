// Document

;
(function($, m) {
	'use strict';

	var doc = function(options) {
			return this.init(options);
		},
		idCounterDoc = 0;

	doc.prototype = {
		init: function(options) {
			var cfg = $.extend({
				title: 'Untitled-' + idCounterDoc,
				width: 1200,
				height: 1600
			}, options);

			this.id = idCounterDoc++;

			this.prop = {
				title: m.observable(cfg.title),
				width: m.observable(cfg.width),
				height: m.observable(cfg.height)
			};

			this.pageCounter = 1;
			this.pages = [];
			this.length = 0;
			this.currentPage = null;
			this.addPage();

			return this;
		},
		addPage: function(name) {
			var n = name || 'page-' + this.pageCounter++;

			var newPage = Mockup.createPage(n);
			this.pages.push(newPage);
			this.length++;
			return this.selectPage(newPage);
		},
		selectPage: function(pageSelected) {
			for (var i = 0; i < this.length; i++) {
				if (this.pages[i].id === pageSelected.id) {
					this.currentPage = pageSelected;
				}
			}
			return this;
		},
		render: function() {
			this.currentPage.render();
		}

	};

	/*************************/

	m.documents = [];
	m.currentDocument = null;

	m.createDocument = function(options) {
		var newDoc = new doc(options);
		m.docTabber.createTab(newDoc);
		m.documents.push(newDoc);
		m.selectDocument(newDoc.id);

		return newDoc;
	};
	m.selectDocument = function(idDoc) {
		var l = m.documents.length;
		for (var i = 0; i < l; i++) {
			if (m.documents[i].id === idDoc) {
				m.currentDocument = m.documents[i];
				m.docTabber.selectTab(idDoc);
			}
		}
	};
	m.closeDocument = function(idDoc) {
		var l = m.documents.length,
			indexDoc;
		for (var i = 0; i < l; i++) {
			if (m.documents[i].id === idDoc) {
				indexDoc = i;
			}
		}

		m.docTabber.closeTab(idDoc);
		m.documents.splice(indexDoc, 1);

		// if it is the current document:
		if (m.currentDocument.id == idDoc) {
			if (m.documents.length > 0) {
				var ne = indexDoc - 1;
				ne = (ne < 0) ? 0 : ne;
				m.selectDocument(m.documents[ne].id);
			} else {
				m.currentDocument = null;
			}
		}



	};

})(jQuery, Mockup);