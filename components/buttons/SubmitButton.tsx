'use client';
import styles from '@/components/buttons/styles/submitButton.module.css';
import { useState } from 'react';


export default function SubmitButton(params:{label:string;error:string}){

    const [error,setError] = useState<{message:string,className:string}>({message:"",className:styles.no_error});
    const submitAction =(e:any)=>{
        e.preventDefault();
        try{
        let inputs = document.getElementsByTagName('input');
        for(let i=0;i<= inputs.length-1;i++){
           let elem = inputs[i];
           if(elem.value == null || elem.value == undefined || elem.value == ""){
                if(elem.type != 'hidden'){
                    let err = params.error.replace("##field##",elem.name);
              
                    throw new TypeError(err);
                }
           }
           
        }
        document.getElementsByTagName('form').item(0)!.requestSubmit();
        }
        catch(error:any){
            setError({message:error.message,className:styles.error})
        }
    }
    return (
        <>
        <div className={error.className}>{error.message}</div>
        <button type="submit"  title={params.label} className={styles.button} onClick={event=>submitAction(event)}>{params.label}</button>
        </>
    );
}