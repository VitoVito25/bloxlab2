export interface TLoginForm {
  email: string
  password: string
}

export interface TLoginResponse {
  nomeUsuario: string
  instituicao: string
  jwtToken: string
  access: string
}

export interface TRegisterForm {
  nome: string
  instituicao: string
  cargo: string
  tipoAcesso: string
  email: string
  password: string
}
