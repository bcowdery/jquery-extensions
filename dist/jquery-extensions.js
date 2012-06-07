/*! 
 * jQuery Extensions - v0.0.1 
 * 
 * http://github.com/bcowdery/jquery-extensions
 * 
 * Copyright (c) 2012 Brian Cowdery 
 * Licensed MIT, GPL 
 * 
 * Date: Thursday June 7th, 2012 
 */

(function (jQuery, window) {       

/*global Class:true */
   
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
    /*jshint newcap:false, noarg:false, loopfunc:true */                
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
        /*jshint loopfunc:true */
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

jQuery.extend(String.prototype, {
    /**
     * Compares the contents of this string with another given string ignoring case.
     * @param {String} value
     */
    equalsIgnoreCase: function(value) {
        return (value !== null ? this.toLowerCase() === value.toLowerCase() : false);
    }
});


/*global DOMException:true */

/*requires base.js array.js*/

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
                var index = (before != null) ? array.indexOf(before) : array.length;                
                if (index < 0)  {
                    throw new Error(DOMException.NOT_FOUND_ERR, "Element not found");
                }
                
                array.insert(element, index);
                for (var i = 0; i < array.length; i++) { 
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

/*requires base.js */

/**
 * Converts an 8-bit RGB color value to a 2-digit hexadecimal representation in the [0..255] range.
 * Useful for composing CSS color strings.
 *
 * @param {number} 8-bit RGB color value 0-255
 */ 
jQuery.extend({
    toColorPart: function(number) {
        if (!jQuery.isNumeric(number)) {
            throw new Error("Must be a number between 0-255.");    
        }
        
        number = (number > 255 ? 255 : (number < 0 ? 0 : number));
        var hex = number.toString(16);
        return hex.length < 2 ? "0" + hex : hex;               
    }
});

/**
 * An RGB color object for performing simple color manipulations.  
 *
 * New instances of an RGB color object can be creating using both 8-bit color values
 * and HTML/CSS hex color codes.
 *
 *  new RGB(255, 255, 255);
 *  new RGB("#ffffff");
 *  new RGB("#fff");
 */
var RGB = jQuery.Class.create({
    init: function(r, g, b) {
        this.r = r / 255.0; 
        this.g = g / 255.0;
        this.b = b / 255.0;        
    },

    /**
     * Returns this color as a web-safe hexadecimal color code.
     */
    hex: function() {        
        var self = this;
        return  "#" + jQuery.map(this.integer(), function(value) {
            return jQuery.toColorPart(value);
        }).join('');            
    },
    
    /**
     * Returns this color as an array of 8-bit integers.
     */
    integer: function() {        
        return jQuery.map([this.r, this.g, this.b], function(value) {        
            value = Math.round(value * 255);
            return (value > 255 ? 255 : (value < 0 ? 0 : value));
        });        
    },    
    
    /**
     * Returns this color as a web-safe RGB color code.
     */
    string: function() {        
        return "rgb(" + this.integer().join(", ") + ")";           
    },
    
    /**
     * Mixes this color with the given color mask at the specified
     * opacity, and returns the new color. 
     * 
     * @param {Object} mask color mask to mix with
     * @param {Object} opacity decimal opacity between 0.0 and 1.0
     */
    mix: function(mask, opacity) {
      if (opacity < 0.0 || opacity > 1.0) {
        throw new Error("Opacity must be an number between 0.0 and 1.0");            
      }
      
      var rgb = this.integer();
      var mixed = new RGB(rgb[0], rgb[1], rgb[2]);
      
      mixed.r = (mixed.r * opacity) + (mask.r * (1 - opacity).toFixed(2));
      mixed.g = (mixed.g * opacity) + (mask.g * (1 - opacity).toFixed(2));
      mixed.b = (mixed.b * opacity) + (mask.b * (1 - opacity).toFixed(2));
      
      return mixed;
    },
    
    /**
     * Darkens this color by shifting it towards black by the
     * given percentage.
     * 
     * @param {Object} percent integer percentage to darken by, between 0 and 100.
     */
    darken: function(percent) {      
      return this.mix(RGB.Black, (1 - (percent/100)));
    },
    
    /**
     * Lightens this color by shifting it towards pure white by the
     * the given percentage.
     * 
     * @param {Object} percent integer percentage to darken by, between 0 and 100.
     */
    lighten: function(percent) {     
      return this.mix(RGB.White, (1 - (percent/100)));
    },
    
    /**
     * Generates an aray of colors between this color and the given end color,
     * in the number of frames specified.
     * 
     * @param {Object} end color for tweened frames to end at
     * @param {Object} frames number of frames (colors) to generate, including start and end colors
     */
    tween: function(end, frames) {
        var start = this;
        var colors = [];
        for (var i = 0; i < frames; i++) {
            colors.push(end.mix(start, (1 / frames) * i));
        }        
        return colors;        
    }
});


jQuery.Class.overload(RGB.prototype, {
    init: [
        function(hex) {
            hex = hex.replace(/[#;]/g, '');
            var matches = [];
            var rgb = [];            
            switch (hex.length) {
                case 3:
                    matches = /([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])/.exec(hex);
                    rgb.push(parseInt(matches[1] + matches[1], 16)); // red
                    rgb.push(parseInt(matches[2] + matches[2], 16)); // green
                    rgb.push(parseInt(matches[3] + matches[3], 16)); // blue
                    
                    break;
                    
                case 6:
                    matches = /([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})/.exec(hex);
                    rgb.push(parseInt(matches[1], 16)); // red
                    rgb.push(parseInt(matches[2], 16)); // green
                    rgb.push(parseInt(matches[3], 16)); // blue
                    
                    break;
                    
                default:
                    throw new Error("Malformed hexadecimal color code, must be 3 or 6 digits in length.");
            }    
            
            this.init(rgb[0], rgb[1], rgb[2]);
        }
    ]
});

// color constants
RGB.White = new RGB(255, 255, 255);
RGB.Black = new RGB(0, 0, 0);

// expose RGB color as a global object
window.RGB = RGB;

}) (jQuery, window);