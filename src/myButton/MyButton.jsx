import React from 'react'

import style from './button.module.scss'


function MyButton({children,...props}) {
        return (
                <div>
                <button className={style.btn} {...props}>
 {children}
                </button>
                </div>
        )
}

export default MyButton
