
function Login() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#E5E5E5] mb-6 text-center">Log In</h2>
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]" />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]" />
            <button
              type="submit"
              className="w-full bg-[#2ACFCF] text-[#111111] px-4 py-2 rounded hover:bg-[#26BABA] transition-colors duration-300 cursor-pointer">
              Log In
            </button>
          </form>
          <p className="text-center mt-4 text-[#A1A1A1]">Don't have an account? <a href="/signup" className="text-[#2ACFCF] hover:underline">Sign up</a></p>
        </div>
      </div>
    </>
  )
}

export default Login