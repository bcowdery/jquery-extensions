
new Test.Unit.Runner({
	testEqualsIgnoreCase: function() {
		this.assertEqual(true, "String".equalsIgnoreCase("string"));
		this.assertEqual(false, "String".equalsIgnoreCase("not string"));
		this.assertEqual(false, "String".equalsIgnoreCase(null));
	},
});
