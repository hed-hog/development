import { RoleRouteType } from './role-route'
import { RouteScreenType } from './route-screen'

export type RouteType = {
  id: number
  url: string
  method: string
  role_routes: RoleRouteType[]
  route_screens: RouteScreenType[]
}
