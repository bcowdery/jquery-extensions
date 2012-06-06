# jQuery Extensions

Object-oriented extensions, syntax sugar and helpful functions for the jQuery Javascript library

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/bcowdery/jQuery-Extensions/master/dist/jquery-extensions.min.js
[max]: https://raw.github.com/bcowdery/jQuery-Extensions/master/dist/jquery-extensions.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/jquery-extensions.min.js"></script>

<script>
// define some classes
var Person = $.Class.create({
	init: function(name) {
        this.name = name;
    },
	
	toString: function() {
		return "Hello, my name is " + this.name;
	}    
});
	 		 													
var Ninja = $.Class.extend(Person, {
	init: function(name) {
		this._super(name);
	},

	toString: function() {
		return "... you hear nothing ..."
	}	
});		 
	
	
// create some instances and call some methods	
var bob = new Person("Bob");
var nameless = new Ninja("nameless");

bob.toString();   		#=> Hello, my name is bob
nameless.toString();	#=> ... you hear nothing ...	
</script>
```

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Building

**Requires:**
* Grunt 0.3.9

jQuery Extensions is built using [grunt](https://github.com/cowboy/grunt).

Once you have Grunt installed, you can build the project by running `grunt`. The default grunt task will run [JSHint][jshint] to look for problems, run the [Qunit][qunit] tests, build and minify the library.

Available Grunt targets are:

* `concat` - Builds the library
* `min` - Minimizes the built library
* `lint` - Runs [JSHint][jshint] to look for coding problems.
* `qunit` - Runs the QUnit tests. _You must have [PhantomJS][phantom] installed to be able to run the tests!_
* `watch` - Watch JS source files and tests for changes. Lint and tests code when changes are detected.

_Note: in Windows, you may need to run grunt as `grunt.cmd`. See the [FAQ](/cowboy/grunt/blob/master/docs/faq.md) for more Windows-specific information._


## Release History
* SNAPSHOT-0.0 - Converted to jQuery, ditched ruby for a node.js Grunt build process.

## License
Copyright (c) 2012 Brian Cowdery  
Licensed under the MIT, GPL licenses.


[node]: http://nodejs.org/
[jshint]: http://www.jshint.com/
[uglify]: https://github.com/mishoo/UglifyJS/
[qunit]: http://docs.jquery.com/QUnit
[phantom]: http://www.phantomjs.org/