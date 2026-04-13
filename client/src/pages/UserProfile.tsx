import { useAuth } from "../context/AuthProvider";

function UserProfile() {
  const auth = useAuth();

  const user = auth.user;

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0f0f0f] p-4">
        <div className="rounded-lg bg-[#161616] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.5)] text-center w-full max-w-md border border-[#2A2A2A]">
          <h1 className="text-2xl font-semibold text-[#E5E5E5]">
            No user profile available
          </h1>
          <p className="mt-2 text-[#A1A1AA]">
            Please log in to see your profile details.
          </p>
        </div>
      </main>
    );
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=4f46e5&color=fff&size=128`;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-[#E5E5E5]">User Profile</h1>
        <p className="text-[#A1A1AA]">
          Review your account information and settings.
        </p>
      </header>

      <section className="rounded-2xl bg-[#151515] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-[#2A2A2A]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
          <img
            src={avatarUrl}
            alt="Profile"
            className="h-28 w-28 rounded-full border-4 border-[#2ACFCF] object-cover"
          />

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-[#E5E5E5]">
              {user.username}
            </h2>
            <p className="text-sm font-medium text-[#2ACFCF]">{user.email}</p>
            <p className="mt-2 text-sm text-[#A1A1AA]">
              Location:{" "}
              <span className="text-[#E5E5E5]">San Francisco, CA</span>
            </p>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              Joined on: <span className="text-[#E5E5E5]">March 19, 2026</span>
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-[#2A2A2A] p-4 bg-[#121212]">
            <h3 className="text-sm font-semibold text-[#E5E5E5]">Bio</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              Passionate creator and explorer. Love building modern web
              applications with React and TypeScript.
            </p>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] p-4 bg-[#121212]">
            <h3 className="text-sm font-semibold text-[#E5E5E5]">Contact</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">Email: {user.email}</p>
            <p className="mt-1 text-sm text-[#A1A1AA]">
              User ID: {user.userId}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-lg bg-[#2ACFCF] px-4 py-2 text-sm font-semibold text-[#111111] hover:bg-[#26BABA]">
            Edit Profile
          </button>
          <button className="rounded-lg border border-[#2A2A2A] px-4 py-2 text-sm font-semibold text-[#E5E5E5] hover:bg-[#1A1A1A]">
            Manage Privacy
          </button>
        </div>
      </section>
    </div>
  );
}

export default UserProfile;
