import { ChainablePromiseElement } from 'webdriverio';

import Page from './page';

class ModalPage extends Page {
    public get inputName() {
        return $('[name="name"]')
    }
    public get selectStatus() {
        return $('[name="status"]')
    }
    public get saveButton() {
        return $('[type="submit"]')
    }

    public async createMission(name: string, status: string, linkToMission?) {
        await this.inputName.setValue(name)
        await this.selectStatus.selectByAttribute('value', status)
        await this.saveButton.click()
    }
}

export default new ModalPage()