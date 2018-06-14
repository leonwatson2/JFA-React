import Home from './components/home/Home'
import Gallery from './components/gallery/Gallery'
import { Events } from './components/events/Events'
import SignInContainer from './components/signin/SignInContainer'
import OfficerDashboard from './components/dashboards/OfficerDashboard'
import UpdateOfficers from './components/dashboards/OfficerDashboard/UpdateOfficers';

export const routeConfig = [
  {
    path:'/',
    component:Home,
    title:"Home"
  },
  {
    path:'/gallery/',
    optionalParams:[':id?'],
    component:Gallery,
    title:"Gallery",
    
  },
  {
    path:'/signin/',
    component:SignInContainer,
    title:"Sign In",
    admin: false
  },
  {
    path:'/events/',
    component:Events,
    title:"Events"
  },
  {
    path:'/dashboard/',
    component:OfficerDashboard,
    title:"Dashboard",
    admin:true
  },
  {
    path:'/update/officers',
    component:UpdateOfficers,
    show: false
  },
  {
    path:'/update/officers/photos',
    component:UpdateOfficers,
    show: false
  }
]

export default routeConfig