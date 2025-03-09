export default function Loading() {
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-background bg-opacity-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent"></div>
      </div>
  
    )
}