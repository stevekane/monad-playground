operator (>>=) 15 left 
  { $left, $right } => #{ 
    $left.bindM($right) 
  }

operator ($$) 16 left
  { $left, $right } => #{ 
    function (x) { return $left($right(x)) } 
  }

macro DO {
  case {_ {$name:ident <= $ma:expr $rest ... }} => {
    return #{
      $ma.bindM(function ($name) {
        return DO { $rest ... }
      })
    }
  }

  case {_ {$expr:expr}} => {
    return #{$expr}
  }

}

export >>=
export $$
export DO
