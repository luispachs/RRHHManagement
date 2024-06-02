import { Metadata } from "next";
import styles from "@/app/home.module.css";
import LoginForm from "@/components/forms/LoginForm";
import { getDictionary } from "@/lib/facade/Dictionary";
import Image from "next/image";
import loginImage from '@/public/images/login_page_image_without_bg.png'
export const metadata:Metadata = {
    title:"",
    description:""
}

export default async function Home() {
  
  const dictionary = await getDictionary(); 

  return (
   
   <main className={styles.container}>
        <aside className={"container "+ styles.aside}>
            <section>
              <h1 className={styles.title}>{dictionary.login_page.title}</h1>
            </section>
            <section>
              <Image src={loginImage} width={600} height={400} alt="Login Image"/>
            </section>
        </aside>
        <section className={"container " + styles.section__login}>
          <LoginForm dictionary={dictionary}/>
        </section>
   </main>
   
  );
}
