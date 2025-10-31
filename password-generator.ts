import {expect, type Locator, type Page} from '@playwright/test'

export class LastPassPasswordGenerator {
  constructor(private readonly page: Page) {}

  async setPasswordLength(length: number) {
    const gen = this.page.frameLocator('iframe:not([src*="trustarc"])');
    const slider = gen.locator('.lp-custom-range__slider');
    const sliderBar = gen.locator('.lp-custom-range__bar');
  
    // Get the bounding box of the slider bar
    const sliderBarBox = await sliderBar.boundingBox();
    if (!sliderBarBox) {
      throw new Error('Slider bar not found');
    }
  
    // Calculate the target position based on the desired length
    const min = 0; // Assuming the minimum length is 0
    const max = 50; // Assuming the maximum length is 100
    const targetX = sliderBarBox.x + ((length - min) / (max - min)) * sliderBarBox.width;
  
    // Drag the slider to the target position
    await slider.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, sliderBarBox.y + sliderBarBox.height / 20);
    await this.page.mouse.up();
  }
}