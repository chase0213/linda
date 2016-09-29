import { LindaPage } from './app.po';

describe('linda App', function() {
  let page: LindaPage;

  beforeEach(() => {
    page = new LindaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
