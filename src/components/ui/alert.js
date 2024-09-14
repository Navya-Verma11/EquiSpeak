import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <AlertDialogPrimitive.Root>
    <AlertDialogPrimitive.Trigger asChild>
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${
          variant === "destructive"
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-green-200 bg-green-50 text-green-800"
        } ${className}`}
        {...props}
      />
    </AlertDialogPrimitive.Trigger>
  </AlertDialogPrimitive.Root>
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }