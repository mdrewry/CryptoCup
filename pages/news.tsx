import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/News.module.css'
import { useRouter } from "next/router"
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import {db} from "../config/firebase.config"
import {useState,useEffect} from "react";



import { List,Grid } from '@mui/material'


const News: NextPage = () => {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(true);
    const [newsDocs,setNewsDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const [trending,setTrending] = useState<DocumentData>([]);
    const newsRef=collection(db,"news");
    

    const getNews=async()=>{
      const data=await getDocs(newsRef);
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      data.forEach((c)=>{
        result.push(c);
      }
      )
      setTrending(result[0]);
      delete result[0];
      setNewsDocs(result);
    };
    useEffect(()=>{
      getNews();
      setTimeout( () => {
        setLoading(false);
      },2000)
    },[]);
    return (
      <div className={styles.container}>
        <Head>
          <title>News</title>
          <meta name="description" content="News page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main className={styles.main}>
          <h1 className={styles.title}>
            News
          </h1>
          <p></p>
          <p>Trending</p>
          {loading ? (<div>loading</div>) :
            <div>
              <img src={trending.get("imageURL")} width="450" height="300"></img>
              <a href={trending.get("source")}>
              <h5>{trending.get("title")}</h5>
              </a>
              <h5>{trending.get("tag")}</h5>
            </div>
          }
          <h5 className={styles.title}>
            Read More
          </h5>
          {loading ? (<div>loading</div>) :
              <Grid container xs={12}>
                {
                  newsDocs.map((article)=>
                    
                    <Grid item xs={4} >
                    <img src={article.get("imageURL")} width="450" height="300"></img>
                    <a href={article.get("source")}>
                    <h5>{article.get("title")}</h5>
                    </a>
                    <h5>{article.get("tag")}</h5>
                    </Grid>
                  )
                }
              </Grid>
          }
          
        </main>
  
      </div>
    )
  }
  
  export default News