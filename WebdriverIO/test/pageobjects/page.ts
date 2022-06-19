/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    public open() {
        return browser.url('http://localhost:3000')
    }

    public maximizeWindow() {
        return browser.maximizeWindow()
    }
}
