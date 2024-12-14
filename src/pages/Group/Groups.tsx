import { Outlet } from "react-router-dom"
import GroupList from "../../components/Group/GroupList"

const Groups = () => {
  return (
    <div>
      <GroupList />
      <Outlet/>
    </div>
  )
}

export default Groups