import styles from '@/app/recovery-password/[token]/page.module.css';
import { UpdatePasswordForm } from '@/components/forms/UpdatePasswordForm';

export default async function Page({params}:{params:{token:string}}){


    

    return (<main className={styles.container}>
               <UpdatePasswordForm/>
            </main>)
}