module Color
  class RGB
    # Instance variables
    attr_accessor :r
    attr_accessor :g
    attr_accessor :b
    
    def initialize(r,g,b)
      @r = r / 255.0
      @g = g / 255.0
      @b = b / 255.0
    end
    
    def self.from_html(html_colour)
      html_colour.gsub!(/[#;]/, '')
      rgb_ary = []
      case html_colour.size
      when 3
        rgb_ary = html_colour.scan(/[a-fA-F0-9]/).map{ |hex| (hex*2).to_i(16) }
      when 6
        rgb_ary = html_colour.scan(/[a-fA-F0-9]{2}/).map{ |hex| hex.to_i(16) }
      else
        raise ArgumentError
      end
      self.new(*rgb_ary)
    end
    
    def to_html
      r = @r > 255 ? 255 : (@r * 255).truncate
      g = @g > 255 ? 255 : (@g * 255).truncate
      b = @b > 255 ? 255 : (@b * 255).truncate
      
      "#%02x%02x%02x" % [ r, g, b ]
    end
    
    def mix_with(mask, opacity)
      opacity /=  100.0
      
      rgb = self.dup
      rgb.r = (@r * opacity) + (mask.r * (1 - opacity))
      rgb.g = (@g * opacity) + (mask.g * (1 - opacity))
      rgb.b = (@b * opacity) + (mask.b * (1 - opacity))
      
      rgb
    end
    
    def darken_by(percent)
      black = RGB.new(0, 0, 0)
      mix_with(black, percent)
    end
    
    def lighten_by(percent)
      white = RGB.new(0xff, 0xff, 0xff)
      mix_with(white, percent)
    end
  end
  
  # Creates a gradient moving from the given html_colour to white
  # in the number of steps specified.
  #
  #   ColourHelper.gradient_to_white("#00ff00", 5)
  #   => ["#ffffff", "#bfffbf", "#80ff80", "#40ff40", "#00ff00"]
  def self.gradient_to_white(html_colour, steps)
    html_colour = RGB.from_html(html_colour)
    gradient = []
    
    steps -= 1
    steps.times { |i|
      gradient << html_colour.lighten_by((100 / steps) * i).to_html
    }
    gradient << html_colour.to_html
  end
  
  # Creates a gradient moving from the given html_colour to black
  # in the number of steps specified.
  #
  #   ColourHelper.gradient_to_black("#00ff00", 5)
  #   => ["#000000", "#0d4000", "#1a8000", "#26bf00", "#33ff00"]
  def self.gradient_to_black(html_colour, steps)
    html_colour = RGB.from_html(html_colour)
    gradient = []
    
    steps -= 1
    steps.times { |i|
      gradient << html_colour.darken_by((100 / steps) * i).to_html
    }
    gradient << html_colour.to_html
  end
end