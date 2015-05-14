operator (>>=) 15 left 
  { $left, $right } => #{ $left.bindM($left, $right) }

export >>=
