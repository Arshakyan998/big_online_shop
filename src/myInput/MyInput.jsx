import React from 'react'

import './input.scss'

const MyInput = ({children,...props}) => {
        return (
                <div>
                        <input type="text" {...props}/> <span>{children}</span>
                </div>
        )
}

export default MyInput
