module ErbPreprocessor
  module Environment
    def include(*filenames)
      filenames.map {|filename| Preprocessor.new(filename).to_s}.join("\n")
    end
  end
  
  class Preprocessor
    include Environment
    
    def initialize(filename)
      @filename = File.expand_path(filename)
      @template = ERB.new(IO.read(@filename), nil, nil)
    end
    
    def to_s
      @template.result(binding)
    end
  end  
end