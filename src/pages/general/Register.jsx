import { useState } from 'react';
import CustomButton from '../../components/UI/CustomButton';
import CustomInput from '../../components/UI/CustomInput';

function Register() {
    // Estado para el tipo de usuario (default: usuario)
    const [tipoUsuario, setTipoUsuario] = useState('usuario');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        // Debug: muestra lo que se envía
        const data = Object.fromEntries(formData.entries());
        console.log('Datos enviados:', data);

        // Aquí iría tu lógica para enviar a la API
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
                {/* Botones para seleccionar tipo de usuario */}
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

                {/* FORMULARIO CONDICIONAL */}
                {tipoUsuario === 'usuario' ? (
                    <form
                        className='bg-white p-10 rounded-xl flex flex-col justify-center items-center gap-[20px] w-[80%] mx-auto'
                        onSubmit={handleSubmit}
                    >
                        <h1 className='text-5xl font-bold'>Registro Usuario</h1>
                        <CustomInput placeholder='Nombres(s)' type='text' name='nombres' required />
                        <CustomInput placeholder='Apellido Paterno' type='text' name='apellidoPaterno' required />
                        <CustomInput placeholder='Apellido Materno' type='text' name='apellidoMaterno' />
                        <CustomInput placeholder='Correo Electrónico' type='email' name='email' required />
                        <CustomInput placeholder='Contraseña' type='password' name='password' required />
                        
                        {/* Campo oculto con el tipo de usuario */}
                        <input type="hidden" name="tipoUsuario" value="usuario" />

                        <div className='flex w-full gap-2.5'>
                            <input type="checkbox" name="terminos" required />
                            <p>
                                Acepta nuestras 
                                <span className='text-blue-400 cursor-pointer'> Condiciones de uso</span> y 
                                <span className='text-blue-400 cursor-pointer'> Política de privacidad</span>
                            </p>
                        </div>
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
                        
                        {/* Campo oculto con el tipo de usuario */}
                        <input type="hidden" name="tipoUsuario" value="empresa" />

                        <div className='flex w-full gap-2.5'>
                            <input type="checkbox" name="terminos" required />
                            <p>
                                Acepta nuestras 
                                <span className='text-blue-400 cursor-pointer'> Condiciones de uso</span> y 
                                <span className='text-blue-400 cursor-pointer'> Política de privacidad</span>
                            </p>
                        </div>
                        <CustomButton texto={'Registrarme'} style='terciario' type='submit'></CustomButton>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Register;
