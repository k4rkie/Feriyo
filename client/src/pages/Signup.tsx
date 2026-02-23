
function Signup() {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#E5E5E5] mb-6 text-center">
            Sign Up
          </h2>
          <form className="space-y-4">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]"
              />
            </div>

            <div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]"
              />
            </div>

            <div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]"
              />
            </div>

            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 rounded-md bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#2ACFCF] focus:border-[#2ACFCF]"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#2ACFCF] text-[#111111] px-4 py-2 rounded hover:bg-[#26BABA] transition-colors duration-300 cursor-pointer"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-[#A1A1A1]">
            Already have an account?{" "}
            <a href="/login" className="text-[#2ACFCF] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;

