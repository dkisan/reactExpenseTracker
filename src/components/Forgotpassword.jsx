import { useRef } from "react"

const Forgotpassword = () => {
    const emailRef = useRef('')

    const loginHandler = (event) => {
        event.preventDefault()
        if (emailRef.current.value === '') {
            alert('Please fill all fields')
            return
        }


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current.value,
                requestType: "PASSWORD_RESET"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    if (data.email) {
                        alert('Reset Link has been sent')
                    }
                } else {
                    return res.json().then(data => {
                        alert(data.error.message)
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    return (
        <div className="w-[100vw] h-[100vh] bg-slate-500 bg-opacity-50 flex rounded-lg justify-center items-center">
            <form className="border p-2 bg-white flex flex-col gap-2 w-1/4 rounded-xl" action="" onSubmit={loginHandler}>
                <h1 className="font-bold text-center underline">Forgot Password</h1>
                <label htmlFor="">Email : </label>
                <input ref={emailRef} type="email" name="" />
                <button className="p-2 bg-green-600 rounded-md text-white font-bold text-xl">Reset Password</button>
            </form>
        </div>
    )
}

export default Forgotpassword;