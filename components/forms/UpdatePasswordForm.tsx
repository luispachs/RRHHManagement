'use client';
import styles from '@/components/forms/styles/UpdatePasswordForm.module.css';
import { useState } from 'react';


export function UpdatePasswordForm(){

    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
 
    return (
        <form className={styles.form}>
        <section className={styles.section}>
            <label className={styles.form_section_label}>Nueva contrasaeña</label><br/>
            <input type='password' name='password' id='password' className={styles.form_section_input}/>
        </section>
        <section className={styles.section}>
            <label className={styles.form_section_label}>Repita contrasaeña</label><br/>
            <input type='password' name='password' id='password' className={styles.form_section_input}/>
        </section>
        <section className={styles.section}>
        <button className={styles.submit_button}>Cambiar contraseña</button>
        </section>
    </form>
    )
}