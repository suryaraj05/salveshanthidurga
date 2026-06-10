export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-olive-600 text-cream-50 hover:bg-olive-700 shadow-md hover:shadow-lg dark:bg-olive-500 dark:hover:bg-olive-400',
    secondary:
      'bg-cream-200 text-olive-800 hover:bg-cream-300 dark:bg-olive-800 dark:text-cream-100 dark:hover:bg-olive-700',
    outline:
      'border-2 border-olive-500 text-olive-700 hover:bg-olive-50 dark:border-olive-400 dark:text-cream-100 dark:hover:bg-olive-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-olive-700 hover:bg-olive-100 dark:text-cream-200 dark:hover:bg-olive-800',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
