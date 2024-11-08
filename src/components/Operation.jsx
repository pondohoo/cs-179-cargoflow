"use client"

import { useEffect, useState } from "react"
import Grid from "./Grid"
import UploadManifest from "./UploadManifest"

const Operation = () => {
    const [manifest, setManifest] = useState([]);
        useEffect(() => {
					console.log(manifest);
				}, [manifest]);

  return (
    <>
    <Grid manifest={manifest} />
    <UploadManifest setManifest={setManifest}/>
    </>
  )
}

export default Operation