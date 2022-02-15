import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDocs} from "firebase/firestore";
import {useState,useEffect} from "react";


const Cups: NextPage = () => {
    const [cups,setCups]=useState([]);
    const cupsRef=collection(db,"cups");
    useEffect(()=>{
        const getCups=async()=>{
            const data=await getDocs(cupsRef);
            //setCups(data.docs.map((doc)=>({doc.data()})));
            console.log(data)
        };

        getCups();
    },[]);
    


    const router = useRouter()
    const {
      query: { id },
    } = router

    return(
        <div>Viewing Cups</div>
    )

}

export default Cups