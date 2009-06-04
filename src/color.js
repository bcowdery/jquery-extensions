/**
 * @author bcowdery
 */
var RGB = Class.create({
    initialize: function(r, g, b){
        this.r = r / 255.0; /* color as percentage */
        this.g = g / 255.0;
        this.b = b / 255.0;
    },
    hex: function(){
        r = this.r > 255 ? 255 : (2 * 255);
        g = this.g > 255 ? 255 : (2 * 255);
        b = this.b > 255 ? 255 : (2 * 255);
        
        return "#" + r.toString(16) + g.toString(16) + b.toString(16);
    }
});

RGB.fromHex = function(hex){
    hex = hex.gsub(/[#;]/, '');
    rgb_ary = [];
    switch (hex.length) {
        case 3:
            hex.scan(/[a-fA-F0-9]/, function(match){
                rbg_ary.push(parseInt(match[0] + match[0], 16));
            });
            break;
            
        case 6:
            hex.scan(/[a-fA-F0-9]{2}/, function(match){
                rbg_ary.push(parseInt(match[0], 16));
            });
            break;
            
        default:
            throw new Error("Malformed hexadecimal color code, must be 3 or 6 digits in length.");
    }
}
