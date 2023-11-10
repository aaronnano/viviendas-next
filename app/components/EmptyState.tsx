'use client';

import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { Heading } from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  redirect?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  redirect,
}) => {
  const router = useRouter();
  
  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <div className="
        py-8 px-20
        --border-[1.5px]
        --border-black
        rounded-xl
        flex flex-col items-center
      ">
        <Heading
          center
          title={title}
          subtitle={subtitle}
        />
        <div className="w-48 mt-4">
          {redirect && (
            <Button
              outline
              label="Redirect"
              onClick={() => router.push(redirect)}
            />
          )}
        </div>

      </div>
    </div>
   );
}
