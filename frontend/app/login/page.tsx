export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-gray-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 bg-gray-950">
        <div className="flex flex-col bg-gray-800 p-8 rounded-lg items-center border border-gray-700">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Login Page
          </h1>
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-700 text-gray-300 placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </main>
    </div>
  );
}
