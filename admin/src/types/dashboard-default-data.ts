export type DashboardDefaultData = {
  os: {
    name: string
    platform: string
    version: string
    architecture: string
    uptime: number
    cpu: {
      model: string
      speed: number
      physicalCores: number
      virtualCores: number
    }
    memory: {
      total: number
      free: number
    }
    disk: Array<{
      filesystem: string
      size: number
      free: number
    }>
  }
  modules: Array<{
    name: string
    version: string
    latestVersion: string
    upToDate: boolean
  }>
  users: {
    total: number
    admin: number
    active: number
    activities: Array<any>
  }
  database: {
    connections: number
    size: number
    queriesPerSecond: number
  }
}
