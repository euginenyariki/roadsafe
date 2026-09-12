import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Car trouble? Get help now.</h1>
        <p className="text-xl text-gray-600 mb-8">Get verified help near you, see the price, track the provider and pay securely.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              Get Help Now
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
