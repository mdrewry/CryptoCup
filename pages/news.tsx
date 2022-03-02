import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/News.module.css'
import { useRouter } from "next/router"
import { collection, deleteDoc, doc, DocumentData, getDocs, limit, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import {db} from "../config/firebase.config"
import {useState,useEffect} from "react";



import { List } from '@mui/material'


const News: NextPage = () => {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(true);
    const [newsDocs,setNewsDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
    const newsRef=collection(db,"news");
    

    const getNews=async()=>{
      const data=await getDocs(newsRef);
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      data.forEach((c)=>{
        result.push(c);
      }
      )
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
          <h2 className={styles.title}>
            *News Article Title*
          </h2>
          <p>*News Source*</p>

          <h5 className={styles.title}>
            Based on your Interests
          </h5>
          <p>Interest #1</p>
          {loading ? (<div>loading</div>) :
                (newsDocs.map((c)=>
                <List
                sx={{
                    alignItems: 'center'
                  }}>
                    {c.get("title")}
                </List>
                ))
            }
          <p>Interest #2</p>
          <p>Interest #3</p>
          
        </main>
  
      </div>
    )
  }
  
  export default News