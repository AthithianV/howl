import { Outlet, useLocation } from "react-router-dom"
import GroupList from "../../components/Group/GroupList"

const Groups = () => {

  const location = useLocation();

  return (
    <div>
      {
        location.pathname==="/group"
        ?<GroupList />
        :<Outlet/>
      }

    </div>
  )
}

export default Groups