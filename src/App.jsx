import React, { useEffect, useState } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import 'tachyons'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/utils/ProtectedRoute'
import { useAuth } from './components/utils/AuthContext'
import { initLocalStorageTimer, startExactClearTimer } from './components/utils/storageTimer';


export default function App() {

  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imgError, setImgError] = useState('')
  const [box, setBox] = useState([])
  const { user, faceDetection } = useAuth();


  useEffect(() => {
    initLocalStorageTimer(); // checks / sets expiry
    startExactClearTimer(); //clears while app is open
  }, []);
  


  const calculateFaceLocation = (data) => {

console.log('data', data )
    const regions = data.outputs[0].data.regions; // Check if 'regions' still exists



    if (regions && regions.length > 0) {


      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      const clarifaiFace1 = regions?.map((region) => ({
        topRow: region.region_info.bounding_box.top_row * height,
        leftCol: region.region_info.bounding_box.left_col * width,
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height),
        rightCol: width - (region.region_info.bounding_box.right_col * width),
      }))



      return clarifaiFace1

    } else {
      // console.log('error', data?.status?.description);
      return [];
    }

  }


  const displayFaceBox = (box) => {

    setBox(box)



  }
  const onInputChange = (e) => {
    setInput(e.target.value)
  }


  const onButtonSubmit = async (e) => {
    e.preventDefault()
    setImgError('')
    setImageUrl(input);
    if (input.length > 3) {

      const response = await faceDetection(input);

      if (response.status === 200) {

        if (response?.data?.status?.code === 30002){
          setImgError('"Download failed or we could not process it. Check URL or bytes you send in the request. Some URLs restrict downloads. Try uploading rather than using URLs."')
        } else if (response?.data?.outputs) {
          displayFaceBox(calculateFaceLocation(response?.data))
          const userData = JSON.parse(localStorage.getItem("user")); 
          const updatedUser = { ...userData, entries: response?.data?.entries};
          localStorage.setItem('user', JSON.stringify(updatedUser))
          
        }
        else {
          // add the entries to the request on the backend
          //  Draw bounding box
          displayFaceBox(calculateFaceLocation(response));

        }

      } else {
        setImgError('Error in face detection. Please try again.')
      }

    }

  };





  return (
    <div>
      <ParticlesBg type="polygon" bg={true} />
      <Navigation />


      <Routes>
        {/* Private route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Logo />
              <Rank />
              {imgError && (
              <div className="bg-washed-red dark-red pa2 br2 mb3 tc">
                {imgError}
              </div>)}

              <ImageLinkForm
                onInputChange={onInputChange}
                onSubmitButtonImage={onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </ProtectedRoute>
          }


        />



        {/* Public route */}

        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />


        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/signin" />} />


      </Routes>
    </div>
  )
}
