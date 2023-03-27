import Image from "next/image"

const LoginPage = () => {
  return (
    <div className="w-screen min-h-screen overflow-hidden flex items-stretch flex-nowrap bg-light-200">
        <div className="w-1/2 bg-blue-100 flex items-center justify-center">
            <Image src="/images/logo-full-transparent.png" alt="" width={550} height={350} />
        </div>
        <div className="flex flex-col items-center justify-center px-20 w-1/2">
            <h1 className="text-3xl text-header font-sans font-medium text-center">Sign in</h1>
            <p className="text-body text-base mt-4 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="mt-8 max-w-xs w-full">
                <button className="flex items-center w-full justify-center rounded shadow py-2.5 px-5 hover:bg-light-300 transition-all active:scale-95">
                    <span className="font-light text-body text-sm mr-2.5">Sign in with Google </span>
                    <Image src="/images/google-logo.png" alt="" width={30} height={30} />
                </button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage