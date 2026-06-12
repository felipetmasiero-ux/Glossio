import { contentData } from "../data/contentData"
import { useParams } from "react-router-dom"

export function ContentReader() {
    const { id } = useParams()

  const content = contentData.find(
    item => item.id === Number(id)
  )

  return (
    <div className="page-container">
      <div className="empty-state">
        <div className="empty-state__icon">✏️</div>
        <h1>{content.title}</h1>
        <p>{content.text}</p>
        
      </div>
    </div>
  )
}