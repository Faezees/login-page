import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/hooks";
import { login } from "../src/store/slices/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.user) router.push("/dashboard");
  }, [auth.user]);

  const submit = (e: any) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        background: `linear-gradient(to right, white 50%, rgba(255,255,255,0) 50%), url('/assets/bluebg.png') right center `,
      }}
    >
      <div className=" backdrop-blur-md relative z-10 pt-14 pb-14 max-w-6xl w-full rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden border border-white/30">
        {/* Left side - form */}
        <div className="p-10 md:p-14 ">
          <div className="text-sm text-gray-500 mb-6">
            Do you have an account already?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Log in
            </a>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-gray-500 text-sm md:text-base">
            Join thousands of businesses transforming with AI-powered solutions
            and expert consulting.
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80"
            />

            <div className="flex items-center text-sm text-gray-600">
              <input
                id="terms"
                type="checkbox"
                className="mr-2 w-4 h-4 border-gray-300 rounded focus:ring-blue-400"
              />
              <label htmlFor="terms">I accept the Terms and Conditions</label>
            </div>

            {auth.error && (
              <div className="text-red-500 text-sm">{auth.error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-black md:text-white py-3 rounded-lg font-semibold transition-colors shadow-sm"
            >
              {auth.loading ? "Loading..." : "SIGN UP WITH EMAIL"}
            </button>

            <div className="text-center text-gray-400 text-sm mt-4">
              Or sign up with
            </div>

            <div className="flex gap-4 mt-3">
              <button
                type="button"
                className="flex-1 border border-gray-200 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="w-5 h-5"
                  alt="Google"
                />
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-200 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/452210/apple-black.svg"
                  className="w-5 h-5"
                  alt="Apple"
                />
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-200 rounded-lg py-2 flex items-center justify-center hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/448224/facebook.svg"
                  className="w-5 h-5"
                  alt="Facebook"
                />
              </button>
            </div>
          </form>
        </div>

        {/* Right side - info */}
        <div className="relative  p-12 flex flex-col justify-center text-black md:text-white overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-400 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow">
                AI
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black md:text-white">
                  AI Insights
                </h3>
              </div>
            </div>

            <p className="text-sm md:text-white/90 mt-2 leading-relaxed text-black">
              Transform your business with cutting-edge AI solutions and expert
              consulting tailored to your industry needs.
            </p>

            <div className="mt-10 space-y-8 md:text-white/90 text-black">
              <div>
                <h4 className="font-semibold md:text-white text-black">
                  AI Strategy Consulting
                </h4>
                <p className="text-sm mt-2 leading-relaxed">
                  Expert guidance to develop and implement AI strategies that
                  drive growth and innovation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold md:text-white text-black">
                  Machine Learning Solutions
                </h4>
                <p className="text-sm mt-2 leading-relaxed">
                  Custom ML models and automation solutions to optimize your
                  business processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
