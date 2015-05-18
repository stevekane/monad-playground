operator (>>=) 15 left 
  { $left, $right } => #{ $left.bindM($right) }

operator ($$) 16 left
  { $left, $right } => #{ function (x) { return $left($right(x)) } }

macro DoChunk {
  case {_ $name: ident = $ma:expr} => {
    return #{
      $ma.bindM(function ($name) { 
        return DO { $rest ... }
      }) 
    }
  }
  
  case {_ $ma:expr } => {
    return #{$ma}
  }
}

macro DO {
  case {_ $doChunk:DoChunk ...}
}

export DO
export >>=
export $$
