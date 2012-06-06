/*! jquery-extensions - v0.0-SNAPSHOT - 2012-06-06
* http://github.com/bcowdery/jquery-extensions
* Copyright (c) 2012 Brian Cowdery; Licensed MIT, GPL */

/*global Class:true */
/*jshint immed:false, loopfunc:true */

(function (jQuery) {            
    
    /**  
     * Simple JavaScript Inheritance - By John Resig (MIT Licensed)
     * http://ejohn.org/blog/simple-javascript-inheritance/
     *
     * Provides support for defining simple classes with inheritence.
     */
    var initializing = false;
    var fnTest = /var xyz/.test(function() { var xyz; }) ? /\b_super\b/ : /.*/;    
    this.Class = function() {};

    Class.extend = function(prop) { 
        /*jshint newcap:false, noarg:false */            
        
        var _super = this.prototype;

        // instantiate a base class (create the instance, don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // copy the properties over onto the new prototype        
        for (var name in prop) {          
            prototype[name] = typeof prop[name] === "function" && typeof _super[name] === "function" && fnTest.test(prop[name]) ? 
            (function(name, fn) {
                    return function() {
                        var tmp = this._super;

                        this._super = _super[name];

                        var ret = fn.apply(this, arguments);       
                        this._super = tmp;

                        return ret;
                    };
                }) (name, prop[name]) : 
            prop[name];
        }

        // the dummy class constructor
        function Class() {          
            if (!initializing && this.init) {
                this.init.apply(this, arguments);
            }
        }

        // redefine the prototype and make the class extendable        
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;

        return Class;
    };    
    
    
    /* Namespace jQuery.Class */
    jQuery.Class = {
        /**
         * Defines a new class structure that can be instantiated and extended.
         *
         * var Person = $.Class.create({
         *         init: function(name) {
         *            this.name = name;
         *        },
         *
         *        toString: function() {
         *            return "Hello, my name is " + this.name;
         *        }    
         * });
         *
         * @param {Hash} properties
         */
        create: function(properties) {
            return Class.extend(properties);
        },

        /**
         * Creates a new class structure that inherits from a base class. The extension
         * class can override methods and has access to the base class via this._super;
         *
         * var Ninja = $.Class.extend(Person, {
         *        init: function(name) {
         *            this._super(name);
         *        },
         *
         *        toString: function() {
         *            return "... silence ...";
         *        }
         *    });
         *         
         * @param {Type} base
         * @param {Hash} properties
         */
        extend: function(base, properties) {
            if (typeof base === 'function') {    
                return base.extend(properties);
            }
            
            throw new Error("Base must extend from Class");
        },
    
        /**
         * Original concept: addMethod - By John Resig (MIT Licensed), 
         * http://ejohn.org/blog/javascript-method-overloading/
         * 
         * Overloads a method of a given Class. Allows the calling of different overloaded
         * functions based on the arguments they accept.
         * 
         * $.Class.overload(Date, {
         *         parse: [
         *             function(string) {
         *                 // parse date string
         *             },
         * 
         *             function(string, format) {
         *                 // parse date string in given format
         *            }
         *        ] 
         * });
         * 
         * @param {Object} object
         * @param {Hash} source
         */            
        overload: function(object, source) {
            for (var property in source) {
                jQuery.each(source[property], function(i, fn) {                
                    var old = object[property];        
                    object[property] = function() {
                        if (fn.length === arguments.length) {
                            return fn.apply(this, arguments);
                        } else {
                            if (typeof old === 'function') {
                                return old.apply(this, arguments);
                            }
                        }
                    };            
                });
            }    
        }            
    };
    
}) (jQuery);
jQuery.extend(String.prototype, {
    /**
     * Compares the contents of this string with another given string ignoring case.
     * @param {String} value
     */
      equalsIgnoreCase: function(value) {
          return (value !== null ? this.toLowerCase() === value.toLowerCase() : false);
      }
});
jQuery.extend(Array.prototype, {
    /**
     * Inserts a value into this array instance, shifting all remaining elements left.
     * 
     * var ary = [1, 2, 3];
     * ary.insert("a", 1); -> [1, "a", 2, 3];
     * 
     * @param {Object} value
     * @param {Number} index
     */
    insert: function(value, index) {
        if (index < 0) {       
            index = 0;
        }
        
        for (var i = this.length; i > index; i--) {
            this[i] = this[i-1];
        }
        
        this[index] = value;
        return this;
    },
       
    /**
     * Splits an array into two separate instances at the given index, operationaly 
     * similar to Array#slice, only preceeding array elements are not discarded. This
     * function does not alter the original array. 
     * 
     * var ary = [1, 2, 3, 4];
     * ary.split(2); -> [[1, 2], [3, 4]]
     * 
     * @param {Object} index (inclusive)
     */
    split: function(index) {
        return [this.slice(0, index), this.slice(index, this.length)];
    }
});

/*global DOMException:true */
if (jQuery.browser.msie) {
    jQuery.Class.overload(HTMLSelectElement.prototype, {
        add: [        
            /**
             * Inserts an option into a HTMLSelectElements option array as per DOM Level 2
             * specifications.
             *
             * If 'before' is not defined or null, the given option will be added to the end
             * of the list, otherwise the given option will be added infront of the given
             * 'before' element and all other options will be shifted left.
             *
             * If the give before element does not exist an Error will be thrown with
             * DOMException.NOT_FOUND_ERR.
             *
             * This method still allows the non-compliant HTMLSelectElement.add(option) function
             * Internet Explorer.
             *
             * @param {Object} element
             * @param {Object} before
             */
            function(element, before){
                var array = jQuery.makeArray(this.options);
                var index = (before != null) ? array.indexOf(before) : array.size();                
                if (index < 0)  {
                    throw new Error(DOMException.NOT_FOUND_ERR, "Element not found");
                }
                
                array.insert(element, index);
                for (var i = 0; i < array.size(); i++) { 
                    this.options[i] = array[i];
                }
            }
        ]
    });
}

jQuery.extend(HTMLSelectElement.prototype, {
    clear: function() {
        this.options.length = 0;
    }
});