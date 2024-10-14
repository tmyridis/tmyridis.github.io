import { redirect } from "next/navigation";

export default async function Custom404() {
  redirect("/");

  return null;
}
