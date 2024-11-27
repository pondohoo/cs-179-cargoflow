"use client"

import { useState } from "react"
import UnloadLoadPrompt from "./UnloadLoadPrompt"

const UnloadLoad = () => {
    const [containersToLoad, setContainersToLoad] = useState()
    const [containersToUnload, setContainersToUnload] = useState()
  return (
    <div><UnloadLoadPrompt setContainersToLoad={setContainersToLoad} setContainersToUnload={setContainersToUnload}/></div>
  )
}

export default UnloadLoad