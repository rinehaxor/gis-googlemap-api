import { UserLocationContext } from '@/context/UserLocationContext';
import '@/styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
   const [userLocation, setUserLocation] = useState([]);
   useEffect(() => {
      getUserLocation();
   }, []);
   const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(function (pos) {
         setUserLocation({
            lat: -8.089496469860872,
            lng: 112.17222058036448,
         });
      });
   };
   return (
      <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
         <Component {...pageProps} />
      </UserLocationContext.Provider>
   );
}
