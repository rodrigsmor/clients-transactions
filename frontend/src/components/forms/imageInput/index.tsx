import DEFAULT_PROFILE_PICTURE from '@images/DEFAULT_PROFILE_PICTURE.png';
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface ImageInputProps {
  image: string | null;
  setImage: (value: string | null) => void;
}

export const ImageInput = ({ image, setImage }: ImageInputProps) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string);
      }

      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="grid group place-items relative h-32 w-32 rounded-full p-[6px] border-2 border-primary-main/20 overflow-hidden cursor-pointer">
      <label htmlFor="image" className="absolute px-3 max-w-full z-[3] transition-all duration-300 ease-out group-hover:bg-typography-light/20 grid place-items-center text-sm text-background-main/0 group-hover:text-background-main/90 font-medium w-full h-full rounded-full text-center">
        imagem de perfil
      </label>
      <input type="file" name="image" id="image" onChange={handleImageChange} className="w-full cursor-pointer absolute h-full opacity-0 z-10" />
      <figure className='w-full max-w-full h-full max-h-full rounded-full overflow-hidden'>
        <Image src={image || DEFAULT_PROFILE_PICTURE} height={128} width={128} className='w-full h-full object-cover' alt='profile preview' />
      </figure>
    </div>
  )
}