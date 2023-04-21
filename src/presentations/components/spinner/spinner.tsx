import React from 'react'
import content from './spinner-style.module.scss'

type Props = React.HTMLAttributes<HTMLElement> | {
  className: string
}

export const Spinner: React.FC<Props> = (props: Props) => {
  return (
        <div data-testid='spinner' {...props} className={[content.spinner, props.className].join(' ')}>
            <div /><div /><div /><div /><div /><div /><div /><div />
        </div>
  )
}
