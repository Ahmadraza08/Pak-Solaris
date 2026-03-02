import React from 'react'

const Newsletter = () => {
    const onSumbitHandler = (event) => {
        e.preventDefault();
    }
    return (
        <div className=" text-center">
            <p className="text-2xl font-medium text-gray-800">Subscribe now </p>
            <form onSubmit={onSumbitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border-gray-300 border pl-3">
                <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email" required/>
                <button type="submit" className="bg-black text-white text-xs px-10 py-4">SUBSCRIBE</button>
            </form>
        </div>
    )
}

export default Newsletter