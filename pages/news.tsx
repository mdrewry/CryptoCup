import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/News.module.css'
import { useRouter } from "next/router"
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import {db} from "../config/firebase.config"
import {useState,useEffect} from "react";
import FadeDisplay from "../Components/FadeDisplay";



import { List,Grid } from '@mui/material'
import { style } from '@mui/system';


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
      setTrending(result.pop());
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
          <h5 className={styles.newsTitle}>Trending</h5>
          {loading ? (<div>loading</div>) :
          <div>
          <a href={trending.get("source")}>
            <div className={styles.trendCard}>
              <img src={trending.get("imageURL")} width="50%" height="25%"></img>
            </div>
            
            <div className={styles.newsSource}>
              <h5>{trending.get("title")}</h5>
              <h6>{trending.get("sourceName")}</h6>
            </div>
          </a>
          <FadeDisplay className = {styles.newsSource} variant="contained" disabled={true}>{trending.get("tag")}</FadeDisplay>
          <h6 className = {styles.newsSource}>{trending.get("text")}</h6>
          </div>
          }
          <h1 className={styles.title}>
            Read More
          </h1>
          {loading ? (<div></div>) :
              <Grid container xs={12}>
                {
                  
                  newsDocs.map((article)=>
                    <Grid item xs={4} >
                      <div>
                        <a href={article.get("source")}>
                          <div className={styles.newsCard}>
                            <img src={article.get("imageURL")} width="90%" height="300"></img>
                          </div>
                          
                          <div className={styles.newsSource}>
                            <h5>{article.get("title")}</h5>
                            <h6>{article.get("sourceName")}</h6>
                          </div>
                        </a>
                        <FadeDisplay className = {styles.newsSource} variant="contained" disabled={true}>{article.get("tag")}</FadeDisplay>
                      </div>
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