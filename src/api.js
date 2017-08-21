// Fake database
import introducers from './data/introducers.js';
import articles from './data/articles.js';

// Warning: in a real production app you would probably want something more
// advanced like `koa-router` to handle routing, `mongoose` for the models
// (if your database is MongoDB) and controllers/actions for each resource.
export default (ctx, next) => {
  const [prefix, resource, slug] = ctx.path.substring(1).split('/')

  if (prefix !== 'api') {
    return next()
  }

  switch (resource) {
  case 'articles':
    if (slug) {
      const article = articles.find(a => a.slug === slug)
      ctx.assert(article, 404, 'Article not found')

      ctx.body = article
    } else {
      ctx.body = articles.map(({ body, ...rest }) => rest) // eslint-disable-line no-unused-vars
    }
    break
  case 'introducers':
    if (slug) {
      const introducer = introducers.find(i => i.alias === slug)
      ctx.assert(introducer, 404, 'Introducer not found')

      ctx.body = introducer
    } else {
      ctx.body = introducers.map(({ body, ...rest }) => rest);
    }
    break;
  default:
    ctx.throw(404)
    break
  }
}
