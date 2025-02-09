from typing import List
from app.domain.models import LaborBureau, PhoneContact

# サンプルデータ（宮城県のみ記載、各都道府県分のデータをここに追加してください）
LABOR_BUREAUS: List[LaborBureau] = [
    LaborBureau(
        prefecture="宮城県",
        region="石巻",
        postcode="〒986-0832",
        address="石巻市泉町4-1-18 石巻合同庁舎",
        phones=[
            PhoneContact(department="方面（労働条件、解雇、賃金）", phone="022-522-3365"),
            PhoneContact(department="安全衛生課", phone="022-585-3483"),
            PhoneContact(department="労災課", phone="022-585-3484"),
            PhoneContact(department="総合労働相談コーナー", phone="022-522-3366"),
        ],
    ),
    LaborBureau(
        prefecture="宮城県",
        region="石巻 気仙沼臨時窓口",
        postcode="〒988-0077",
        address="気仙沼市古町3-3-8 気仙沼駅前プラザ2F",
        phones=[PhoneContact(phone="0226-25-6921")],
    ),
    LaborBureau(
        prefecture="宮城県",
        region="古川",
        postcode="〒989-6161",
        address="大崎市古川駅南2-9-47",
        phones=[PhoneContact(phone="0229-22-2112")],
    ),
    # -----------------------------------------------
    # 各都道府県分のデータを以下に追加してください。
    # 例:
    # LaborBureau(
    #     prefecture="北海道",
    #     region="札幌",
    #     postcode="〒060-0000",
    #     address="札幌市中央区○○○",
    #     phones=[PhoneContact(department="担当部署", phone="011-XXX-XXXX")],
    # ),
]
