;
(function() {
	'use strict';

	var sp = function() {
		this.tipo = 'Sprite';
		this.say = function() {
			console.log('Soy un ' + this.tipo + ' con variable: ' + this.cosa);
		}
	};

	window.Sprite = function() {
		return new sp;
	}

	window.Sprite.extend = function(fn) {
		var c = fn;
		c.prototype = new sp;
		return c;
	}

})();

var s = Sprite();
var Cuadro = Sprite.extend(function(nom) {
	var n = nom || 'CUAD';
	this.tipo = 'Cuadro';
	this.cosa = n;
	this.say = function() {
		console.log('Otra cosa:' + this.cosa);
	}



});

/*
var Cuadro = function(){
	this.tipo = 'Cuadro';
	this.cosa = 'nose';
}
Cuadro.prototype = new Sprite();
*/

var q = new Cuadro('GG');
var s = new Sprite();
var q2 = new Cuadro('LOLO');

s.cosa = 'Pab';
q.say();
q2.say();
s.say();