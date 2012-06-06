/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

    module("String functions");

	test("equals ignore case", function() {
		equal(true, "String".equalsIgnoreCase("string"), "strings equalsregardless of case");		
        equal(false, "String".equalsIgnoreCase("not string"), "different character strings are not equal");
		equal(false, "String".equalsIgnoreCase(null), "strings are not equal to null");
	});
    
} (jQuery));
