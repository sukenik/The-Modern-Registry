import { ChainablePromiseElement } from 'webdriverio';

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
}

export default new MainPage()