"""Simple HTTP server for serving static files"""

import os

from aiofile import AIOFile
from aiohttp import web

STATIC_PATH = os.path.join(os.getcwd(), 'static')


routes = web.RouteTableDef()


@routes.get('/movies')
async def handle_movies(_request):
    """Return all Movies as a single JSON array"""

    movies_paths = os.listdir(os.path.join(STATIC_PATH, 'movies'))
    movies = []

    # read data
    for movie_path in movies_paths:
        async with AIOFile(os.path.join(STATIC_PATH, 'movies', movie_path), 'r') as afp:
            content = await afp.read()
        movies.append(content)

    # concatenate strings: json objects into array
    body = f'[{",".join(movies)}]'
    return web.Response(body=body, content_type='application/json')


@routes.get('/static/posters/{filename}')
async def handle_static_posters(request):
    """Return binary poster's image due to requested ``filename`` param"""

    # build full filepath
    filename = request.match_info['filename']
    filepath = os.path.join(STATIC_PATH, 'posters', filename)

    # validate file's existance
    if not os.path.exists(filepath):
        raise web.HTTPNotFound()

    # read bytes
    async with AIOFile(filepath, 'rb') as afp:
        content = await afp.read()

    # return image
    return web.Response(body=content, content_type='image/jpeg')


if __name__ == '__main__':
    app = web.Application()
    app.add_routes(routes)
    web.run_app(app)
