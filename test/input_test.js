/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

(function($) {

    // DOM element under test
    var empty;
    
    module("SELECT", {
        setup: function() {
            empty = document.createElement('select');
        },
        
        teardown: function() {
            empty.clear();    
        }
    });
    
    test("add element", function() {
        var one = new Option(1, "test 1");
        empty.add(one, null);
        equal(one, empty.options[0], "expected option 1 appended to the list");
        
        var two = new Option(2, "test 2");
        empty.add(two, one);
        equal(two, empty.options[0], "expected option 2 appended to the list");
        
        var three = new Option(3, "test 3");
        empty.add(three, null);
        equal(three, empty.options[2], "expected option 3 appended to the list");            
    });
    
    test("add element in IE", function() {            
        if (jQuery.browser.msie) {                
            var one = new Option(1, "test 1");
            empty.add(one);
            equal(one, empty.options[0], "option added to select using compliant add method");            
        } else {
            ok(true, "not running in IE, no assertions to run");
        }
    });
    
    test("clear all options", function() {
        var option = new Option("test", "test");
        empty.add(option, null);
        empty.add(option, null);            
        empty.clear();            
        
        equal(0, empty.options.length, "expected empty option list");        
    });

} (jQuery));