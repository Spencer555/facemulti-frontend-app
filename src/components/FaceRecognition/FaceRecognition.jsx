import React from 'react'
import './FaceRecognition.css'

export default function FaceRecognition({ imageUrl, box }) {
  return (
    <div className='center ma'>
      <div className="absolute mt2">
        {imageUrl.length > 3 ? 
        <img
          id='inputImage'
          src={imageUrl}
          alt="image"
          width='500px'
          height='auto'
          /> : ''}

        {Array.isArray(box) && box.map((face, i) => (
          <div
            key={i}
            className='bounding-box'
            style={{
              top: face.topRow,
              right: face.rightCol,
              bottom: face.bottomRow,
              left: face.leftCol
            }}
          />
        ))}
      </div>
    </div>
  )
}
