
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

new Test.Unit.Runner({
	testRGBValues: function() {
		var rgb = new RGB(0, 127, 255);		

		this.assertEqual(0.0, rgb.r); 	          // 0%
		this.assert(roughlyEquals(0.498, rgb.g)); // 49%  - integer precision loss
		this.assertEqual(1.0, rgb.b);             // 100%
	},
	
	testRGBThreeDigitHex: function() {
		var rgb = new RGB("#08f");

		this.assertEqual(0.0, rgb.r);            // 0%
		this.assert(roughlyEquals(0.5, rgb.g));  // 53%  - single digit hex precision loss
		this.assertEqual(1.0, rgb.b); 			 // 100%
	},
		
	testRGBSixDigitHex: function() {
		var rgb = new RGB("#007fff");

		this.assertEqual(0.0, rgb.r); 	          // 0%
		this.assert(roughlyEquals(0.498, rgb.g)); // 49%  - integer precision loss
		this.assertEqual(1.0, rgb.b);             // 100%	       
	},
	
	testRGBUnidentifiedHex: function() {
		var rgb = new RGB("007fff");		
		this.assertEqual("#007fff", rgb.hex());
	},

	testRGBHex: function() {
		var rgb = new RGB(0, 127, 255);		
		this.assertEqual("#007fff", rgb.hex());
	},
	
	testRGBString: function() {
		var rgb = new RGB(0, 127, 255);
		this.assertEqual("rgb(0, 127, 255)", rgb.string());
	},
	
	testMix: function() {
		var red = new RGB(255, 0, 0);
		var blue = new RGB(0, 0, 255);
		
		this.assertEqual("#800080", red.mix(blue, 0.5).hex());	
		this.assertEqual("#800080", blue.mix(red, 0.5).hex());			
	},
	
	testDarken: function() {
		var red = new RGB(255, 0, 0);
		this.assertEqual("#800000", red.darken(50).hex());			
		this.assertEqual("#330000", red.darken(80).hex());
		this.assertEqual("#000000", red.darken(100).hex());
	},
	
	testLighten: function() {
		var red = new RGB(255, 0, 0);
		this.assertEqual("#ff8080", red.lighten(50).hex());			
		this.assertEqual("#ffcccc", red.lighten(80).hex());
		this.assertEqual("#ffffff", red.lighten(100).hex());		
	}, 
	
	testTween: function() {
		var red = new RGB(255, 0, 0);
		var blue = new RGB(0, 0, 255);
		
		var ary = red.tween(blue, 5);
		
		this.assertEqual("#ff0000", ary[0].hex());		
		this.assertEqual("#cc0033", ary[1].hex());		
		this.assertEqual("#990066", ary[2].hex());		
		this.assertEqual("#660099", ary[3].hex());		
		this.assertEqual("#3300cc", ary[4].hex());		
	}	
});