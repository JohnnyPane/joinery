module LogRules
  class BaseRule
    def self.calculate(diameter, length)
      raise NotImplementedError, "Subclasses must define a calculate method"
    end
  end

  class Doyle < BaseRule
    def self.calculate(diameter, length)
      return 0.0 if diameter <= 4.0
      ((diameter - 4.0) / 4.0)**2 * length
    end
  end

  class International14Inch < BaseRule
    def self.calculate(diameter, length)
      (0.199 * length * diameter**2) - (0.641 * length * diameter)
    end
  end
end
