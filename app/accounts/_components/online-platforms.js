export default function OnlinePlatforms() {
  return (
    <>
      <div className="flex flex-col gap-3 mb-6">
        {/* Google Button */}
        <button className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100 cursor-pointer">
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.4-1.4-34.1-4.1-50.3H272v95h146.9c-6.3 33.5-25.3 61.9-53.9 81v67h86.8c50.8-46.8 81.7-115.8 81.7-192.7z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c72.6 0 133.6-24.1 178.2-65.2l-86.8-67c-24.1 16.2-55 25.6-91.4 25.6-70.4 0-130.1-47.6-151.4-111.4h-89v69.9c44.6 88 137 148.1 240.4 148.1z"
            />
            <path
              fill="#fbbc04"
              d="M120.6 326.3c-10.5-31.5-10.5-65.3 0-96.8v-69.9h-89c-39.4 76.9-39.4 168.7 0 245.6l89-69.9z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c39.5-.6 77.4 14 106.3 40.9l79.5-79.5C421 24.5 347.8-4.8 272 0 168.6 0 76.2 60.1 31.6 148.1l89 69.9c21.3-63.8 81-111.4 151.4-111.4z"
            />
          </svg>
          <span>Signup with Google</span>
        </button>

        {/* GitHub Button */}
        <button className="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-100 cursor-pointer">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.76.4-1.26.72-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.18-3.11-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.13 11.13 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.73.81 1.18 1.85 1.18 3.11 0 4.44-2.7 5.42-5.27 5.7.41.36.77 1.09.77 2.19 0 1.58-.01 2.86-.01 3.25 0 .31.21.68.8.56C20.71 21.4 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
          </svg>
          <span>Signup with GitHub</span>
        </button>
      </div>
    </>
  );
}
