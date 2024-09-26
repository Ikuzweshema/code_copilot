import { AuthStatus } from "@/lib/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCheck, ShieldAlert } from "lucide-react";

export default function AlertMessage(status: AuthStatus) {
  return (
    <Alert
      variant={status.status === "success" ? "default" : "destructive"}
      className={`mt-3 ${status.status === "success" ? "bg-green-500" : ""}`}
    >
      <AlertDescription className={" flex justify-center"}>
        <span className={"text-md flex gap-2"}>
          {status.status === "success" ? (
            <CheckCheck size={15} />
          ) : (
            <ShieldAlert size={15} />
          )}
          {status.message}
        </span>
      </AlertDescription>
    </Alert>
  );
}