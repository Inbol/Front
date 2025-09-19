import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../components/UI/CustomButton';
import CustomInput from '../../components/UI/CustomInput';

    function Register() {
        const navigate = useNavigate();
        const [tipoUsuario, setTipoUsuario] = useState('usuario');
        const [error, setError] = useState(null);
        const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Datos enviados:", data);

    // Elegir la ruta según el tipo de usuario
    const endpoint =
        data.tipoUsuario === "empresa" ? "http://localhost:8000/enterprises/" : "http://localhost:8000/users/";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Respuesta del backend:", result);

            if (response.ok) {
                alert("Registro exitoso!");
                navigate("/simple/login");
            } else {
                alert(result.message || "Error al registrarse");
            }
        } catch (error) {
            console.error("Error en fetch:", error);
            alert("Error en la conexión con el servidor");
        }
    };

    return (
        <div className='bg-primary-500 h-[105vh] w-full flex justify-center items-center'>
            <div className='text-white w-1/2 p-15'>
                <div className='w-[80%] [&>p]:text-blue mx-auto [&>p]:text-xl [&>p]:mb-10'>
                    <h1 className='text-5xl font-bold mb-6'>Hola!</h1>
                    <p>Bienvenido a Inbol. </p>
                    <p>Regístrate para poder disfrutar de los beneficios de la mejor herramienta de valuación de casas en el mercado.</p>
                    <p>¿Ya tienes una cuenta? Inicia sesión dando clic en el siguiente botón.</p>
                    <CustomButton texto={'Iniciar Sesión'} style='terciario' ruta='/simple/login'></CustomButton>
                </div>
            </div>

            <div className='w-1/2 p-15 flex flex-col gap-3'>
                <div className='bg-white p-2.5 rounded-xl w-[50%] flex gap-5 mx-auto justify-center'>
                    <CustomButton
                        texto={'Soy usuario'}
                        style={tipoUsuario === 'usuario' ? 'terciario' : 'cancel'}
                        onClick={() => setTipoUsuario('usuario')}
                    />
                    <CustomButton
                        texto={'Soy empresa'}
                        style={tipoUsuario === 'empresa' ? 'terciario' : 'cancel'}
                        onClick={() => setTipoUsuario('empresa')}
                    />
                </div>

                {tipoUsuario === 'usuario' ? (
                    <form
                        className='bg-white p-10 rounded-xl flex flex-col justify-center items-center gap-[20px] w-[80%] mx-auto'
                        onSubmit={handleSubmit}
                    >
                        <h1 className='text-5xl font-bold'>Registro Usuario</h1>
                        <CustomInput placeholder='Nombres(s)' type='text' name='name' required />
                        <CustomInput placeholder='Apellido Paterno' type='text' name='apellido_paterno' required />
                        <CustomInput placeholder='Apellido Materno' type='text' name='apellido_materno' />
                        <CustomInput placeholder='Correo Electrónico' type='email' name='email' required />
                        <CustomInput placeholder='Contraseña' type='password' name='password' required />
                        <input type="hidden" name="tipoUsuario" value="usuario" />

                        <div className='flex w-full gap-2.5'>
                            <input type="checkbox" name="terminos" required />
                            <p>
                                Acepta nuestras 
                                <span className='text-blue-400 cursor-pointer'> Condiciones de uso</span> y 
                                <span className='text-blue-400 cursor-pointer'> Política de privacidad</span>
                            </p>
                        </div>

                        {error && <p className='text-red-500'>{error}</p>}
                        {success && <p className='text-green-500'>{success}</p>}

                        <CustomButton texto={'Registrarme'} style='terciario' type='submit'></CustomButton>
                    </form>
                ) : (
                    <form
                        className='bg-white p-10 rounded-xl flex flex-col justify-center items-center gap-[20px] w-[80%] mx-auto'
                        onSubmit={handleSubmit}
                    >
                        <h1 className='text-5xl font-bold'>Registro Empresa</h1>
                        <CustomInput placeholder='Nombre de la empresa' type='text' name='nombreEmpresa' required />
                        <CustomInput placeholder='Correo Electrónico' type='email' name='email' required />
                        <CustomInput placeholder='Contraseña' type='password' name='password' required />
                        <input type="hidden" name="tipoUsuario" value="empresa" />

                        <div className='flex w-full gap-2.5'>
                            <input type="checkbox" name="terminos" required />
                            <p>
                                Acepta nuestras 
                                <span className='text-blue-400 cursor-pointer'> Condiciones de uso</span> y 
                                <span className='text-blue-400 cursor-pointer'> Política de privacidad</span>
                            </p>
                        </div>

                        {error && <p className='text-red-500'>{error}</p>}
                        {success && <p className='text-green-500'>{success}</p>}

                        <CustomButton texto={'Registrarme'} style='terciario' type='submit'></CustomButton>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Register;
