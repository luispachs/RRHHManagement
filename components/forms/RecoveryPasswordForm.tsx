'use client';
import styles from '@/components/forms/styles/RecoveryPasswordForm.module.css'
import SubmitButton from '../buttons/SubmitButton';
import RecoveryPasswordAction from '@/actions/RecoveryPasswordAction';
import { useFormState } from 'react-dom';
import { RecoveryPasswordState } from '@/types/ActionsState/RecoveryPasswordState';
import { useEffect, useState } from 'react';
export default function RecoveryPasswordForm(params:{dictionary:any}){
    let initialState:RecoveryPasswordState ={
        status:null,
        message:null
    }
    const [data,setData] = useState<{className:string;message:null|string}>({className:styles.none,message:null})
    const [formState,formAction] = useFormState(RecoveryPasswordAction,initialState)
    useEffect(()=>{
        if(formState.status == 200 ){
            setData({className:styles.success,message:params.dictionary.recovery_password_page.successfull_message});
        }else if(formState.status ==500 ||formState.status ==400){
            setData({className:styles.error,message:formState.message});
        }
    },[formState])

    return (
        <form className={styles.form__recoveryPassword} action={formAction}>
            <div className={data.className}><p>{data.message}</p></div>
            <section className={styles.form__section_inputGroup}>
                <h1 className={styles.title}>{params.dictionary.recovery_password_page.title}</h1>
            </section>
            <section className={styles.form__section_inputGroup}>
                <input type='email' placeholder={params.dictionary.recovery_password_page.label_email} name='email' id='email'/>
            </section>
            <section className={styles.form__section_inputGroup}>
                <SubmitButton label={params.dictionary.recovery_password_page.submit_label} error={params.dictionary.errors.label_submit_error}/>
            </section>
        </form>
    );
}   