"use client"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {toast, ToastContainer} from "react-toastify"
export default function AddNewProjectDomain(){
    const [projectName, setProjectName] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const router = useRouter()
    const addNewProjectDomain = async () => {
     if(projectName === ""){
      toast.error("Please enter your project's name", {position:"top-center"})
      return
     }
     if(projectLink === ""){
      toast.error("Please enter your project's link", {position:"top-center"})
      return
     }else{
       let res = await fetch("/api/projects", {
         method:"POST",
         headers:{
          "Content-Type":"application/json"
         },
         body:JSON.stringify({
          projectName:projectName,
          projectLink:projectLink
         }) 
       })
       let status = await res.json()
       toast.success(status.message, {position:"top-center"})
       setTimeout(() => {
        router.push("/projectDomain/projectDomainList")
       },2000)
     }
    }
    return (
        <div className="w-full max-w-xs">
            <ToastContainer/>
             <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                   <label className="block text-gray-700 text-sm font-bold mb-2">Project's name</label>
                   <input 
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" 
                     type="text"
                     onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                   <label className="block text-gray-700 text-sm font-bold mb-2">Project's link</label>
                   <input 
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight" 
                     type="text"
                     onChange={(e) => setProjectLink(e.target.value)}
                   />
                </div>
                <div className="flex items-center justify-between">
                   <button 
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                     type="button"
                     onClick={addNewProjectDomain}
                    >
                      Add new
                    </button>
                </div>
             </form>
        </div>
    )
}