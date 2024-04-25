import { useEffect } from "react"
import Input from "./Input"

export default function Project({
  item,
  refText,
  setProjects,
  setState,
  projects
}) {
  const { title, description, date, key } = item

  const deriveAdd = () => {
    setProjects((prev) => {
      const cur = [...prev]

      const curProject = { ...cur[key] }

      curProject.tasks?.push({
        text: refText.current.tasks.value
      })
      refText.current.tasks.value = ""

      cur.splice(key, 1, curProject)

      return cur
    })
  }

  const deriveDelete = () => {
    setProjects((prev) => {
      const cur = [...prev]

      cur.splice(key, 1)

      return cur
    })
    setState(() => {
      return { create: false, item: {} }
    })
  }

  const deriveClear = (idx) => {
    setProjects((prev) => {
      const cur = [...prev]

      const curProject = { ...cur[key] }

      curProject.tasks?.splice(idx, 1)

      cur.splice(key, 1, curProject)

      return cur
    })
  }
  useEffect(() => {
    refText.current.tasks.value = ""
    setProjects((prev) => {
      const cur = [...prev]

      let curProject = { ...cur[key], key }
      if (!Object.prototype.hasOwnProperty.call(curProject, "tasks"))
        curProject = { ...cur[key], tasks: [], key }

      cur.splice(key, 1, curProject)

      return cur
    })
  }, [item])

  return (
    <>
      <div className="flex flex-row justify-between w-full mb-3">
        <span className="text-3xl font-extrabold text-stone-950">{title}</span>
        <span
          className="font-semibold cursor-pointer text-stone-700 hover:text-rose-600"
          onClick={deriveDelete}
        >
          Delete
        </span>
      </div>
      <div className="flex flex-row justify-between w-full mb-5">
        <span className="text-lg font-extrabold text-slate-400">{date}</span>
      </div>
      <div className="flex flex-row justify-between w-full pb-4 border-b-2 border-b-stone-400">
        <pre className="text-base font-normal break-words text-stone-950 text-ellipsis">
          {description}
        </pre>
      </div>
      <div className="flex flex-col w-full mt-7">
        <span className="mb-5 text-3xl font-extrabold text-stone-950">
          Tasks
        </span>
        <div>
          <Input
            name={"tasks"}
            type={"text"}
            ref={refText}
            tailcss={"w-80 h-9"}
          />
          <span
            className="ml-4 font-semibold cursor-pointer text-stone-700"
            onClick={deriveAdd}
          >
            Add Task
          </span>
        </div>
        <div>
          {projects[key]?.tasks?.length === 0 && (
            <p className="mt-6 mb-6 font-bold">
              ※ This project does not have any tasks yet.
            </p>
          )}
          <ol className="max-w-lg mt-6 mb-6 bg-gray-300 max-h-52">
            {projects[key]?.tasks?.map((it, idx) => {
              return (
                <li
                  key={idx}
                  className="flex flex-row justify-between pt-1 pb-1 
                    border-b-[1px]
                    last:border-b-[0px]
                   border-zinc-400"
                >
                  {it.text}
                  <span
                    className="pr-3 cursor-pointer "
                    onClick={() => {
                      deriveClear(idx)
                    }}
                  >
                    Clear
                  </span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </>
  )
}
