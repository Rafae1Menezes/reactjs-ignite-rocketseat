import { signIn, signOut, useSession } from 'next-auth/react'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {
   const { data: session } = useSession()

   return session ? (
      <button onClick={()=>signOut()} type="button" className={styles.signInButton}>
         <FaGithub color='#04d361' />
         {session.user.name}
         <FiX className={styles.closeIcon} />
      </button>
   ) : (
      <button onClick={()=>signIn('github')} type="button" className={styles.signInButton}>
         <FaGithub color='#eba417' />
         Sign in with Github
      </button>
   )
}
