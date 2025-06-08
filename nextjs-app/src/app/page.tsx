import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Roll the Time</h1>
      <p className="text-base text-gray-700 mb-8 text-center max-w-xs">
        This app helps you make decisions by spinning a roulette wheel with your
        custom list of options. Add your choices and let chance decide!
      </p>
      <Link
        href="/edit-list"
        className="w-full max-w-xs p-4 bg-blue-600 text-white text-center rounded shadow text-lg font-semibold hover:bg-blue-700 transition"
      >
        &apos;Let&apos;s go&apos;
      </Link>
    </main>
  );
}
