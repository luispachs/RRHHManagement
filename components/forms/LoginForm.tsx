'use client';
import styles from '@/components/forms/styles/LoginForm.module.css';
import SubmitButton from '../buttons/SubmitButton';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import LoginAction from '@/actions/LoginAction';
import { FormActionState } from '@/types/FormActionState';
export default function LoginForm(params:{dictionary:any}){

    
    let initialState:FormActionState ={
        status:null,
        message:null,
    }
    const [formActionState,formAction] =useFormState(LoginAction,initialState);

    return (

        <form className={styles.form} action={formAction}>
            <article className={styles.form__acticle__form_groups} >
                <h1 className={styles.title}>{params.dictionary.login_page.label_sign_up}</h1>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <input type='text' placeholder={params.dictionary.login_page.label_username} name='username' id='username'/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <input type='password' placeholder={params.dictionary.login_page.label_password} name='password' id='password'/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <SubmitButton label={params.dictionary.login_page.label_button} error={params.dictionary.errors.label_submit_error}/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <Link href='/recovery-password' className={styles.link}>{params.dictionary.login_page.recovery_password}</Link>
            </article>
        </form>

    );
}