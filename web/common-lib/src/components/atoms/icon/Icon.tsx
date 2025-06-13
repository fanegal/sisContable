import './icon.scss'

interface IconProps {
  type?: '' | 'outlined' | 'round'
  name: string
}

export default function Icon({ type = 'outlined', name }: IconProps) {
  const classMap = {
    '': 'material-icons',
    'outlined': 'material-icons-outlined',
    'round': 'material-icons-round',
  } as const

  return <span className={classMap[type]}>{name}</span>
}
