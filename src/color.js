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
