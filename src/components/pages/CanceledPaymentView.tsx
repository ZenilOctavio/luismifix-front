import { ECOMMERCE_PAGE_PATHNAME } from "@/config/constants"
import { useNavigate } from "react-router-dom"

export function CanceledPaymentView() {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate(ECOMMERCE_PAGE_PATHNAME)
  }, 5000)

  return (
    <main className="min-w-screen min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-semibold">Pago cancelado</h1>
    </main>
  )
}