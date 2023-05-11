import React, { useState } from 'react'
import JoinSectionView from './JoinSectionView'

const JoinSectionContainer = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)

  function handleSetShowModal(val: boolean) {
    setShowAddModal(val)
  }

  return (
    <JoinSectionView showAddModal={showAddModal} handleSetShowModal={handleSetShowModal} />
  )
}

export default JoinSectionContainer