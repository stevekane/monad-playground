operator (>>=) 15 left 
  { $left, $right } => #{ 
    $left.bindM($right) 
  }

macro variable_type {
  rule { var }
  rule { const }
  rule { let }
}

macro do_let_binding {
  rule { $name:ident = $rhs:expr }
}

macro do_let_group {
  rule { $let:do_let_binding, $rest:do_let_group }
  rule { $let:do_let_binding }
}

macro do_term {
  rule { $variableType:invoke(variable_type) $group:do_let_group ;... $rest:do_term } => {
    (function () { 
      var $group;
      return $rest
    })()
  }

  rule { $name:ident <- $ma:expr ;... $rest:do_term } => {
    $ma >>= (function ($name) { return $rest }) 
  }

  rule { $expr:expr ;... $rest:do_term } => {
    $expr >>= $rest 
  }

  rule { $expr:expr ;... } => {
    $expr
  }
}

macro DO {
  rule { { $terms:do_term } } => {
    (function () { return $terms })()
  }
}

export DO
export >>=
