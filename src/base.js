Object.extend(Object, {
	/**
	 * Original concept: addMethod - By John Resig (MIT Licensed), 
	 * http://ejohn.org/blog/javascript-method-overloading/
	 * 
	 * Overloads a method of a given object. Allows the 
	 * calling of multiple functions based on the arguments they accept.
	 * 
	 * Object.overload(Date, {
	 * 		parse: [
	 * 			function(string) {
	 * 				// parse date string
	 * 			},
	 * 
	 * 			function(string, format) {
	 * 				// parse date string in given format
 	 *			}
 	 *		] 
	 * });
	 * 
	 * @param {Object} object
	 * @param {Hash} source
	 */	
    overload: function(object, source) {
		for (var property in source) {
        	source[property].each(function(fn) {
	    		var old = object[property];		
                object[property] = function(){
		        	if (fn.length == arguments.length) {
						return fn.apply(this, arguments);
					} else {
						if (typeof old == 'function') return old.apply(this, arguments);
					}
	    		};			
			});
		}	
	}
});