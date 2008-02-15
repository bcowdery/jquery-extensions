Object.extend(String.prototype, {
	/**
	 * Compares the contents of this string with another given string ignoring case.
	 * @param {String} value
	 */
  	equalsIgnoreCase: function(value) {
  		if (value != null) {
			return this.toLowerCase() == value.toLowerCase() ? true : false;
		} else {
			return false;
		}
  	}
});