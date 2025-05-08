import type { HttpErrorResponse } from "@/model/HttpErrorResponse";
import { toast } from "react-toastify";

function defaultErrorHandler(errorEntity: HttpErrorResponse) {
  if (errorEntity.message) {
    toast.error(errorEntity.message, { position: "top-right" });
  }
  if (errorEntity.generalErrors) {
    errorEntity.generalErrors.forEach((error) => {
      toast.error(error, { position: "top-right" });
    });
  }
  if (errorEntity.errors) {
    for (const [key, value] of Object.entries(errorEntity.errors || {})) {
      toast.error(`${key}: ${value}`, { position: "top-right" });
    }
  }
}

export const fetchErrorEvent = new EventTarget();

// for event by name "api-fetch-error" set the listener
function onApiFetchError(listener: (event: CustomEvent) => void) {
  fetchErrorEvent.addEventListener("api-fetch-error", listener as EventListener);
}

// add listener to the event
onApiFetchError((event) => {
  console.error("API Fetch Error:", event.detail.errorEntity);
  defaultErrorHandler(event.detail.errorEntity);
});