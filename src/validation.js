function validacion(userData){
  const errors = {};

  // Validación del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email) {
    errors.email = 'El email no puede estar vacío.';
  } else if (userData.email.length > 35) {
    errors.email = 'El email no puede tener más de 35 caracteres.';
  } else if (!emailRegex.test(userData.email)) {
    errors.email = 'El email no es válido.';
  }

  // Validación de la contraseña
  const passwordRegex = /^(?=.*[0-9]).{6,10}$/;
  if (!userData.password) {
    errors.password = 'La contraseña no puede estar vacía.';
  } else if (!passwordRegex.test(userData.password)) {
    errors.password = 'la contraseña tiene que tener al menos un número y tener una longitud entre 6 y 10 caracteres.';
  }

  return errors;
}

export default validacion;