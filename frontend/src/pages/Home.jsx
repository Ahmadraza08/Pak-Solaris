import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newsletter from '../components/Newsletter'
import LoadingWrapper from '../components/LoadingWrapper'

const Home = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <LoadingWrapper isLoading={loading}>

      <div>
        <Hero />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        {/* <Newsletter /> */}
      </div>

    </LoadingWrapper>
  )
}

export default Home

// import React, { useState } from 'react'
// import Hero from '../components/Hero'
// import LatestCollection from '../components/LatestCollection'
// import BestSeller from '../components/BestSeller'
// import OurPolicy from '../components/OurPolicy'
// import LoadingWrapper from '../components/LoadingWrapper'

// const Home = () => {
//   const [loading, setLoading] = useState(true)
//   const [loadedComponents, setLoadedComponents] = useState({
//     hero: false,
//     latest: false,
//     best: false
//   })

//   // Generic handler jab koi component load ho jaye
//   const handleComponentLoad = (componentName) => {
//     setLoadedComponents(prev => {
//       const updated = { ...prev, [componentName]: true }
//       // Stop loading animation jab sab load ho jaye
//       const allLoaded = Object.values(updated).every(Boolean)
//       if (allLoaded) setLoading(false)
//       return updated
//     })
//   }

//   return (
//     <LoadingWrapper isLoading={loading}>
//       <div>
//         <Hero onLoad={() => handleComponentLoad('hero')} />
//         <LatestCollection onLoad={() => handleComponentLoad('latest')} />
//         <BestSeller onLoad={() => handleComponentLoad('best')} />
//         <OurPolicy />
//       </div>
//     </LoadingWrapper>
//   )
// }

// export default Home