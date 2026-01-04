import React from 'react'
import './ImageLinkForm.css'






export default function ImageLinkForm({ onInputChange, onSubmitButtonImage
}) {
  return (
    <div>
      <p className='f3 tc'>
        {'This Magic Brain Will Detect Faces In Your Pics, Try It'}
      </p>
      <p className="f3 tc bg-light-gray pa3 br2 mw7 center break-word blue "
        style={{
          wordBreak: 'break-all',
          overflowWrap: 'anywhere'
        }}> Copy and paste this sample image URL to try it out
      </p>
      <p className="f3 tc bg-light-gray pa3 br2 mw7 center break-word blue underline pointer"
        style={{
          wordBreak: 'break-all',
          overflowWrap: 'anywhere'
        }}>
        https://t4.ftcdn.net/jpg/03/49/95/43/240_F_349954362_6uAf1A4T1NnkqhtLzVWNse3d8eBPFfqC.jpg
      </p>
      <div className='center '>
        <div className='center form pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type="text"
            onChange={onInputChange} />
          <button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple ' onClick={onSubmitButtonImage}>Detect</button>
        </div>
      </div>
    </div>
  )
}
