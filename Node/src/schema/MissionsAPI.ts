import { Mission } from "../../../Entities/Mission";
import { RESTDataSource } from 'apollo-datasource-rest'

export class MissionsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.DOTNET_URL || 'https://localhost:5000/api/Mission';
  }

  async getMissionByName(description: string) {
    return this.get(`/${encodeURIComponent(description)}`)
  }

  async getAllMissions() {
    return this.get('')
  }
  
  async createMission(mission: Mission) {
    return this.post('', mission)
  }
  
  async updateMission(mission: Mission) {
    return this.put(`/${encodeURIComponent(mission.id)}`, mission)
  }
  
  async deleteMission(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`)
  }
  
  async deleteMissionChildren(childrenIds: Array<string>) {
    return this.patch('', childrenIds)
  }
  
  async passMissionParent(id: string, parentId: string | null) {
    return this.patch(`/${encodeURIComponent(id)}`, { parentId })
  }
}