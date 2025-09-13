import './icon.scss'

interface IconProps {
  type?: '' | 'outlined' | 'round' | 'symbols'
  name: string,
  extraClass?:string
}

export default function Icon({ type = 'outlined', name, extraClass }: IconProps) {
  const classMap = {
    '': 'material-icons',
    'outlined': 'material-icons-outlined',
    'round': 'material-icons-round',
    'symbols': 'material-symbols-outlined',
  } as const

  return <span className={`${classMap[type]} ${extraClass ? extraClass : ''}`}>{name}</span>
}
