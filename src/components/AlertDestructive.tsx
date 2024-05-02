import { AlertCircle } from "lucide-react"
import "css/Alert.css"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive({isHidden}: AlertDestructiveProps) {
  return (
    <Alert variant="destructive" hidden={isHidden} style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        width: "25rem"
    }}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}

interface AlertDestructiveProps {
    isHidden: boolean
}
