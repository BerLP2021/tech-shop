type Props = {text: string, cb: () => void}

export default function ErrorComp({text, cb}: Props) {
  return (
      <div className='text-center text-xl text-red-500 mt-[100px] border-2 border-red-500 p-10 w-full max-w-[450px] mx-auto rounded-2xl'>
          <p >{text}</p>
          <button
              className='bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mt-10'
              onClick={cb}>Retry</button></div>
  )
}