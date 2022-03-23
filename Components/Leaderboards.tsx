import type { NextPage } from 'next'
import cupstyles from '../styles/Cups.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDoc,getDocs,DocumentSnapshot,DocumentData, doc,where,query,onSnapshot, QueryDocumentSnapshot,orderBy} from "firebase/firestore";
import {useState,useEffect} from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


const Leaderboard: NextPage = () => {
    const [leaderboard,setLeaderboard]=useState<DocumentSnapshot<DocumentData>[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    
    const getLeaderboard=async()=>{
        const rankQuery= query(collection(db,"users"),orderBy("cupWins","desc"));
        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        const data=await getDocs(rankQuery);
        data.forEach((c)=>{
            result.push(c);
        })
        console.log(result);
        // setCups(data.docs.map((item)=>{
        //     return {...item.data(),id:item.id}
        // }));
        
        setLeaderboard(result);
        // setLoading(false);
    };
    
    useEffect(()=>{
        getLeaderboard();
        setTimeout( () => {
            setLoading(false);
          },2000)
    },[]);
    


    const router = useRouter()
    const {
      query: { id },
    } = router

      
    return(
        
        <div className={cupstyles.padding}>
            {loading ? (<div>loading</div>) :
            (
                <div>
                    {leaderboard.map((c) => (
                        <Grid container>
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                                <img className={cupstyles.leaderboardProfile} src={c.get("imageURL")}/>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4} xl={3}> 
                                <h6>{c.get("firstName")} {c.get("lastName")}</h6>
                            <p>{c.get("cupWins")} Wins - ${c.get("totalEarnings")}</p>
                            </Grid>
                            
                        </Grid>
                    ))}
                    </div>
            )} 
            
        </div>
        )
    
}

export default Leaderboard