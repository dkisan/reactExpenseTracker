import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const [isverify, setIsverify] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage.getItem('ExpenseUToken'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    if (data.users) {
                        if (data.users[0].emailVerified) {
                            setIsverify(true)
                        }
                    }
                } else {
                    return res.json().then(data => {
                        console.log(data.error.message)
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    const veryfyEmailHandler = (event) => {
        event.preventDefault()


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage.getItem('ExpenseUToken'),
                requestType: "VERIFY_EMAIL"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    alert('Email has been Sent')
                } else {
                    return res.json().then(data => {
                        console.log(data.error.message)
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    const logoutHandler = () => {
        localStorage.removeItem('ExpenseUToken')
        navigate('/login')
    }

    return (
        <div>
            <div className="w-full h-max p-4 border border-b-orange-400 flex justify-between items-center">
                <h1 className="italic font-bold text-xl">Welcome to Expense Tracker</h1>
                <div className="flex flex-col gap-2 items-center">
                    <p className="bg-gray-200 p-2 rounded-full w-max">Your Profile is Incomplete. <Link to='/profile' className="text-blue-700 font-semiboldold">Complete Now</Link></p>
                    <div className="flex gap-4">
                        {!isverify && <button onClick={veryfyEmailHandler} className="border border-red-500 text-red-500 w-max p-1 rounded-md">Verify Email</button>}
                        <button onClick={logoutHandler} className="border border-red-500 bg-red-500 text-white w-max p-1 rounded-md">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;