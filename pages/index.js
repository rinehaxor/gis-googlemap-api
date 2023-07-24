import Image from 'next/image';

import SideNavBar from '@/components/SideNavBar';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';
import BusinessList from '@/components/BusinessList';
import GlobalApi from '@/services/GlobalApi';
import { useContext, useEffect, useState } from 'react';
import { UserLocationContext } from '@/context/UserLocationContext';
import GoogleMap_ from '@/components/GoogleMap_';
import { BusinessListContext } from '@/context/BusinessListContext';
import { SelectedBusinessContext } from '@/context/SelectedBusinessContext';
import BusinessToast from '@/components/BusinessToast';
import Jumbotron from '@/components/Jumbotron';

export default function Home() {
   const [businessList, setBusinessList] = useState([]);
   const [selectedBusiness, setSelectedBusiness] = useState([]);
   const { userLocation, setUserLocation } = useContext(UserLocationContext);
   useEffect(() => {
      if (userLocation) getNearByPlace('lodging');

      console.log(userLocation);
   }, [userLocation]);

   const getNearByPlace = (category) => {
      //lodging
      //   GlobalApi.getNearByPlace(category, userLocation?.lat, userLocation.lng).then((resp) => {
      //      setBusinessList(resp.data.results);
      //   });
      GlobalApi.getNearByPlace(category, '-8.089496469860872', '112.17222058036448').then((resp) => {
         setBusinessList(resp.data.results);
      });
   };
   return (
      <>
         <div className="bg-gradient-to-r from-purple-400 to-blue-300 text-white">
            <div className="flex">
               <Jumbotron />
            </div>
            <div className="flex">
               <SelectedBusinessContext.Provider value={{ selectedBusiness, setSelectedBusiness }}>
                  <BusinessListContext.Provider value={{ businessList, setBusinessList }}>
                     {/* <SideNavBar /> */}
                     <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8">
                        <div>
                           {/* Search */}
                           <SearchBar />
                           {/* Category */}
                           <CategoryList setSelectedCategory={(category) => getNearByPlace(category)} />
                           {/* Buisness list */}
                           <BusinessList businessListData={businessList} />
                        </div>

                        {/* Google Map */}
                        <div className="order-first md:order-last">
                           <GoogleMap_ />
                           <BusinessToast userLocation={userLocation} />
                        </div>
                     </div>
                  </BusinessListContext.Provider>
               </SelectedBusinessContext.Provider>
            </div>
         </div>
      </>
   );
}
