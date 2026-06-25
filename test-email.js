import { sendDigestEmail } from "./lib/email.js";

const result = await sendDigestEmail(
  "your_own_email@gmail.com", // send to yourself
  "Raydar test email",
  "<h1>If you see this, SMTP works</h1>"
);

console.log(result);