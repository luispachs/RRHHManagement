'use client';
import styles from '@/components/forms/styles/RecoveryPasswordForm.module.css'
import SubmitButton from '../buttons/SubmitButton';
export default function RecoveryPasswordForm(params:{dictionary:any}){

    return (
        <form className={styles.form__recoveryPassword}>
            <section className={styles.form__section_inputGroup}>
                <h1 className={styles.title}>{params.dictionary.title}</h1>
            </section>
            <section className={styles.form__section_inputGroup}>
                <input type='email' placeholder={params.dictionary.label_email}/>
            </section>
            <section className={styles.form__section_inputGroup}>
                <SubmitButton label={params.dictionary.submit_label}/>
            </section>
        </form>
    );
}   