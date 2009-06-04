
var RGB = Class.create({	
    initialize: function(r, g, b) {
        this.r = r / 255.0; 
        this.g = g / 255.0;
        this.b = b / 255.0;
    },
	
    hex: function() { 	
        return "#" + this.integer().invoke('toColorPart').join('');
    },
	
	integer: function() {		
        return [this.r, this.g, this.b].collect(function(value){
		    value = value * 255;
    		return (value > 255 ? 255 : (value < 0 ? 0 : value));
	    });		
	},	
	
	mix: function(mask, opacity) {
      opacity = opacity / 100.0;
      
      var rgb = Object.clone(this);
      rgb.r = (rgb.r * opacity) + (mask.r * (1 - opacity));
      rgb.g = (rgb.g * opacity) + (mask.g * (1 - opacity));
      rgb.b = (rgb.b * opacity) + (mask.b * (1 - opacity));
      
      return rgb;
	},
	
	darken: function(percent) {
      var black = new RGB(0, 0, 0)
      return this.mix(black, percent)
	},
	
	lighten: function() {
      var white = new RGB(255, 255, 255)
      return this.mix(black, percent)
	},
	
	tween: function(start, end, frames) {
		
		
	}
});

Object.overload(RGB.prototype, {
	initialize: [
		function(hex) {
		    hex = hex.gsub(/[#;]/, '');
		    var rgb = [];
		    switch (hex.length) {
		        case 3:
		            hex.scan(/[a-fA-F0-9]/, function(match) {
		                rgb.push(parseInt(match[0] + match[0], 16));
		            });
		            break;
		            
		        case 6:
		            hex.scan(/[a-fA-F0-9]{2}/, function(match) { 
						rgb.push(parseInt(match[0], 16));
		            });
		            break;
		            
		        default:
		            throw new Error("Malformed hexadecimal color code, must be 3 or 6 digits in length.");
		    }	
			
			this.initialize(rgb[0], rgb[1], rgb[2])				
		}
	]
});
