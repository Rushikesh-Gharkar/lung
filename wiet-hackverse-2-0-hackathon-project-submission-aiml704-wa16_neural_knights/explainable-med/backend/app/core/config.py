from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "MediSense API"
    environment: str = "dev"
    api_prefix: str = "/api"
    allowed_origins: list[str] = ["*"]

    @property
    def is_dev(self) -> bool:
        return self.environment.lower() in {"dev", "development", "local"}


settings = Settings()

