"use client"
import Link from "next/link"
import {useEffect, useState} from "react"
import {toast, ToastContainer} from "react-toastify"
export default function ProjectDomainList() {
  const [projectDomainList, setProjectDomainList] = useState([])
  useEffect(() => {
   getProjectDomains()
  },[])
  const getProjectDomains = async () => {
   let res = await fetch("/api/projects")
   let domainList = await res.json()
   setProjectDomainList(domainList[0])
  }
  const deleteProjectDomainById = async (id) => {
   let isConfirm = window.confirm("Are you sure to delete this ?")
   if(isConfirm){
    let res = await fetch(`/api/projects/${id}`, {
     method:"DELETE",
     headers:{
      "Content-Type":"application/json"
     }
    })
    let data = await res.json()
    toast.success(data.message, {position:"top-center"})
    getProjectDomains()
   }
  }
  return (
    <>
      <ToastContainer/>
      <Link href="/" className="text-xl text-gray-500 m-2 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </Link>
      {
        projectDomainList.length === 0 
        ? 
        <h2 className="text-2xl text-red-500 text-center">No data available</h2>
        :
        <h2 className="text-right text-xl text-purple-500 p-2">
          Show {projectDomainList.length} results
        </h2>
        }
      {projectDomainList.length > 0 && projectDomainList.map((i, index) => {
        return (
          <details key={index} className="text-orange-500 m-2">
            <summary>{i.projectName}</summary>
            <Link href={`${i.projectLink}`} className="ml-6 text-blue-700">{i.projectLink}</Link>
            <button 
              type="button" 
              className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded m-2"
              onClick={() => deleteProjectDomainById(i.id)}
             >
               Delete
            </button>
            <hr/>
          </details>
        )
      })
      }
    </>
  )
} 