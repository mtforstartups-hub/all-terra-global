import ResetPasswordForm from "@/components/ResetPasswordForm";

// Define the expected props for a Next.js Page
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  // Await the searchParams to safely extract the token
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="bg-[#1C5244] p-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Create New Password</h2>
          <p className="text-white/80 text-sm">
            Please enter your new password below.
          </p>
        </div>

        {/* Pass the token down to the client component */}
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
