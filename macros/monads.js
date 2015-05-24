//monadic bind
operator (>>=) 15 left 
  { $left, $right } => #{ 
    $left.bindM($right) 
  }

//function composition
operator ($$) 16 left
  { $left, $right } => #{ 
    function (x) { return $left($right(x)) } 
  }

macro DO {
  //multiple var defs
  case {_ {$name:ident <= $ma:expr ; let $($k:ident = $v:expr) (,) ... ; $rest ... }} => {
    return #{
      $ma.bindM(function ($name) {
        $(var $k = $v;) ...
        return DO { $rest ... }
      })
    }
  }

  //single var def
  case {_ {$name:ident <= $ma:expr ; let $k:ident = $v:expr ; $rest ... }} => {
    return #{
      $ma.bindM(function ($name) {
        var $k = $v;
        return DO { $rest ... }
      })
    }
  }

  //monadic bindings
  case {_ {$name:ident <= $ma:expr ; $rest ... }} => {
    return #{
      $ma.bindM(function ($name) {
        return DO { $rest ... }
      })
    }
  }

  //final expressions
  case {_ {$expr:expr ; }} => {
    return #{$expr}
  }

}

export >>=
export $$
export DO
