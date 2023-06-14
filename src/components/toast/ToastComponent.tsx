import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const ToastComponent = () => {

    useEffect(() => {
        const toastComponents:any = document.querySelector("#toast-container")
        if(toastComponents.childNodes.length > 1) {
            toastComponents.children[1].remove()
        }
    }, [])
    return (
        <div id="toast-container" className="fixed flex flex-col gap-3 transition-all top-7 right-5 z-supermax">
            <ToastContainer
                position="top-right"
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <ToastContainer />    
        </div>
    )
}

export default ToastComponent