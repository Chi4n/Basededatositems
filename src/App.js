import { db } from "./config/firebase";
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc} from 'firebase/firestore';
import { useState, useEffect } from "react";




function App() {
    
    const [itemList, setItemList] = useState ([]); 
    const [newItemNombre, setNewItemNombre] = useState('');
    const [newItemPrecio, setNewItemPrecio] = useState(0);
    const [newItemStock, setItemStock] = useState(0);
    const [updatedNombre, setUpdatedNombre] = useState('');





    const getItemList = async () => {
        const data = await getDocs(itemCollectionRef);
        
        const filterData = data.docs.map( (doc)=>({...doc.data(),id:doc.id}));
        console.log(filterData)

        setItemList(filterData);

       
        
    }



    const itemCollectionRef = collection(db, "items");
    useEffect(() => {
      
         getItemList()

    }, [])


    const onsubmitItem = async ()  =>{

        await addDoc (itemCollectionRef, {nombre: newItemNombre, precio: newItemPrecio, stock:newItemStock})
        getItemList();



    }


    const deleteItem = async (id)=>{

        const itemDoc  = doc(db,'items', id);

        await deleteDoc(itemDoc);

        getItemList();

    }


    const updatedItemNombre = async (id)=>{

        const itemDoc  = doc(db,'items', id);

        await updateDoc(itemDoc,{nombre:updatedNombre});

        getItemList();

    }








    return (
        <div>

            <div>
                <h2>Nuevo item</h2>

                <input placeholder="Nombre" onChange={(e)=>setNewItemNombre(e.target.value)}></input>
                <input placeholder="Precio" type="number"onChange={(e)=>setNewItemPrecio(Number(e.target.value))}></input>
                <input placeholder="Stock" type="number"onChange={(e)=>setItemStock(Number(e.target.value))}></input>
                
                <button onClick={ onsubmitItem }>Enviar</button>

            </div>


            




            {itemList.map((item)=>(
                
                <div key={item.id}>

                    <h2>{item.nombre}</h2>
                    <p> Precio: $ {item.precio}</p>
                    <p style={{color: item.stock > 0 ? 'green' : 'red'}}> Stock : {item.stock}</p>
                    <button onClick={()=>deleteItem(item.id)}>Borrar</button>


                    <input placeholder="Modificar" onChange={(e)=> setUpdatedNombre(e.target.value)}/>
                    <button onClick={()=> updatedItemNombre(item.id)}>Enviar</button>

                </div>
            ))}
        </div>
    )
     
}
export default App;


