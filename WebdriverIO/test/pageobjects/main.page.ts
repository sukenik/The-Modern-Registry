import Page from './page';

class MainPage extends Page {
    public get createMissionBtn() {
        return browser.react$('CreateMissionButton')
    }

    public get missionRow() {
        return browser.react$('MissionRow')
    }

    public async clickOnCreateMissionBtn() {
        await this.createMissionBtn.click()
    }

    public async validateMissionOnDb(missionName: string) {
        const endpoint = 'http://localhost:4000/graphql'
        const getMissionByNameQuery = `
            query GetMissionByName($description: String!) {
                getMissionByName(description: $description) {
                    description
                }
            }
        `
        const variables = {
            missionName
        }
        const body = JSON.stringify({ query: getMissionByNameQuery, variables })

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body
        })
        .then(response => {
            if (response.status >= 400) {
                throw new Error(`Error fetching data. status: ${response.status}`)
            } else {
                return response.json()
            }
        })

        return response
    }
}

export default new MainPage()