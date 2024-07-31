import { useState } from 'react'
import type { CSSProperties } from 'react'
import { List, Input, Button, Popover, Badge } from 'antd-mobile'
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'
import {
  UnorderedListOutline,
  BellOutline,
  SetOutline,
  SearchOutline,
  AddOutline,
  FilterOutline
} from 'antd-mobile-icons'
import ListItem from './ListItem'
import './App.css'

const rowCount = 50

const baseUserItem = {
  avatar:
    'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  name: 'Novalee Spicer',
  description: 'Available for outreach'
}

const sexData = ['Male', 'Female']
const symptomData = ['anxiety', 'depression', 'fear']

const originData = Array.from({ length: rowCount }, (_, index) => ({
  ...baseUserItem,
  name: `${baseUserItem.name} ${index + 1}`,
  role: Math.random() > 0.5 ? 'Member' : 'Admin',
  sex: Math.random() > 0.5 ? sexData[0] : sexData[1],
  age: Math.floor(Math.random() * 100),
  step: `Step ${Math.floor(Math.random() * 12) + 1} - 12 Step Program`,
  status:
    Math.random() > 0.5
      ? 'Looking for Sponsor'
      : 'Available for sponsor others',
  symptom:
    Math.random() > 0.8
      ? symptomData[0]
      : Math.random() < 0.4
      ? symptomData[1]
      : symptomData[2]
}))

interface BadgeItem {
  label: string
  value: string
  color: string
  type: string
}

const badgesData = [
  {
    label: '男',
    value: sexData[0],
    color: '#00BFFF',
    type: 'sex'
  },
  {
    label: '女',
    value: sexData[1],
    color: '#FA8072',
    type: 'sex'
  },
  {
    label: '焦虑',
    value: symptomData[0],
    color: '#87CEFF',
    type: 'symptom'
  },
  {
    label: '抑郁',
    value: symptomData[1],
    color: '#1874CD',
    type: 'symptom'
  },
  {
    label: '恐惧',
    value: symptomData[2],
    color: '#FFD700',
    type: 'symptom'
  }
]

function App() {
  const [data, setData] = useState(originData)
  const [count, setCount] = useState(rowCount)
  const [filteredBadges, setFilteredBadges] = useState([] as string[])

  /**
   * 搜索
   * @param val 输入的值
   */
  const inputChange = (val: string) => {
    const filteredData = originData.filter((item) => item.name.includes(val))
    setCount(filteredData.length)
    setData(filteredData)
  }

  /**
   * 添加患者
   */
  const addMember = () => {
    setData([{ ...baseUserItem }, ...data])
  }

  /**
   * 标签的点击事件
   * @param badgeItem 标签的item
   */
  const clickBadge = (badgeItem: BadgeItem) => {
    let newFilteredBadges = []
    if (filteredBadges.includes(badgeItem.value)) {
      newFilteredBadges = filteredBadges.filter(
        (item) => item !== badgeItem.value
      )
    } else {
      newFilteredBadges = Array.from(
        new Set([...filteredBadges, badgeItem.value])
      )
    }

    setFilteredBadges(newFilteredBadges)

    let filteredData = originData.filter(
      (item) =>
        newFilteredBadges.includes(item.sex) ||
        newFilteredBadges.includes(item.symptom)
    )
    if (!newFilteredBadges.length) {
      filteredData = originData
    }

    setData(filteredData)
    setCount(filteredData.length)
  }

  /**
   * 标签组件
   */
  const filterBadges = () => {
    return (
      <div className="badges">
        {badgesData.map((badgeItem) => (
          <div onClick={() => clickBadge(badgeItem)}>
            <Badge
              key={badgeItem.value}
              content={badgeItem.label}
              color={
                filteredBadges.includes(badgeItem.value)
                  ? badgeItem.color
                  : '#ddd'
              }
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="header">
        <div className="nav">
          <UnorderedListOutline fontSize={24} fontWeight={700} />
          <span className="title">Home Group</span>
        </div>
        <div className="tools">
          <AddOutline fontSize={24} className="icons" onClick={addMember} />
          <Popover content={filterBadges()} trigger="click" placement="bottom">
            <FilterOutline
              fontSize={24}
              className={`icons ${filteredBadges.length ? 'active' : ''}`}
            />
          </Popover>
          <BellOutline fontSize={24} className="icons" />
          <SetOutline fontSize={24} className="icons" />
        </div>
      </div>
      <div className="search-input">
        <SearchOutline fontSize={20} />
        <Input className="input" placeholder="search" onChange={inputChange} />
      </div>
      <List className="user-list">
        <AutoSizer disableHeight>
          {({ width }: { width: number }) => (
            <VirtualizedList
              rowCount={count}
              rowRenderer={({
                index,
                key,
                style
              }: {
                index: number
                key: string
                style: CSSProperties
              }) => ListItem({ index, key, style, data })}
              width={width}
              height={900}
              rowHeight={120}
              overscanRowCount={15}
            />
          )}
        </AutoSizer>
      </List>
      <Button></Button>
    </>
  )
}

export default App
