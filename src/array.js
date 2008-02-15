Object.extend(Array.prototype, {
	/**
	 * Inserts a value into this array instance, shifting all remaining elements left.
	 * 
	 * var ary = [1, 2, 3];
	 * ary.insert("a", 1); -> [1, "a", 2, 3];
	 * 
	 * @param {Object} value
	 * @param {Number} index
	 */
	insert: function(value, index) {
		if (index < 0) index = 0;
		for (var i = this.size(); i > index; i--) {
		    this[i] = this[i-1];
		}
		this[index] = value;
		return this;
	}
});


