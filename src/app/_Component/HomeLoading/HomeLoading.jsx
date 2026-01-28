// components/HomeLoading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function HomeLoading() {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      ))}
    </>
  )
}