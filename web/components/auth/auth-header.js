export function AuthHeader({ title, description }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground text-sm text-balance">
          {description}
        </p>
      )}
    </div>
  )
} 