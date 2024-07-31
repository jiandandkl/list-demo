import { List, Image, Divider } from 'antd-mobile'
import type { CSSProperties } from 'react'
import './ListItem.css'

function rowRenderer({
  index,
  key,
  style,
  data
}: {
  index: number
  key: string
  style: CSSProperties
  data: []
}) {
  const item = data[index]

  return (
    <div className="list-item" key={key}>
      <List.Item
        style={{
          ...style,
          height: 100,
          marginTop: 10,
          borderRadius: '8px',
          backgroundColor: '#ddd'
        }}
        prefix={
          <Image
            src={item?.avatar}
            style={{ borderRadius: 27, marginLeft: 12 }}
            fit="cover"
            width={54}
            height={54}
          />
        }
        description={item?.description}
      >
        <span>{item?.name}</span>
        <Divider direction="vertical" className="divider" />
        <span>{item?.role}</span>
        <div className="info">{item?.step}</div>
        <div className="info">
          {item.sex} {item.symptom}
        </div>
      </List.Item>
    </div>
  )
}

export default rowRenderer
