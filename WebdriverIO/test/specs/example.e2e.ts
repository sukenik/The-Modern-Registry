import MainPage from '../pageobjects/main.page';
import ModalPage from '../pageobjects/modal.page';

describe('My Modern Registry application', () => {
    it('should create a mission', async () => {
        await MainPage.open()
        await MainPage.maximizeWindow()
        const missionName = 'WDIO we\'re here.'
        const missionStatus = 'Active'

        // await MainPage.clickOnCreateMissionBtn()
        // await ModalPage.createMission(missionName, missionStatus)
        await expect(
            (await browser.react$(
                'MissionRow', 
                { props: { mission: { description: missionName } } })
            )
            .$('.name')
        ).toHaveText(missionName)
        // await expect((await MainPage.missionRow).$('#mission-status')).toHaveText(missionStatus)

        // const response = MainPage.validateMissionOnDb(missionName).then(data => console.log(data))
        
        const optionButtons = await (await browser.react$('MissionRow', { props: { mission: { description: missionName } } })).react$$('OptionButton')
        await optionButtons[1]
        await browser.pause(5000)
    })
})