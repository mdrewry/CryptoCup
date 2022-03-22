import type { NextPage } from 'next'
import cupstyles from '../styles/Cups.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDocs,QueryDocumentSnapshot,DocumentData, Timestamp,addDoc} from "firebase/firestore";
import {useState,useEffect} from "react";
import Grid from '@mui/material/Grid';
import moment from  'moment';
import Cup from "../Components/ViewCup";
import Head from "next/head";

const Cups: NextPage = () => {
    const { pathname } = useRouter();
    const [path, setPath] = useState(pathname.substring(1).split("/")[0]);
    return(
        <div>
            <Head>
            <title>Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={cupstyles.padding}>
            <h1>My Cups</h1>
            <h4 className={cupstyles.ongoing}>Ongoing Cups:</h4>
            <Cup path={path}/>
            <h4 className={cupstyles.upcoming}>Upcoming Cups:</h4>
        </div>
            
            
        </div>
        )
    
}

export default Cups