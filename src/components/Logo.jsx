function Logo() {
  return (
    <div className="logo">
      <svg
        className="logo-icon"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MessMate logo"
      >
        {/* Fork */}
        <path
          d="M18 15 V42
             C18 48 21 52 25 52
             C29 52 32 48 32 42
             V15"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M22 15 V30 M27 15 V30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M25 52 V82"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Plate */}
        <circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />

        <circle
          cx="50"
          cy="50"
          r="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />

        {/* Spoon */}
        <ellipse
          cx="76"
          cy="25"
          rx="8"
          ry="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        />

        <path
          d="M76 36 V82"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      <span className="logo-text">
        MessMate
      </span>
    </div>
  )
}

export default Logo