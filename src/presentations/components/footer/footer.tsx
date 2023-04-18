import React, { memo } from 'react'
import content from './footer.module.scss'

export const Footer: React.FC = memo(function Footer () {
  return (
    <footer className={content.footer}></footer>
  )
})
