import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import FeedIcon from '@mui/icons-material/Feed';
import DashboardIcon from '@mui/icons-material/Dashboard'; 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/home"
    },
    {
        id: 1,
        icon: <LocationOnIcon/>,
        text: "Location",
        link: "location"
    },
    {
        id: 2,
        icon: <SchoolIcon/>,
        text: "Schools",
        link: "schools"
    },
    {
        id: 3,
        icon: <FeedIcon/>,
        text: "Feed",
        link: "feed"
    },
    {
        id: 4,
        icon: <DashboardIcon/>,
        text: "Dashboard",
        link: "profile"
    }
]