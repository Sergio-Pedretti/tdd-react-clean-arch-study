import React, { memo } from 'react'
import content from './login-header.module.scss'
import { Logo } from '@/presentations/components/logo/logo'

export const LoginHeader: React.FC = memo(function LoginHeader () {
  return (
     <header className={content.header}>
        <Logo />
        <h1>4Devs - Enquetes para Programadores</h1>
      </header>
  )
})
