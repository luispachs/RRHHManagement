'use client';
import styles from '@/components/forms/styles/LoginForm.module.css';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import LoginAction from '@/actions/LoginAction';
import { FormActionState } from '@/types/ActionsState/FormActionState';
import { useEffect, useRef, useState } from 'react';
import { redirect } from 'next/navigation';
import { ManagementFront } from '@/types/extras/ManagementFront';
import stylesButton from '@/components/buttons/styles/submitButton.module.css';

export default function LoginForm(params:{dictionary:any}){

    
    let initialState:FormActionState ={
        status:null,
        message:null,
        session:null,
        token:null
    }
    const [formResponse,setFormResponse] = useState<ManagementFront>({className:styles.none,message:null});
    const [formActionState,formAction] =useFormState(LoginAction,initialState);
    const [error,setError] = useState<{message:string,className:string}>({message:"",className:styles.no_error});
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const formRef = useRef<HTMLFormElement>(null);
    const [loading,setloading] = useState(false);

    useEffect(()=>{
        if(document.cookie.includes('session')){
            redirect('/app/dashboard');
        }


        if(formActionState.status == 400 || formActionState.status == 500){
            setFormResponse({className:styles.error,message:formActionState.message});
        }
        else if(formActionState.status==200){
            
            sessionStorage.setItem('_token',formActionState.token!);
            redirect('/app/dashboard');
        }
        else if(formActionState==null){
            setFormResponse({className:styles.none,message:null});
            
        }
        setloading(false);
    },[formActionState]);

    const onSubmit =(e:any)=>{
        e.preventDefault();
        e.stopPropagation();
        let message = params.dictionary.errors.label_submit_error as string;
        if(username.length == 0){
            
            message =message.replace("##field##","username");
            setError({message:message,className:stylesButton.error});
            setloading(false);
            return 0;
        }
        if(password.length ==0){
            message =message.replace("##field##","password");
            setError({message:message,className:stylesButton.error});
            setloading(false);
            return 0;


        }
        formRef.current?.requestSubmit();
    }

    return (
        <>
        {loading??<div className={styles.loading}></div>}
        <form className={styles.form} action={formAction} ref={formRef} >
            <div className={formResponse.className}><p>{formResponse.message}</p></div>
            <article className={styles.form__acticle__form_groups} >
                <h1 className={styles.title}>{params.dictionary.login_page.label_sign_up}</h1>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <input type='text' placeholder={params.dictionary.login_page.label_username} name='username' id='username' onChange={(e)=>{setUsername(e.target.value)}}/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <input type='password' placeholder={params.dictionary.login_page.label_password} name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </article>
            <article className={styles.form__acticle__form_groups} >
            <div className={error.className}>{error.message}</div>
                <button type="submit"  title={params.dictionary.login_page.label_button} className={stylesButton.button} onClick={event=>{
                        setloading(true);
                    onSubmit(event)
                    
            }} disabled={loading}>{(loading)?". . .":params.dictionary.login_page.label_button}</button>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <Link href='/recovery-password' className={styles.link}>{params.dictionary.login_page.recovery_password}</Link>
            </article>
        </form>
        </>
    );
}

// {<SubmitButton label={params.dictionary.login_page.label_button} error={params.dictionary.login_page.label_button}/>}