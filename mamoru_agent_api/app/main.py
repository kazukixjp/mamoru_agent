from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints


def create_app() -> FastAPI:
    app = FastAPI(title="まもる君API", version="1.0.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    app.include_router(endpoints.router, prefix="/api")

    return app


app = create_app()
