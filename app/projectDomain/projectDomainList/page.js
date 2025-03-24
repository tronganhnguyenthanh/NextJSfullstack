"use client"
import Link from "next/link"
import {useEffect, useState} from "react"
import {toast, ToastContainer} from "react-toastify"
export default function ProjectDomainList() {
  const [projectDomainList, setProjectDomainList] = useState([])
  const [isAscending, setIsAscending] = useState(1)
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
    if (isConfirm) {
      let res = await fetch(`/api/projects/${id}`, {
        method:"DELETE",
        headers:{
         "Content-Type":"application/json"
        }
      })
      let data = await res.json()
      toast.success(data.message, { position: "top-center" })
      getProjectDomains()
    }
  }
  const sortProjectInAscending = async () => {
    if(isAscending === 1){
      setIsAscending(0)
      let res = await fetch("/api/projects/order/ascending?sort=asc")
      let getSortInAsc = await res.json()
      let sortInAsc = await getSortInAsc[0]
      setProjectDomainList(sortInAsc)
    }else{
      setIsAscending(1)
      let res = await fetch("/api/projects/order/descending?sort=desc")
      let getSortInDesc = await res.json()
      let sortInDesc = await getSortInDesc[0]
      setProjectDomainList(sortInDesc)
    }
  }
  const handleOnSearch = async (e) => {
    if(e.target.value === "all"){
     getProjectDomains()
    }else{
      let res = await fetch(`/api/projects/filter?id=${e.target.value}`)
      let filterId = await res.json()
      let searchProjectDomainById = await filterId[0]
      setProjectDomainList(searchProjectDomainById)
    }
  }
  return (
    <>
      <ToastContainer />
      {
        isAscending === 0
          ?
          <button
            type="button"
            onClick={sortProjectInAscending}
            className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
            </svg>
          </button>
          :
          <button
            type="button"
            onClick={sortProjectInAscending}
            className="bg-pink-700 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded m-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
            </svg>
          </button>
      }
      <div className="inline-block relative w-64">
        <select 
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight m-2 cursor-pointer"
          onChange={handleOnSearch}
         >
          <option value="all">All</option>
          {projectDomainList.length > 0 && projectDomainList.map((i) => {
            return(
             <option key={i.id} value={i.id}>{i.projectName}</option>
            )
          })
          }
        </select>
      </div>
      <div className="grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1">
        {projectDomainList.length > 0 && projectDomainList.map((i, index) => {
        return (
          <details key={index} className="text-orange-500 m-2 cursor-pointer text-center">
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
      </div>
      <Link href="/projectDomain/formProjectDomain" className="text-xl text-gray-500 m-2 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
        </svg>
      </Link>
    </>
  )
} 