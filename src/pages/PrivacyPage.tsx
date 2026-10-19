import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import PrivacyPolicyPage from "@/src/components/PrivacyPolicyPage"
import { updateHeadSeo } from "@/src/utils/seo"

export function PrivacyPage() {
  const navigate = useNavigate()

  useEffect(() => {
    updateHeadSeo("privacy")
  }, [])

  return (
    <PrivacyPolicyPage
      onBackToStore={() => navigate("/")}
      onGoToCart={() => navigate("/cart")}
    />
  )
}

export default PrivacyPage
