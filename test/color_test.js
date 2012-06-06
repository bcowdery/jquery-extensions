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

        equal(0.0, rgb.r);          // 0%        
        ok(/0\.498/.test(rgb.g)); // 49% - integer precision loss                
        equal(1.0, rgb.b);          // 100%
    });
    
    test("RGB stringify", function() {
        var rgb = new RGB(0, 127, 255);
        equal("rgb(0, 127, 255)", rgb.string(), "expected rgb color code as a string");
    });    
    
    
    module("RGB#hex");    
    
    test("RGB from 3-digit hex", function() {
        var rgb = new RGB("#08f");

        equal("#0088ff", rgb.hex(), "expected 3-digit hex value to be parsed correctly");
        
        equal(0.0, rgb.r);          // 0%        
        ok(/0\.533/.test(rgb.g)); // 53% - integer precision loss                
        equal(1.0, rgb.b);          // 100%        
    });
        
    test("RGB from 6-digit hex", function() {
        var rgb = new RGB("#007fff");

        equal(0.0, rgb.r);          // 0%        
        ok(/0\.498/.test(rgb.g)); // 49% - integer precision loss                
        equal(1.0, rgb.b);          // 100%                
    });
    
    test("RGB from unidentified hex", function() {
        var rgb = new RGB("007fff");        
        equal("#007fff", rgb.hex(), "expected unidentified hex value to be parsed correctly");
    });

    test("RGB to hex", function() {
        var rgb = new RGB(0, 127, 255);        
        equal("#007fff", rgb.hex(), "expected integer RGB values to be converted to hex");
    });
    
    
    module("RGB manipulations");
    
    test("Mix RGB with color", function() {
        var red = new RGB(255, 0, 0);
        var blue = new RGB(0, 0, 255);
        
        equal("#800080", red.mix(blue, 0.5).hex(), "expected red mixed with 50% blue");    
        equal("#800080", blue.mix(red, 0.5).hex(), "expected blue mixed with 50% red");            
    });
    
    test("Darken by pecentage", function() {
        var red = new RGB(255, 0, 0);
        equal("#800000", red.darken(50).hex(), "expected red darkened by 50%");            
        equal("#330000", red.darken(80).hex(), "expected red darkened by 80%");
        equal("#000000", red.darken(100).hex(), "expected red darkened by 100% to be black");
    });
    
    test("Lighten by percentage", function() {
        var red = new RGB(255, 0, 0);
        equal("#ff8080", red.lighten(50).hex(), "expected red lightened by 50%");            
        equal("#ffcccc", red.lighten(80).hex(), "expected red lightened by 80%");            
        equal("#ffffff", red.lighten(100).hex(), "expected red lightened by 100% to be white");
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
