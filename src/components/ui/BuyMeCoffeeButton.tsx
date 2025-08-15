'use client'

export default function BuyMeCoffeeButton({ username = '' }: { username?: string }) {
  const handleClick = () => {
    if (username) {
      window.open(`https://www.buymeacoffee.com/${username}`, '_blank', 'noopener,noreferrer')
    }
  }

  if (!username) return null

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 rounded-xl text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
    >
      <span>☕</span>
      <span className="hidden sm:inline">Buy Me A Coffee</span>
      <span className="sm:hidden">Coffee</span>
    </button>
  )
}