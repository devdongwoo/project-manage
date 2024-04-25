export default function Button({
  children,
  tailcss,
  handleStateChange,
  deriveProjects
}) {
  return (
    <button
      className={`w-auto h-10 rounded-lg hover:text-stone-100 h-text-lg bg-stone-900 text-stone-400 hover:bg-stone-800 ${tailcss}`}
      onClick={children === "Save" ? deriveProjects : handleStateChange}
    >
      {children}
    </button>
  )
}
