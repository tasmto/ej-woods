export enum Icons {
  '💬',
  '📌',
  '🚀',
  '🛒',
  '💳',
  '📦',
  '📃',
  '🤙',
  '🔍',
  '📅',
  '➕',
  '➖',
  '👤',
}

const resolveIcon = (
  icon: keyof typeof Icons,
  iso: boolean
): {
  icon: string
  active: string
} | null => {
  if (!icon) return null

  const iconName =
    icon === '💬'
      ? 'chat'
      : icon === '📌'
      ? 'location'
      : icon === '🚀'
      ? 'rocket'
      : icon === '🛒'
      ? 'bag'
      : icon === '💳'
      ? 'card'
      : icon === '📦'
      ? 'cube'
      : icon === '📃'
      ? 'file'
      : icon === '🤙'
      ? 'call'
      : icon === '🔍'
      ? 'search'
      : icon === '📅'
      ? 'calendar'
      : icon === '➕'
      ? 'plus'
      : icon === '➖'
      ? 'close'
      : icon === '👤'
      ? 'person'
      : undefined

  if (!iconName) return null

  return {
    icon: iso
      ? `/icons/${iconName}-icon-iso.png`
      : `/icons/${iconName}-icon.png`,
    active: iso
      ? `/icons/${iconName}-icon--active-iso.png`
      : `/icons/${iconName}-icon--active.png`,
  }
}

export default resolveIcon
