from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # Security
    API_KEY: str

    # API info
    API_TITLE: str = "LedgerView Analytics API"
    API_VERSION: str = "1.0.0"

    API_DESCRIPTION: str = """
    Internal analytics API for LedgerView dashboard.
    """

    RATE_LIMIT: int = 100

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()