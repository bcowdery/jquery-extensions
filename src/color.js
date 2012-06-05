var RGB = jQuery.Class.create({
    initialize: function(r, g, b) {
        this.r = r / 255.0; 
        this.g = g / 255.0;
        this.b = b / 255.0;
    },
    
    /**
     * Returns this color as a web-safe hexadecimal color code.
     */
    hex: function() {     
        return "#" + this.integer().invoke('toColorPart').join('');        // todo: convert to jQuery code - Number::toColorPart
    },
    
    /**
     * Returns this color as an array of 8-bit integers.
     */
    integer: function() {        
        return [this.r, this.g, this.b].collect(function(value){        // todo: convert to jQuery code - Array::collect
            value = Math.round(value * 255);
            return (value > 255 ? 255 : (value < 0 ? 0 : value));
        });        
    },    
    
    /**
     * Returns this color as a web-safe RGB color code.
     */
    string: function() {
        var ary = this.integer();                
        return "rgb(#" + ary[0] + ", #" + ary[1] + ", #" + ary[2] + ")";         
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
      
      var rgb = Object.clone(this);
      rgb.r = (rgb.r * opacity) + (mask.r * (1 - opacity).toFixed(2));
      rgb.g = (rgb.g * opacity) + (mask.g * (1 - opacity).toFixed(2));
      rgb.b = (rgb.b * opacity) + (mask.b * (1 - opacity).toFixed(2));
      
      return rgb;
    },
    
    /**
     * Darkens this color by shifting it towards black by the
     * given percentage.
     * 
     * @param {Object} percent integer percentage to darken by, between 0 and 100.
     */
    darken: function(percent) {
      var black = new RGB(0, 0, 0);
      return this.mix(black, (1 - (percent/100)));
    },
    
    /**
     * Lightens this color by shifting it towards pure white by the
     * the given percentage.
     * 
     * @param {Object} percent integer percentage to darken by, between 0 and 100.
     */
    lighten: function(percent) {
      var white = new RGB(255, 255, 255);
      return this.mix(white, (1 - (percent/100)));
    },
    
    /**
     * Generates an aray of colors between this color and the given color,
     * in the number of frames specified.
     * 
     * @param {Object} end color for tweened frames to end at
     * @param {Object} frames number of frames (colors) to generate, including start and end colors
     */
    tween: function(end, frames) {
        var start = this;
        var colors = [];
        (frames).times(function(n) {        // todo: convert to jQuery code - Number::times
            colors.push(end.mix(start, (1 / frames) * n));
        });
        return colors;        
    }
});

jQuery.Class.overload(RGB.prototype, {
    initialize: [
        function(hex) {
            hex = hex.gsub(/[#;]/, '');
            var rgb = [];
            switch (hex.length) {
                case 3:
                    hex.scan(/[A-Fa-f0-9]/, function(match) {
                        rgb.push(parseInt(match[0] + match[0], 16));
                    });
                    break;
                    
                case 6:
                    hex.scan(/[A-Fa-f0-9]{2}/, function(match) { 
                        rgb.push(parseInt(match[0], 16));
                    });
                    break;
                    
                default:
                    throw new Error("Malformed hexadecimal color code, must be 3 or 6 digits in length.");
            }    
            
            this.initialize(rgb[0], rgb[1], rgb[2]);
        }
    ]
});