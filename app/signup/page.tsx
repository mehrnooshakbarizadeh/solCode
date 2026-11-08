import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Create your profile", robots: { index: false } };
export default function Page() { return <AuthForm mode="signup" />; }
