operator (>>=) 15 left 
  { $left, $right } => #{ $left.bindM($left, $right) }

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
