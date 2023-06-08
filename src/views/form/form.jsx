import { useState } from "react";
import validacion from "../../validation";

function Form({ onLogin }) {

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const validacionErrores = validacion(userData);
    setErrors(validacionErrores);
    if (Object.keys(validacionErrores).length === 0) {
      onLogin(userData);     
      //Realizar acciones adicionales aquí, como enviar los datos al servidor.
    }
  }

  return (
    <div className="div-form">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Email: {userData.email}</h2>
      <h2>Password: {userData.password}</h2>
    </div>
  );
  
};

export default Form;