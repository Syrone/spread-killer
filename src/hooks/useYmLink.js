import ym from 'react-yandex-metrika'

export const useYmLink = (goal) => {
	const onClick = (e) => {
    const link = e.target.closest('a')
    if (link && link.host !== window.location.host) {
      ym('reachGoal', goal, { href: link.href })
    }
  }
  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}