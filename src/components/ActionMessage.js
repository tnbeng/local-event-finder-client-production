import React from 'react'

const ActionMessage = ({message,setMessage}) => {
    return (
        <div className='flex justify-center text-white'>
            <span className={`text-center p-2 ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
                {message} </span>
            <button onClick={() => setMessage('')} className='text-white bg-red-600 p-2'>x</button>
        </div>
    )
}

export default ActionMessage