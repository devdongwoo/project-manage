import { useRef, useState } from "react"

import Image from "../assets/no-projects.png"

import Menubar from "./MenuBar"
import Button from "./Button"
import Input from "./Input"
import Project from "./Project"

const deriveCreateProject = (obj = {}) => {
  let createProject = { ...obj }
  return createProject
}

export default function Content() {
  const [state, setState] = useState({ create: false, item: {} })
  const [projects, setProjects] = useState([])

  const refText = useRef({})

  const handleChange = () => {
    setState(() => {
      return { create: true, item: {} }
    })
  }

  const handleCancel = () => {
    setState(() => {
      return { create: false, item: {} }
    })
  }

  const deriveProjects = () => {
    for (const prop in refText.current) {
      if (prop !== "tasks") {
        refText.current[prop].className = refText.current[
          prop
        ].className.replace(" border-b-rose-700", " focus:border-neutral-500")

        if (!refText.current[prop].value) {
          refText.current[prop].className = refText.current[
            prop
          ].className.replace(" focus:border-neutral-500", " border-b-rose-700")
          return
        }
      }
    }
    const project = deriveCreateProject({
      date: refText.current.date.value,
      title: refText.current.title.value,
      description: refText.current.description.value
    })

    setProjects((prev) => {
      return [...prev, project]
    })

    setState((prev) => {
      return { ...prev, create: false }
    })
  }

  return (
    <main className="flex flex-row justify-stretch">
      <Menubar
        handleStateChange={handleChange}
        projects={projects}
        setState={setState}
        state={state}
      />
      <div
        className={`flex flex-col flex-wrap items-center justify-center flex-auto w-4/5 h-screen ${
          Object.keys(state.item).length === 0
            ? "xl:pr-96 xl:pl-96"
            : "xl:pr-36 xl:pl-36"
        }`}
      >
        {!state.create && Object.keys(state.item).length === 0 && (
          <>
            <img src={Image} className="max-w-16" />
            <p className="my-5 text-2xl font-bold text-stone-600">
              No Project Selected
            </p>
            <p className="mb-10 text-lg text-stone-400">
              Select a project or get started with a new one
            </p>
            <Button handleStateChange={handleChange} tailcss={"py-0.5 px-2.5"}>
              Create new project
            </Button>
          </>
        )}
        {state.create && Object.keys(state.item).length === 0 && (
          <>
            <div className="flex items-center justify-end w-full">
              <span
                className="mr-6 font-semibold cursor-pointer h-text-lg hover:text-rose-700"
                onClick={handleCancel}
              >
                Cancel
              </span>
              <Button tailcss={"py-1.5  px-8"} deriveProjects={deriveProjects}>
                Save
              </Button>
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <h3 className="font-bold text-zinc-400">TITLE</h3>
              <Input
                type={"text"}
                name={"title"}
                ref={refText}
                tailcss={"border-b-4 w-full"}
              />
            </div>
            <div className="flex flex-col items-start w-full mb-4">
              <h3 className="font-bold text-zinc-400">DESCRIPTION</h3>
              <textarea
                name="description"
                className="w-full h-24 border-b-4 outline-none resize-none bg-zinc-200 focus:border-neutral-500 border-neutral-300"
                ref={(cur) =>
                  refText.current && (refText.current["description"] = cur)
                }
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <h3 className="font-bold text-zinc-400">DUE DATE</h3>
              <Input
                type={"date"}
                name={"date"}
                ref={refText}
                tailcss={"border-b-4 w-full"}
              />
            </div>
          </>
        )}
        {Object.keys(state.item).length !== 0 && (
          <Project
            item={state.item}
            refText={refText}
            setProjects={setProjects}
            setState={setState}
            projects={projects}
          />
        )}
      </div>
    </main>
  )
}
