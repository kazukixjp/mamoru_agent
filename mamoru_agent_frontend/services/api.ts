import type { ApiResponse, ApiError } from "../types/api"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:8000"

export async function askQuestion(query: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    })

    if (!response.ok) {
      const error = (await response.json()) as ApiError
      throw new Error(error.message || "APIリクエストに失敗しました")
    }

    return await response.json()
  } catch (error) {
    console.error("Error in askQuestion:", error)
    throw error
  }
}

