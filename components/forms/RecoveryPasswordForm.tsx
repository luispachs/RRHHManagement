'use client';
import styles from '@/components/forms/styles/RecoveryPasswordForm.module.css'
import SubmitButton from '../buttons/SubmitButton';
export default function RecoveryPasswordForm(params:{dictionary:any}){

    return (
        <form className={styles.form__recoveryPassword}>
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