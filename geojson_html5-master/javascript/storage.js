/*
 * Storage.js - v1.2 - 2015-10-30
 * Created by Andreas Nylin
 * andreas.nylin@gmail.com / @andreasnylin / andreasnylin.com
 */
(function(win){
	'use strict';

	win.Storage = function(name) {

		if(!('JSON' in win)) {
			throw('This browser does not support JSON which is required by Storage.');
			return;
		}

		return new function() {

			this.name = name;
			this.data = JSON.parse(localStorage.getItem(name)) || {};

			function updateStorage(storage) {
				localStorage.setItem(storage.name, JSON.stringify(storage.data));
			}

			this.clear = function() {
				localStorage.removeItem(this.name);
				delete this.name;
				delete this.data;
			};

			this.get = function(itemName) {
				return this.data[itemName];
			};

			this.set = function(itemName, value) {
				this.data[itemName] = value;
				updateStorage(this);
			};

			this.remove = function(itemName) {
				delete this.data[itemName];
				updateStorage(this);
			};

			this.unset = function(itemName) {
				this.data[itemName] = undefined;
				updateStorage(this);
			};
		}

	}
})(window);