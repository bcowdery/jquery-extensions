var empty;
		  
new Test.Unit.Runner({
	setup: function() {
	  	empty = document.createElement('select');
	},
	teardown: function() {
		empty.clear();	
	},

  	testSelectAdd: function() {
		var one = new Option(1, "test 1");
		empty.add(one, null);
		this.assertEqual(one, empty.options[0]);
		
		var two = new Option(2, "test 2");
		empty.add(two, one);
		this.assertEqual(two, empty.options[0]);
		
		var three = new Option(3, "test 3");
		empty.add(three, null);
		this.assertEqual(three, empty.options[2]);			
	},
	
	testSelectAddIE: function() {			
		if (Prototype.Browser.IE) {				
			var one = new Option(1, "test 1");
			empty.add(one);
			this.assertEqual(one, empty.options[0]);			
		}	
	},
	
	testClear: function() {
		var option = new Option("test", "test");
		empty.add(option, null);
		empty.add(option, null);			
		empty.clear();			
		
		this.assertEqual(0, empty.options.length);		
	}
});