
const validarNome = (nome) => {
    const regexNome = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    const isvalid = nome.length >= 2 && regexNome.test(nome)
    return isvalid;
  };
  
  
  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };
  
  
  const validarTelefone = (telefone) => {
    const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regexTelefone.test(telefone);
  };
  
  export { validarNome, validarEmail, validarTelefone };