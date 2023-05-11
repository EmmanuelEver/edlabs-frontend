import { ITeacherSection } from "@/types/types"
import { useRouter } from "next/router"
import TeacherSectionView from "./TeacherSectionView"

const sections: ITeacherSection[] = [
  {
      internal_id: "1ksal12-12312-1231",
      sectionName: "INTRODUCTION TO C",
      sectionCode: "ITC1",
      sectionInstructor: "",
      totalActivities: 3,
      totalStudents: 50,
      studentsInfo: [
        {
          avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
          username: "Emman"
        },
        {
          avatar: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
          username: "John"
        }
      ],
      isActive: true
  },
  {
      internal_id: "1af2al12-19213-1231",
      sectionName: "ADVANCED TO C",
      sectionInstructor: "",
      sectionCode: "ITC2",
      totalActivities: 5,
      totalStudents: 50,
      studentsInfo: [
        {
          avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
          username: "Emman"
        },
        {
          avatar: "",
          username: "John"
        },{
          avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
          username: "Emman"
        },
        {
          avatar: "",
          username: "John"
        }
        ,{
          avatar:"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
          username: "Emman"
        },
        {
          avatar: "https://e7.pngegg.com/pngimages/340/946/png-clipart-avatar-user-computer-icons-software-developer-avatar-child-face-thumbnail.png",
          username: "John"
        }
      ],
      isActive: true
  }
]
const TeacherSectionContainer = () => {

  const router = useRouter()

  function handleSelectSection(id: string) {
    router.push({
      pathname: "/sections",
      query: {
        selected: id
      },
    }, undefined, {shallow: true})
  }
  
console.log(router.query)
  return (
    <TeacherSectionView 
      sections={sections}
      selectedSection={router?.isReady ? router?.query?.selected : ""}
      activeSections={sections ? sections?.filter(item => item.isActive).length : 0}
      handleSelectSection={handleSelectSection}
    />
  )
}

export default TeacherSectionContainer