import cupstyles from '../styles/Cups.module.css'
import { useRouter } from "next/router"
import {db} from "../config/firebase.config"
import {collection,getDoc,getDocs,DocumentSnapshot,DocumentData, doc,where,query,onSnapshot, DocumentReference} from "firebase/firestore";
import {useState,useEffect,useContext} from "react";
import Grid from '@mui/material/Grid';
import moment from  'moment';
import { UserContext } from "../context/UserProvider";

type ContentProps = { filter: Number };
const Cups = ({ filter }: ContentProps) => {
    const user = useContext(UserContext);
    const [cups,setCups]=useState<DocumentSnapshot<DocumentData>[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const cupsRef=collection(db,"cups");
    
    const getCups=async()=>{
        
        const userDocRef=doc(collection(db,"users"),user.uid);
        const userQuery=query(collection(db,"cupsInUser"), where("user","==",userDocRef));
        const result: DocumentSnapshot<DocumentData>[] = [];
        //filter==0 for ongoing cups(player), filter==1 for upcoming cups(player based), filter==2 for ALL upcoming cups
        if(filter==2){
            const data=await getDocs(cupsRef);
            data.forEach((c)=>{
                if(moment(c.get("startDate"))>moment()){
                    result.push(c);
                }
            })
        }else{
            onSnapshot(userQuery,(snapshot)=>{
                const userCups:DocumentReference[]=snapshot.docs.at(0)?.data().cups;
                if(userCups!=null){
                    userCups.forEach((c)=>{
                        getDoc(c).then((d)=>{
                            if(filter==0 && (moment(d.get("startDate"))<=moment() && moment(d.get("endDate"))>moment())){
                                result.push(d);
                            }else if(filter==1 && moment(d.get("startDate"))>moment()){
                                result.push(d);
                            }
                            
                            
                        });
                    })
                }
            })
        }
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

    // const createCup=()=>{
    //     addDoc(cupsRef,{
    //         buyIn: 50,
    //         cryptosAvailable: ["a","b"],
    //         cupType: "String",
    //         currentState: 2,
    //         director: "String",
    //         endDate: Date.now(),
    //         name: "String",
    //         playerCuts: [1,2,3],
    //         startDate: Date.now(),
    //         user: "String"
    //     });
    // }
      
    return(
        <div>
            {loading ? (<p>loading</p>) :
            <Grid container >
                {cups.map((c)=>
                    <Grid item xs={12} md={6} lg={4} xl={3}>
                        <div className={cupstyles.placeholder}></div>
                        <h5 className={cupstyles.name}>{c.get("name")}</h5>
                        <div className={cupstyles.cuptype}>{c.get("cupType")}</div>
                        <p>{moment(c.get("startDate")).format("M/D/YYYY")}-{moment(c.get("endDate")).format("M/D/YYYY")}</p>
                    </Grid>
                    )}
            </Grid>  
            }
        </div>
        )
    
}

export default Cups