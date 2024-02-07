import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const emailRef = useRef('')
    const passRef = useRef('')

    const navigate = useNavigate()

    const loginHandler = (event) => {
        event.preventDefault()
        if (emailRef.current.value === '' || passRef.current.value === '' ) {
            alert('Please fill all fields')
            return
        }


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                email: emailRef.current.value,
                password: passRef.current.value,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    // console.log(data)
                    localStorage.setItem('ExpenseUToken',data.idToken)
                    navigate('/')
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
                <h1 className="font-bold text-center underline">Login</h1>

                <label htmlFor="">Email : </label>
                <input ref={emailRef} type="email" name="" />
                <label htmlFor="">Password : </label>
                <input ref={passRef} type="password" name="" />
                <button className="p-2 bg-green-600 rounded-md text-white font-bold text-xl">Login</button>
                <h6>Don't Have an Account ? <Link to='/signup'>SignUp</Link></h6>
            </form>
        </div>
    )
}

export default Login;