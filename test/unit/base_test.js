
new Test.Unit.Runner({
	testOverload: function() {
		Object.overload(Object, { 
			someMethod: [
				function(one) {
					return one;		
				},			
				function(one, two) {
					return one + two;
				}
			]
		});
			
		this.assertEqual("a", Object.someMethod("a"));
		this.assertEqual("ab", Object.someMethod("a", "b"));			
	},

	testOverloadExisting: function() {
		var longDate = Date.parse("01/10/2007");
	
		Object.overload(Date, {
			parse: [
				function(string, format) {
					return string + format;			
				}
			]
		});
		
		this.assertEqual("ab", Date.parse("a", "b"));
		this.assertEqual(longDate, Date.parse("01/10/2007"));
	}
});
