// src/components/menu-item/MenuItem.tsx
import { Icon } from "../icon/Icon"
import "./menu-item.scss"

interface Item {
  label: string
  onClick?: () => void
  icon?: string
  collapsed?: boolean
}

export function MenuItem({ item, arrow }: { item: Item; arrow?: string }) {
  const hasIcon = typeof item.icon === "string" && item.icon.length > 0

  return (
    <button className="menu-item" onClick={() => item.onClick?.()}>
      <div className="left">
        {hasIcon && <Icon name={item.icon!} />}
        {!item.collapsed && <span className="label">{item.label}</span>}
      </div>
      {!item.collapsed && arrow && <Icon name={arrow} />}
    </button>
  )
}
