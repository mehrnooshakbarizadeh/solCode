import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Your profile", robots: { index: false } };

async function save(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("profiles").update({
    display_name: String(formData.get("display_name") ?? "").slice(0, 80),
    bio: String(formData.get("bio") ?? "").slice(0, 500),
  }).eq("id", user.id);
  revalidatePath("/profile");
}
async function signOut() {
  "use server";
  await (await createClient()).auth.signOut();
  redirect("/");
}

export default async function Profile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: p } = await supabase.from("profiles").select("display_name,bio").eq("id", user.id).single();
  return (
    <main className="mx-auto max-w-xl px-[5vw] py-16">
      <h1 className="text-3xl font-extrabold tracking-tight">Your profile</h1>
      <p className="mt-1 text-mut">{user.email}</p>
      <form action={save} className="mt-8 grid gap-4">
        <label className="grid gap-1 text-sm font-semibold">Display name
          <input className="field font-normal" name="display_name" defaultValue={p?.display_name ?? ""} maxLength={80} />
        </label>
        <label className="grid gap-1 text-sm font-semibold">Bio
          <textarea className="field font-normal" name="bio" defaultValue={p?.bio ?? ""} maxLength={500} rows={4} />
        </label>
        <button className="btn btn-p justify-self-start">Save changes</button>
      </form>
      <form action={signOut} className="mt-8"><button className="text-sm text-mut underline">Log out</button></form>
    </main>
  );
}
