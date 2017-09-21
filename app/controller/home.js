
/**
 * Controller
 */
class HomeController {
  constructor() {}

  // index
  async index(ctx) {
    await ctx.render( 'home/index', {title: 'binlerdev', content: 'Hello world'} );
  }

}

module.exports = HomeController
