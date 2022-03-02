import type { NextPage } from 'next'
import cupstyles from '../styles/Cups.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDocs,QueryDocumentSnapshot,DocumentData, Timestamp,addDoc} from "firebase/firestore";
import {useState,useEffect} from "react";
import {Cup} from "../lib.d";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import moment from  'moment';

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

    /*const createCup=()=>{
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
    }*/
    
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '316px',
        maxHeight: '316px',
      });

      
    return(
        <div className={cupstyles.padding}>
            <h2>My Cups</h2>
            <h4>Current Cups:</h4>
            {loading ? (<div>loading</div>) :
            <Grid container >
                {cups.map((c)=>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <h5>{c.get("name")}</h5>
                        <div className={cupstyles.cuptype}>{c.get("cupType")}</div>
                        <p>{moment(c.get("startDate")).format("M/D/YYYY")}-{moment(c.get("endDate")).format("M/D/YYYY")}</p>
                    </Grid>
                    )}
            </Grid>  
            }
            <h4>Upcoming Cups:</h4>
        </div>
        )
    
}

export default Cups