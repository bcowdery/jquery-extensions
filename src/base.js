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