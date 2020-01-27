import {useState,useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const request = useCallback(async (url, method = 'GET' , body = null) => {
        setLoading(true)
        try{
           console.log(body); 
           const responce = await fetch(url,{method , body ,headers: {
            'Content-Type': 'application/json'
          }})
           const data = await responce.json()
           if(!responce.ok){
               throw new Error('Something happened')
           }
           setLoading(false)
           return data
        }catch(e){
            setLoading(false)
        }
    },[])

    return { loading , request}
}