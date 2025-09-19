import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import CustomButton from '../../components/UI/CustomButton';
import CustomInput from '../../components/UI/CustomInput';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault(); // evitar reload

    try {
        console.log("Email:", email, "Password:", password);
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (response.ok) {
        const userData = { email: data.email, id: data.id, type: data.type };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData); // ahora sí actualiza el context
        navigate('/');
      } else {
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error(err);
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="bg-primary-500 h-full w-full flex justify-center items-center">
      <div className="text-white w-1/2 p-15">
        <div className="w-[80%] [&>p]:text-blue mx-auto [&>p]:text-xl [&>p]:mb-10">
          <h1 className="text-5xl font-bold mb-6">Hola!</h1>
          <p>Bienvenido a Inbol. </p>
          <p>Inicia sesión para poder acceder a la mejor herramienta de valuación de casas en el mercado.</p>
          <p>¿Aún no tienes una cuenta? Regístrate dando clic en el siguiente botón.</p>
          <CustomButton texto={'Registrarme'} style="terciario" ruta="/simple/register" />
        </div>
      </div>
      <div className="w-1/2 p-15">
        <form 
          onSubmit={handleLogin} 
          className="bg-white p-10 rounded-xl flex flex-col justify-center items-center gap-[40px] w-[80%] mx-auto"
        >
          <h1 className="text-5xl font-bold">Iniciar Sesión</h1>
          <CustomInput 
            placeholder="Correo electrónico" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput 
            placeholder="Contraseña" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>
            ¿Has olvidado tu contraseña? Da clic{" "}
            <span className="text-blue-400 cursor-pointer">aquí</span> para poder recuperarla.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <CustomButton texto={'Iniciar Sesión'} style="terciario" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
