import React from 'react'

const Underline = ({ color }) => {
    return (
        <svg className='mx-auto'
            width="150px"
            height="40px"
            viewBox="0 0 145 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.00016 15.2711C18.1407 8.34427 70.832 -1.93441 144.473 12.3652"
                stroke={`${color}`}
                strokeWidth="4"
                style={{ strokeDasharray: '146, 148', strokeDashoffset: 0 }}
            />
            <path
                d="M26.2943 14.0041C38.9177 9.44643 77.3772 3.50055 130.227 16.1786"
                stroke={`${color}`}
                strokeWidth="2"
                style={{ strokeDasharray: '106, 108', strokeDashoffset: 0 }}
            />
        </svg>
    )
}

export default Underline