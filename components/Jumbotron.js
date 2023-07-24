import Image from 'next/image';
import React from 'react';

function Jumbotron() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8 h-auto">
         <div className="my-auto">
            <h1 className="text-4xl font-bold mb-3">GIS Kota Blitar 🚀</h1>
            <h2 className="discription font-semibold text-justify">
               Selamat datang di Situs GIS Lokasi Kota Blitar, portal khusus untuk memetakan dan memahami lokasi berbagai tempat Kota Blitar. Kami menyediakan sistem peta interaktif yang didukung oleh teknologi Geographic Information System
               (GIS) canggih yang memungkinkan pengguna untuk mengeksplor, menganalisis, dan memahami lokasi.
            </h2>
         </div>

         <div className="image-earth mx-auto my-auto">
            <Image src="/download.png" alt="bumi" width={350} height={350} />
         </div>
      </div>
   );
}

export default Jumbotron;
