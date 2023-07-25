import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // import getDocs dan collection
import { db } from '../pages/api/firebase'; // ganti dengan alamat file firebase Anda
import CategoryItem from './CategoryItem';

function CategoryList({ setSelectedCategory }) {
   const [category, setCategory] = useState([]);

   useEffect(() => {
      const fetchCategory = async () => {
         const categorys = [];
         const querySnapshot = await getDocs(collection(db, 'categorys'));
         // ganti 'categorys' dengan nama koleksi yang benar di Firestore
         querySnapshot.forEach((doc) => {
            categorys.push({ id: doc.id, ...doc.data() });
         });
         setCategory(categorys);
      };
      fetchCategory();
   }, []);

   return (
      <div>
         <h2 className="text-[20px] mt-3 font-bold mb-3">Pilih Kategori Favorit Kamu</h2>
         {category ? (
            <div className="flex gap-6 mb-5">
               {category?.map((item, index) => (
                  <div key={index} onClick={() => setSelectedCategory(item.value)}>
                     <CategoryItem category={item} />
                  </div>
               ))}
            </div>
         ) : null}
      </div>
   );
}

export default CategoryList;
