import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className='w-full flex flex-col items-center gap-2 animate-pulse'>
      <VscLoading size={38} className="text-typography-light/80 animate-spin" />
      <p className='text-typography-light/80 font-medium text-base'>
        carregando dados...
      </p>
    </div>
  );
}

export default Loading;