import { forwardRef } from "react"

const Input = forwardRef(function Input({ type, tailcss = "", name }, ref) {
  return (
    <>
      <input
        name={name}
        type={type}
        className={` bg-zinc-200 border-neutral-300  outline-none focus:border-neutral-500 ${tailcss}`}
        ref={(cur) => ref.current && (ref.current[name] = cur)}
      />
    </>
  )
})

export default Input
