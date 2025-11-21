from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from decimal import Decimal

app = FastAPI(title="Grippi Campaign Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():

    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        return conn
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

class Campaign(BaseModel):
    id: int
    name: str
    status: str
    clicks: int
    cost: float
    impressions: int

    class Config:
        from_attributes = True

@app.get("/")
def read_root():
    return {"message": "Grippi Campaign Analytics API", "version": "1.0.0"}

@app.get("/campaigns", response_model=List[Campaign])
def get_campaigns(status: Optional[str] = Query(None, regex="^(Active|Paused|All)$")):
  
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if status and status != "All":
            query = "SELECT * FROM campaigns WHERE status = %s ORDER BY id"
            cursor.execute(query, (status,))
        else:
            query = "SELECT * FROM campaigns ORDER BY id"
            cursor.execute(query)
        
        campaigns = cursor.fetchall()
        cursor.close()
        conn.close()
        
        result = []
        for campaign in campaigns:
            campaign_dict = dict(campaign)
            if isinstance(campaign_dict['cost'], Decimal):
                campaign_dict['cost'] = float(campaign_dict['cost'])
            result.append(campaign_dict)
        
        return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching campaigns: {str(e)}")

@app.get("/campaigns/{campaign_id}", response_model=Campaign)
def get_campaign(campaign_id: int):
    """Get a single campaign by ID"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM campaigns WHERE id = %s", (campaign_id,))
        campaign = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if not campaign:
            raise HTTPException(status_code=404, detail="Campaign not found")
        
        campaign_dict = dict(campaign)
        if isinstance(campaign_dict['cost'], Decimal):
            campaign_dict['cost'] = float(campaign_dict['cost'])
        
        return campaign_dict
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching campaign: {str(e)}")

@app.get("/health")
def health_check():

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        cursor.close()
        conn.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)