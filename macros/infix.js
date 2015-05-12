operator (>>=) 15 left 
  { $left, $right } => #{ $left.bind($left, $right) }

export >>=
