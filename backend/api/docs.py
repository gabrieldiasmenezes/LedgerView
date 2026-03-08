from api.config import settings

api_metadata = {
    "title": settings.API_TITLE,
    "description": settings.API_DESCRIPTION,
    "version": settings.API_VERSION,
    "contact": {
        "name": "LedgerView Data Team"
    }
}


tags_metadata = [

    {
        "name": "Metrics",
        "description": "Key performance indicators such as revenue, profit and margin."
    },

    {
        "name": "Charts",
        "description": "Endpoints used to build dashboard charts."
    },

    {
        "name": "Products",
        "description": "Product performance metrics."
    },

    {
        "name": "Goals",
        "description": "Business goals and target tracking."
    }

]