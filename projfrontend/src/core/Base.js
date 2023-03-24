import React from 'react'
import Menu from './Menu'
import "../styles/Base.css"
export default function Base({title="My title",description="My description",children}) {
  return (
    <div>
        <Menu/>
        <div className='admin-head'> <h2>{title}</h2>
        <p>{description}</p></div>
        <div>

            <div className="content">
                {children}
            </div>

        </div>
    </div>
  )
}
