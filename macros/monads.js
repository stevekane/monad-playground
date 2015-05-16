operator (>>=) 15 left 
  { $left, $right } => #{ $left.bindM($left, $right) }

operator ($$) 16 left
  { $left, $right } => #{ function (x) { return $left($right(x)) } }

macro DO {
  case {_ { $($name:ident <- $fn:expr) ... } } => {
    return #{
      $($name = $fn) ...
    }
  }
  case {_ { $($name:ident <- $fn:expr) ... $more:expr} } => {
    return #{
      $($name = $fn) ...
    }
  }
  case {_ { $expr:expr ... } } => {
    return #{
      $expr ...
    }
  }
}

export DO
export >>=
export $$
