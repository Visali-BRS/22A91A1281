export function log(level, message, packageName = "URLShortener") {
  fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <YOUR_TOKEN>"
    },
    body: JSON.stringify({ level, message, packageName })
  });
}
