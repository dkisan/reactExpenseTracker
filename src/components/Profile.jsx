import { useRef } from "react";
import { Link } from "react-router-dom";

const Profile = () => {

    const nameRef = useRef('')
    const imageRef = useRef('')

    const profileHandler = (event) => {
        event.preventDefault()
        if (nameRef.current.value === '' || imageRef.current.value === '') {
            alert('Please fill all fields')
            return
        }


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage.getItem('ExpenseUToken'),
                displayName: nameRef.current.value,
                photoUrl: imageRef.current.value,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    console.log(data)
                    alert('Updated Successfully')
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
        <div>
            <div className="w-full h-max p-4 border border-b-orange-400 flex justify-between items-center">
                <h1 className="italic font-bold text-xl">Winners never quit, Quitters never win.</h1>
                <p className="bg-gray-200 p-3 rounded-xl w-[40vw]">Your Profile is 64% completed. A completed Profile has higher chance of landing a job. <Link className="text-blue-700 font-semiboldold">Complete Now</Link></p>
            </div>
            <div className="w-3/4 m-auto mt-4 font-bold text-lg">
                <div className="flex justify-between mb-4">
                    <h1>Contact details</h1>
                    <button className="bg-transparent text-orange-600 border border-orange-600 p-1 rounded-md">Cancel</button>
                </div>
                <form action="" className="flex flex-col gap-8" onSubmit={profileHandler}>
                    <div className="flex justify-evenly">
                        <label htmlFor="">Full Name : </label>
                        <input ref={nameRef} className="border-2 rounded-md w-1/3 font-normal" type="text" name="" />
                        <label htmlFor="">Profile Url : </label>
                        <input ref={imageRef} className="border-2 rounded-md w-1/3 font-normal" type="text" name="" />
                    </div>
                    <button className="border-2 p-2 rounded-md w-max bg-orange-600 text-white">Update</button>
                </form>
            </div>
        </div>
    )
}

export default Profile;