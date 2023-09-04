import { NotificationManager } from "react-notifications";

export const handleError = (error, msg?: string) => {
  const status = error.response?.status;
  if (status === 403) {
    NotificationManager.info(
      `To access API features please navigate to "https://cors-anywhere.herokuapp.com/corsdemo" and request for temporary access to the demo server. This
      might take a few minutes to resolve the proxy.`
    );
  } else NotificationManager.error(msg || "An error occurred.");
};
