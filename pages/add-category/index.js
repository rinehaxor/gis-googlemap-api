import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../api/firebase';
import { useState, useEffect } from 'react';

export default function AddCategory() {
   const [name, setName] = useState('');
   const [value, setValue] = useState('');
   const [editName, setEditName] = useState('');
   const [editValue, setEditValue] = useState('');
   const [editingId, setEditingId] = useState(null);
   const [categorys, setCategorys] = useState([]);

   useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, 'categorys'), (snapshot) => {
         const newCategorys = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

         setCategorys(newCategorys);
      });

      return () => unsubscribe();
   }, []);

   async function handleAdd() {
      await addDoc(collection(db, 'categorys'), { name: name, value: value });
      setName('');
      setValue('');
   }

   function handleStartEdit(category) {
      setEditName(category.name);
      setEditValue(category.value);
      setEditingId(category.id);
   }

   async function handleUpdate() {
      if (editingId) {
         const itemRef = doc(db, 'categorys', editingId);
         await updateDoc(itemRef, { name: editName, value: editValue });
         setEditName('');
         setEditValue('');
         setEditingId(null);
      }
   }

   async function handleDelete(id) {
      const itemRef = doc(db, 'categorys', id);
      await deleteDoc(itemRef);
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gradient-to-r from-purple-400 to-blue-300 ">
         <h2 className="text-xl font-bold">Tambah Data</h2>
         <input className="px-4 py-2 border border-gray-300 rounded-md mb-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Kategori" />
         <input className="px-4 py-2 border border-gray-300 rounded-md" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Item Kategori" />
         <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md" onClick={handleAdd}>
            Tambah
         </button>

         {editingId && (
            <div className="flex flex-col items-center justify-center  py-4">
               <h2 className="text-xl font-bold">Edit Data</h2>
               <input className="px-4 py-2 border border-gray-300 rounded-md mb-2" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Ubah Nama Kategori" />
               <input className="px-4 py-2 border border-gray-300 rounded-md" value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder="Ubah Item Kategori" />
               <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md" onClick={handleUpdate}>
                  Simpan
               </button>
            </div>
         )}

         <div>
            <div className="flex flex-col ">
               <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                     <div className="overflow-hidden rounded-lg">
                        <table className="min-w-full text-left text-sm font-light ">
                           <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 ">
                              <tr>
                                 <th scope="col" className="px-6 py-4"></th>
                                 <th scope="col" className="px-6 py-4">
                                    Nama
                                 </th>
                                 <th scope="col" className="px-6 py-4">
                                    Kategori Google
                                 </th>
                                 <th scope="col" className="px-6 py-4">
                                    Aksi
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {categorys.map((category) => (
                                 <tr key={category.id} className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                                    <td className="whitespace-nowrap px-6 py-4">{category.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{category.value}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                       {' '}
                                       <button className="px-4 py-2 mt-2 mr-2 text-white bg-yellow-500 rounded-md" onClick={() => handleStartEdit(category)}>
                                          Edit
                                       </button>
                                       <button className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md" onClick={() => handleDelete(category.id)}>
                                          Hapus
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>

            {/* <input defaultValue={category.name} onChange={(e) => handleUpdate(category.id, e.target.value, category.itemCateogry)} />
               <input defaultValue={category.value} onChange={(e) => handleUpdate(category.id, e.target.value)} />

               <button className="px-4 py-2 mt-2 text-white bg-red-500 rounded-md" onClick={() => handleDelete(category.id)}>
                  Hapus
               </button> */}
         </div>
      </div>
   );
}

export async function getServerSideProps() {
   const categorys = [];
   const querySnapshot = await getDocs(collection(db, 'categorys'));
   querySnapshot.forEach((doc) => {
      categorys.push({ id: doc.id, ...doc.data() });
   });

   return {
      props: {
         categorys,
      },
   };
}
