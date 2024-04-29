'use client';
import styles from '@/components/forms/styles/LoginForm.module.css';
import SubmitButton from '../buttons/SubmitButton';
export default function LoginForm(params:{dictionary:any}){

    return (

        <form className={styles.form}>
            <article className={styles.form__acticle__form_groups} >
                <input type='text' placeholder={params.dictionary.label_username}/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <input type='password' placeholder={params.dictionary.label_password}/>
            </article>
            <article className={styles.form__acticle__form_groups} >
                <SubmitButton label={params.dictionary.label_button}/>
            </article>
        </form>

    );
}