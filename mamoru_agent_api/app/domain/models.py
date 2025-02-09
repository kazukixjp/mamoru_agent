from pydantic import BaseModel, Field
from typing import List, Optional

class UserQuery(BaseModel):
    """ユーザーからの質問内容"""
    query: str

class MamoruAnswer(BaseModel):
    """
    まもる君が出力する回答(JSON形式)。
    """
    official_comment: str = Field(default="")
    cited_law_articles: List[str] = Field(default_factory=list)
    disclaimers: str = Field(default="")
    next_actions: List[str] = Field(default_factory=list)

class PhoneContact(BaseModel):
    """部署と電話番号（複数/単一に対応）"""
    department: Optional[str] = None
    phone: str

class LaborBureau(BaseModel):
    """労働基準監督署の情報"""
    prefecture: str
    region: str
    postcode: str
    address: str
    phones: List[PhoneContact] = Field(default_factory=list)
