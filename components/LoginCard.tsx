import GithubButton from './GithubButton';
import Image from 'next/image';

export default function LoginCard() {
  return (
    <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6'>
      <div className='flex justify-center'>
        <Image src='/logo.jpg' alt='Company logo' width={160} height={160} />
      </div>

      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Bienvenido</h1>
        <p className='text-gray-500 text-sm'>Inicia sesión para continuar</p>
      </div>

      <GithubButton />
    </div>
  );
}
