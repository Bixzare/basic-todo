export default function GridSkeleton(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="w-auto h-[200px] bg-card rounded-lg animate-pulse"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="p-4 space-y-4">
            {/* Title */}
            <div className="w-3/4 h-6 bg-card-foreground/20 rounded"></div>
            {/* Description */}
            <div className="w-full h-4 bg-card-foreground/20  rounded"></div>
            <div className="w-5/6 h-4 bg-card-foreground/20  rounded"></div>
            {/* Footer */}
            <div className="w-1/2 h-4 bg-card-foreground/20  rounded mt-4"></div>
            <div className = "w-20 h-4 rounded mt-4 float-right bg-card-foreground/20 "></div>
          </div>
        </div>
      ))}
    </div>
    )
}