import Button from "./Button"

export default function Menubar({
  handleStateChange,
  projects,
  setState,
  state
}) {
  const { item } = state
  const handleClick = (idx) => {
    setState((prev) => {
      return { ...prev, item: { ...projects[idx], key: idx } }
    })
  }

  return (
    <div className="w-1/5 px-8 pt-16 mt-20 bg-black rounded-tr-2xl">
      <h2 className="text-2xl font-bold text-slate-50">YOUR PROJECTS</h2>
      <Button
        handleStateChange={handleStateChange}
        tailcss={"my-14 py-0.5 px-2.5"}
      >
        + Add Project
      </Button>
      <ol>
        {projects.map((it, idx) => {
          return (
            <li
              key={idx}
              className={`text-xl mb-7 text-slate-400 hover:bg-stone-800 hover:text-white py-1.5 px-2.5 hover:rounded-sm cursor-pointer ${
                item.key === idx && "bg-stone-800 text-white"
              }`}
              onClick={() => {
                handleClick(idx)
              }}
            >
              {it.title}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
