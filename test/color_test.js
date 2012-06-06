/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/

/*global RGB:true */
(function($) {

    /**
     * Returns true if both parameters have the same set of starting characters,
     * aproximating a "almost equal" check.
     * 
     * This is neccessary due to some precision loss when RGB color values are
     * converted from hexadecimal and stored internally as decimal floats.
     * 
     * @param {Object} arg1
     * @param {Object} arg2
     */
    function roughlyEquals(arg1, arg2) {
        return (arg2 + "").startsWith(arg1) || (arg1 + "").startsWith(arg2);
    }

    
    module("RGB");
    
    test("RGB values", function() {
        var rgb = new RGB(0, 127, 255);        

        equal(0.0, rgb.r);                        // 0%
        ok(roughlyEquals(0.498, rgb.g));  // 49%  - integer precision loss
        equal(1.0, rgb.b);                        // 100%
    });
    
    test("RGB stringify", function() {
        var rgb = new RGB(0, 127, 255);
        equal("rgb(0, 127, 255)", rgb.string());
    });    
    
    
    module("RGB#hex");    
    
    test("RGB from 3-digit hex", function() {
        var rgb = new RGB("#08f");

        equal(0.0, rgb.r);                     // 0%
        ok(roughlyEquals(0.5, rgb.g));  // 53%  - single digit hex precision loss
        equal(1.0, rgb.b);                    // 100%
    });
        
    test("RGB from 6-digit hex", function() {
        var rgb = new RGB("#007fff");

        equal(0.0, rgb.r);                        // 0%
        ok(roughlyEquals(0.498, rgb.g));  // 49%  - integer precision loss
        equal(1.0, rgb.b);                        // 100%           
    });
    
    test("RGB from unidentified hex", function() {
        var rgb = new RGB("007fff");        
        equal("#007fff", rgb.hex());
    });

    test("RGB to hex", function() {
        var rgb = new RGB(0, 127, 255);        
        equal("#007fff", rgb.hex());
    });
    
    
    module("RGB manipulations");
    
    test("Mix RGB with color", function() {
        var red = new RGB(255, 0, 0);
        var blue = new RGB(0, 0, 255);
        
        equal("#800080", red.mix(blue, 0.5).hex());    
        equal("#800080", blue.mix(red, 0.5).hex());            
    });
    
    test("Darken by pecentage", function() {
        var red = new RGB(255, 0, 0);
        equal("#800000", red.darken(50).hex());            
        equal("#330000", red.darken(80).hex());
        equal("#000000", red.darken(100).hex());
    });
    
    test("Lighten by percentage", function() {
        var red = new RGB(255, 0, 0);
        equal("#ff8080", red.lighten(50).hex());            
        equal("#ffcccc", red.lighten(80).hex());
        equal("#ffffff", red.lighten(100).hex());        
    });
    
    test("Calculate colors between", function() {
        var red = new RGB(255, 0, 0);
        var blue = new RGB(0, 0, 255);
        
        var ary = red.tween(blue, 5);
        
        equal("#ff0000", ary[0].hex());        
        equal("#cc0033", ary[1].hex());        
        equal("#990066", ary[2].hex());        
        equal("#660099", ary[3].hex());        
        equal("#3300cc", ary[4].hex());        
    });
    
} (jQuery));
