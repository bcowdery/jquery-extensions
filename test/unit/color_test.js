
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

	testRGBHex: function() {
		var rgb = new RGB(0, 127, 255);
		
		this.assertEqual("#007fff", rgb.hex());
	}
});