
const LoadingComponent = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full bg-opacity-50 pointer-events-none z-supermax bg-light-100">
        <div>
            <div className="loadingio-spinner-container"><div className="loading-spinner">
            <div></div>
            </div></div>
        </div>
        <div className="text-xs font-normal ">
            Loading...
        </div>
    </div>
  )
}

export default LoadingComponent