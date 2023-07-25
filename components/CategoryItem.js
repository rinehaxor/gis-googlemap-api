import Image from 'next/image';
import React from 'react';

function CategoryItem({ category }) {
   return (
      <div className="flex flex-col items-center bg-white p-3 rounded-2xl hover:scale-105 transition-all duration-200 cursor-pointer">
         <h2 className="text-[12px] text-blue-700">{category.name}</h2>
      </div>
   );
}

export default CategoryItem;
