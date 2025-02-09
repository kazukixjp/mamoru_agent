import type { LaborOffice, OfficeSearchParams } from "../types/office"
import type { Either } from "../types/core"

// 純粋関数: 2点間の距離を計算（ハーバーサイン公式）
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // 地球の半径（km）
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// 純粋関数: 近くの労働基準監督署を検索
export const findNearestOffices = (
  params: OfficeSearchParams,
  offices: LaborOffice[],
): Either<Error, LaborOffice[]> => {
  try {
    const { latitude, longitude, radius = 10 } = params

    const nearestOffices = offices
      .map((office) => ({
        ...office,
        distance: calculateDistance(latitude, longitude, office.coordinates.lat, office.coordinates.lng),
      }))
      .filter((office) => office.distance <= radius)
      .sort((a, b) => a.distance - b.distance)

    return {
      _tag: "Right",
      right: nearestOffices,
    }
  } catch (error) {
    return {
      _tag: "Left",
      left: new Error("労働基準監督署の検索に失敗しました"),
    }
  }
}

// モックデータ: 実際の環境では外部APIやデータベースから取得
export const MOCK_OFFICES: LaborOffice[] = [
  {
    id: "tokyo-chuo",
    name: "東京中央労働基準監督署",
    address: "東京都千代田区九段南1-2-1",
    phone: "03-1234-5678",
    email: "tokyo-chuo@example.gov.jp",
    jurisdiction: ["千代田区", "中央区", "港区"],
    openingHours: {
      weekday: "8:30 - 17:15",
      weekend: "休業",
    },
    consultationTypes: ["労働条件", "安全衛生", "労災保険", "労働時間"],
    coordinates: {
      lat: 35.6895,
      lng: 139.6917,
    },
  },
  // 他の労働基準監督署データ...
]

