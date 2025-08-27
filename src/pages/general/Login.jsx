import React from 'react';
import CustomButton from '../../components/UI/CustomButton'
import CustomInput from '../../components/UI/CustomInput'

function Login() {
    return (
        <div className='bg-primary-500 h-full w-full flex justify-center items-center'>
            <div className='text-white w-1/2 p-15'>
                <div className='w-[80%] [&>p]:text-blue mx-auto [&>p]:text-xl [&>p]:mb-10'>
                    <h1 className='text-5xl font-bold mb-6'>Hola!</h1>
                    <p>Bienvenido a Inbol. </p>
                    <p>Inicia sesión para poder acceder a la mejor herramienta de valuación de casas en el mercado.</p>
                    <p>¿Aún no tienes una cuenta? Resgitrate dando clic en el siguiente botón.</p>
                    <CustomButton texto={'Registrarme'} style='terciario' ruta='/simple/register'></CustomButton>
                </div>
            </div>
            <div className='w-1/2 p-15'>
                <form className='bg-white p-10 rounded-xl flex flex-col justify-center items-center gap-[40px] w-[80%] mx-auto'>
                    <h1 className='text-5xl font-bold'>Iniciar Sesión</h1>
                    <CustomInput placeholder='Correo electrónico' type='email'></CustomInput>
                    <CustomInput placeholder='Contraseña' type='password'></CustomInput>
                    <p>¿Has olvidado tu contraseña? Da clic <span className='text-blue-400 cursor-pointer'>aquí</span> para poder recuperarla.</p>
                    <CustomButton texto={'Iniciar Sesión'} style='terciario' type='submit'></CustomButton>
                </form>
            </div>
        </div>
    );
}

export default Login;