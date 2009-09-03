if (Prototype.Browser.IE) {
	Object.overload(HTMLSelectElement.prototype, {
		add: [		
			/**
			 * Inserts an option into a HTMLSelectElements option array as per DOM Level 2
			 * specifications.
			 *
			 * If 'before' is not defined or null, the given option will be added to the end
			 * of the list, otherwise the given option will be added infront of the given
			 * 'before' element and all other options will be shifted left.
			 *
			 * If the give before element does not exist an Error will be thrown with
			 * DOMException.NOT_FOUND_ERR.
			 *
			 * This method still allows the non-compliant HTMLSelectElement.add(option) function
			 * Internet Explorer.
			 *
			 * @param {Object} element
			 * @param {Object} before
			 */
			function(element, before){
				var array = $A(this.options)
				var index = (before != null) ? array.indexOf(before) : array.size();
				if (index < 0) 
					throw new Error(DOMException.NOT_FOUND_ERR, "Element not found");
				
				array.insert(element, index);
				for (var i = 0; i < array.size(); i++) { 
					this.options[i] = array[i];
				}
			}
		]
	});
}

Object.extend(HTMLSelectElement.prototype, {
	clear: function() {
		this.options.length = 0;
	},
});
