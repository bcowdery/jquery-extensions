/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

    module("Method overloading");

	test('test method overloading', function() {
		jQuery.Class.overload(Object, { 
			someMethod: [
				function(one) {
					return one;		
				},			
				function(one, two) {
					return one + two;
				}
			]
		});
			
		equal("a", Object.someMethod("a"), "expected single argument method to be executed");
		equal("ab", Object.someMethod("a", "b"), "expected dual argument method to be executed");			
	});

	test('test overloading ECMAScript provided method', function() {
		var longDate = Date.parse("01/10/2007");
	
		jQuery.Class.overload(Date, {
			parse: [
				function(string, format) {
					return string + format;			
				}
			]
		});
		
		equal("ab", Date.parse("a", "b"), "expected overloaded method to be executed");
		equal(longDate, Date.parse("01/10/2007"), "expected original method to be executed");
	});
    
} (jQuery));
