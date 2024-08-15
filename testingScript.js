// JavaScript source code
const {By, Builder, Browser, until} = require('selenium-webdriver');

async function testingScript() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        //await driver.get('http://localhost:2345/register.html');
        for (var i = 0; i < 10; i++) {
            await driver.get('http://localhost:2345/register.html');
            await driver.findElement(By.id('username')).sendKeys('test' + i);
            await driver.findElement(By.id('email')).sendKeys('test' + i + '@gmail.com');
            await driver.findElement(By.id('phone')).sendKeys('123456789' + i);
            let error = await driver.findElement(By.id('usernameError'));
            let error1 = error;
            try {
                await driver.findElement(By.name('submit')).click();
                let value = await error1.getText();
                console.log('testtest');
                console.log(value);
                console.log('end');
                if (value != '') {
                    break;
                }
            } catch (StaleElementReferenceException) {
                error1 = error;
            }
        }
        await driver.wait(until.titleIs('Registration Successful'), 5000);
    } finally {
        await driver.quit();
    }
}

testingScript();