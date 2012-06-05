jQuery.extend(String.prototype, {
    /**
     * Compares the contents of this string with another given string ignoring case.
     * @param {String} value
     */
      equalsIgnoreCase: function(value) {
          return (value !== null ? this.toLowerCase() === value.toLowerCase() : false);
      }
});