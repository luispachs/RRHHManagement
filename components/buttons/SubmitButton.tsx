'use client';
import styles from '@/components/buttons/styles/submitButton.module.css';

export default function SubmitButton(params:{label:string;}){

    return (
        <button type="submit"  title={params.label} className={styles.button}>{params.label}</button>
    );
}