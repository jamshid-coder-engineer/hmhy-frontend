import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "./input"
import { Button } from "./button"


type InputProps = React.ComponentPropsWithoutRef<"input">

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        className={`pr-10 ${className ?? ""}`}
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8"
        onClick={() => setShow((v) => !v)}
      >
        {show ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
})

PasswordInput.displayName = "PasswordInput"
