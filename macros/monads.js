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

/* Any interstitial var defs must be bounded by the nearest two monadic values
 * in order to properly nest the expanded function calls.  This means that syntax
 * parsing gets a bit trickier as let defitions don't stand on their own completely
 * but rather are contextualized completely by the nearby monads.  As a result,
 * several cases are provided to match different possible syntaxes for declaring
 * interstial values.
 *
 * let foo = bar;
 *
 * let foo = bar,
 *     x = y;
 *
 * At the moment, awkward mix-and-match as shown below is not supported (though in theory
 * it could be).
 *
 * let foo = bar;
 * let x = y,
 *     z = b;
 *
 * */
macro LET_BINDINGS {
  rule { let $($k:ident = $v:expr) (,) ... } => {
    $(var $k = $v;) ...
  }
}

macro DO {
  //let bindings
  case {_ {$name:ident <= $ma:expr ; $letBindings:LET_BINDINGS ; $rest ... }} => {
    return #{
      $ma.bindM(function ($name) {
        $letBindings
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
