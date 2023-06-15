import { useConfirmAlert } from "@/context/providers/AlertProvider"
import useFetch from "@/hooks/useFetch"
import useToast from "@/hooks/useToast"
import { apiPrivate } from "@/services/axios"
import { ITeacherSection } from "@/types/types"
import { useRouter } from "next/router"
import { useState } from "react"
import TeacherSectionView from "./TeacherSectionView"

// const sections: ITeacherSection[] = [
//   {
//       internal_id: "1ksal12-12312-1231",
//       sectionName: "INTRODUCTION TO C",
//       sectionCode: "ITC1",
//       sectionInstructor: "",
//       totalActivities: 3,
//       totalStudents: 50,
//       studentsInfo: [
//         {
//           avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
//           username: "Emman"
//         },
//         {
//           avatar: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
//           username: "John"
//         }
//       ],
//       isActive: true
//   },
//   {
//       internal_id: "1af2al12-19213-1231",
//       sectionName: "ADVANCED TO C",
//       sectionInstructor: "",
//       sectionCode: "ITC2",
//       totalActivities: 5,
//       totalStudents: 50,
//       studentsInfo: [
//         {
//           avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
//           username: "Emman"
//         },
//         {
//           avatar: "",
//           username: "John"
//         },{
//           avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
//           username: "Emman"
//         },
//         {
//           avatar: "",
//           username: "John"
//         }
//         ,{
//           avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
//           username: "Emman"
//         },
//         {
//           avatar: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
//           username: "John"
//         }
//       ],
//       isActive: true
//   }
// ]
const TeacherSectionContainer = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const {data, isLoading, revalidate} = useFetch("/sections");
  const {toast} = useToast()
  const {showAlert} = useConfirmAlert()

  function handleSelectSection(id: string) {
    router.push({
      pathname: "/sections",
      query: {
        selected: id
      },
    }, undefined, {shallow: true})
  }

  async function deleteSection(id: string) {
    try {
      const resp = await apiPrivate.delete(`/sections/${id}`)
      await revalidate()
      toast("SUCCESS", resp?.data?.message || "Section deleted!")
    } catch (error: any) {
      console.error(error)
      toast("DANGER", error?.response?.data?.message || "Error deleting the section")
    }
  }

  async function handleDeleteSection(id: string, name: string) {
    showAlert({
      title: "Delete Section",
      confirmMessage: `Are you sure to delete section ${name}?`,
      onConfirm: () => deleteSection(id)
    })

  }
  return (
    <TeacherSectionView 
      sections={data}
      selectedSection={router?.isReady ? router?.query?.selected : ""}
      activeSections={data ? data?.filter((item:ITeacherSection) => item.isOnline).length : 0}
      handleSelectSection={handleSelectSection}
      isLoading={isLoading}
      deleteSection={handleDeleteSection}
      isDeleting={isDeleting}
    />
  )
}

export default TeacherSectionContainer