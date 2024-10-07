import { redirect } from "next/navigation";

export default async function Custom404() {
  "use server";
  redirect("/about");

  return null;
}
