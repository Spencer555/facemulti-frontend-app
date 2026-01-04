import React from 'react'

export default function Rank() {

  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className='white f3 tc'>
        {`${storedUser?.username}, your current rank is ....`}
      </div>
      <div className='white f1 tc'>
        {`${storedUser?.entries}`}
      </div>
    </div>
  )
}
