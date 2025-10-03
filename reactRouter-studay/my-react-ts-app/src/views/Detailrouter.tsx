import React from 'react'
import { useParams } from 'react-router-dom'
export default function Detailrouter() {
  const { myid } = useParams();
  return (
    <div>动态路由内容：{myid}</div>
  )
}
