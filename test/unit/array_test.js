
new Test.Unit.Runner({
	testInsert: function() {
		this.assertEqual([1, "a", 2, 3].inspect(), [1, 2, 3].insert("a", 1).inspect());		
		this.assertEqual(["a", 1, 2, 3].inspect(), [1, 2, 3].insert("a", 0).inspect());
		this.assertEqual(["a", 1, 2, 3].inspect(), [1, 2, 3].insert("a", -1).inspect());
		this.assertEqual([1, 2, 3, "a"].inspect(), [1, 2, 3].insert("a", 4).inspect());						
	}
});