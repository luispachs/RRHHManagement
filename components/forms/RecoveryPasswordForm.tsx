'use client';
import styles from '@/components/forms/styles/RecoveryPasswordForm.module.css'
import RecoveryPasswordAction from '@/actions/RecoveryPasswordAction';
import { useFormState } from 'react-dom';
import { RecoveryPasswordState } from '@/types/ActionsState/RecoveryPasswordState';
import { useEffect, useState,useRef } from 'react';
import stylesButton from '@/components/buttons/styles/submitButton.module.css';

export default function RecoveryPasswordForm(params:{dictionary:any}){
    let initialState:RecoveryPasswordState ={
        status:null,
        message:null
    }
    const [data,setData] = useState<{className:string;message:null|string}>({className:styles.none,message:null})
    const [formState,formAction] = useFormState(RecoveryPasswordAction,initialState)
    const [email,setEmail] = useState("");
    const [error,setError] = useState<{message:string,className:string}>({message:"",className:styles.no_error});

    const formRef = useRef<HTMLFormElement>(null);
    const [loading,setloading] = useState(false);
    useEffect(()=>{
        if(formState.status == 200 ){
            setloading(false)
            setData({className:styles.success,message:params.dictionary.recovery_password_page.successfull_message});
        }else if(formState.status ==500 ||formState.status ==400){
            setloading(false)
            setData({className:styles.error,message:formState.message});
        }
    },[formState]);


    const onSubmit =(e:any)=>{
        e.preventDefault();
        e.stopPropagation();
        let message = params.dictionary.errors.label_submit_error as string;
        if(email.length == 0){
            
            message =message.replace("##field##","email");
            setError({message:message,className:stylesButton.error});
            setloading(false);
            return 0;
        }
       
        formRef.current?.requestSubmit();
    }

    return (
        <form className={styles.form__recoveryPassword} action={formAction} ref={formRef} >
            <div className={data.className}><p>{data.message}</p></div>
            <section className={styles.form__section_inputGroup}>
                <h1 className={styles.title}>{params.dictionary.recovery_password_page.title}</h1>
            </section>
            <section className={styles.form__section_inputGroup}>
                <input type='email' placeholder={params.dictionary.recovery_password_page.label_email} name='email' id='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </section>
            <section className={styles.form__section_inputGroup}>
            <div className={error.className}>{error.message}</div>

            <button type="submit"  title={params.dictionary.recovery_password_page.submit_label} className={stylesButton.button} onClick={event=>{
                    setloading(true);
                    onSubmit(event)
                    
            }} disabled={loading}>{(loading)?". . .":params.dictionary.recovery_password_page.submit_label}</button>
               
            </section>
        </form>
    );
}   


// <SubmitButton label={params.dictionary.recovery_password_page.submit_label} error={params.dictionary.errors.label_submit_error}/>