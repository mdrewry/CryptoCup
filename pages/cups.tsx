import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDocs,QueryDocumentSnapshot,DocumentData, Timestamp,addDoc} from "firebase/firestore";
import {useState,useEffect} from "react";
import {Cup} from "../lib.d";
import { List,ListItem,ListItemText,ListSubheader } from '@mui/material'


const Cups: NextPage = () => {
    const [cups,setCups]=useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const cupsRef=collection(db,"cups");
    const getCups=async()=>{
        const data=await getDocs(cupsRef);
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        data.forEach((c)=>{
            result.push(c);
        }
        )
        // setCups(data.docs.map((item)=>{
        //     return {...item.data(),id:item.id}
        // }));
        
        setCups(result);
        // setLoading(false);
    };
    
    useEffect(()=>{
        getCups();
        setTimeout( () => {
            setLoading(false);
          },2000)
    },[]);
    


    const router = useRouter()
    const {
      query: { id },
    } = router

    const createCup=()=>{
        addDoc(cupsRef,{
            buyIn: 50,
            cryptosAvailable: ["a","b"],
            cupType: "String",
            currentState: 2,
            director: "String",
            endDate: Date.now(),
            name: "String",
            playerCuts: [1,2,3],
            startDate: Date.now(),
            user: "String"
        });
    }
    
    return(
        <div className={styles.center}>
            Viewing Cups
            
            {loading ? (<div>loading</div>) :
                (cups.map((c)=>
                <List
                sx={{
                    alignItems: 'center'
                  }}>
                    {c.get("director")}
                </List>
                ))
            }
            <button onClick={createCup}>Click Me to Create New Cup</button>
        </div>
        )
    
}

export default Cups